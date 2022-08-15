import { useMemo, useCallback } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { gql } from 'graphql-request';
import { useQuery } from '@tanstack/react-query';

import { DataManagerProps, GraphqlFetchResult } from '../commons/types';
import ModelTable from './ModelTable';
import { getAllModelNames, toModelListName } from '../schema';

function ModelList({ schema, gqlFetcher }: DataManagerProps) {
  if (!schema) throw new Error();
  const { modelName: currentModelName } = useParams();
  if (!currentModelName) throw new Error();
  const currentModel = schema.models.find((model) => model.name === currentModelName);
  if (!currentModel) throw new Error();
  const currentModelListName = toModelListName(currentModelName);

  const fetchGQLModelList = useCallback(async () => {
    // Parses model fields into { name, rel } where rel is the model name of the
    // relational field type
    const allModelNames = getAllModelNames(schema);
    const currentFields = currentModel.fields.map((field) => {
      const fieldName = field.name;
      const fieldRel =
        allModelNames.find(
          (modelName) =>
            modelName === fieldName || toModelListName(modelName) === fieldName,
        ) ?? '';
      return {
        name: field.name,
        rel: fieldRel,
      };
    });
    // Creates a list of model fields that can be queried by graphQL
    const queryModelFields = currentFields.map((field) =>
      field.rel ? `${field.name} { id, name }` : field.name,
    );
    const query = gql`
      query {
        ${currentModelListName} {
          result {
            ${queryModelFields.join(' ')}
          }
        }
      }
    `;
    const param = {
      query,
      variables: {},
    };
    return gqlFetcher(param).then((response) => {
      const fields = currentFields;
      const { result: data } = response[currentModelListName];
      return { currentModelName, fields, data };
    });
  }, [currentModelName, gqlFetcher, schema, currentModel, currentModelListName]);

  const { error: errModelListData, data: modelListData } = useQuery<
    GraphqlFetchResult,
    Error
  >(['model', currentModelListName], fetchGQLModelList);
  if (errModelListData) throw new Error(errModelListData.message);

  // Memoize so the tableData isn't "new" on every render
  const tableData = useMemo(() => modelListData?.data ?? [], [modelListData]);

  return (
    <Container>
      {modelListData ? (
        <Row>
          <ModelTable
            currentModelName={modelListData.currentModelName}
            fields={modelListData.fields}
            data={tableData}
          />
        </Row>
      ) : (
        <h3>No model data exists for {currentModelListName}</h3>
      )}
    </Container>
  );
}

export default ModelList;
