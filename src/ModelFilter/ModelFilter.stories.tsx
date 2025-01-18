import React, { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import type { TableView } from "@/types";

import { ModelFilter } from "./ModelFilter";

const meta = {
  title: "Models/ModelFilter",
  component: ModelFilter,
  tags: ["autodocs"],
  args: {
    fields: [
      {
        displayValue: "test",
        id: "23847098UIOUJROBERT",
        name: "test",
        yummy_object: {
          displayValue: "Apple",
          id: "KRISTA3983247238",
        },
        not_yummy_object: {
          displayValue: "Brick",
          id: "WEOIEFJOIJ242324",
        },
        random: [],
        relationship: [
          {
            displayValue: "thing1",
            id: "01JHTSYK39VV3SPWFNEMJ9HT4J",
          },
          {
            displayValue: "thing2",
            id: "01JHTSXY5YW71D7NTQAJX1HR4Q",
          },
        ],
      },
      {
        displayValue: "test2",
        id: "23847098UIOUJROBERT2",
        name: "test",
        yummy_object: {
          displayValue: "Potato",
          id: "KRISTA39832472382",
        },
        not_yummy_object: {
          displayValue: "Computer",
          id: "WEOIEFJOIJ2423242",
        },
        random: [],
        relationship: [
          {
            displayValue: "thing3",
            id: "01JHTSYK39VV3SZ",
          },
          {
            displayValue: "thing4",
            id: "01JHTSR4QSDFSDFSDF",
          },
        ],
      },
      {
        displayValue: "test3",
        id: "23847098UIOUJROBERT23",
        name: "test",
        yummy_object: {
          displayValue: "Pizza",
          id: "KRISTA398324WER2",
        },
        not_yummy_object: {
          displayValue: "Cat",
          id: "WEOIEFJOIWERER3242",
        },
        random: [],
        relationship: [
          {
            displayValue: "thing5",
            id: "01JHTSYK39VSDFZ",
          },
          {
            displayValue: "thing6",
            id: "01JHTSR4QSSDFSFSDF",
          },
        ],
      },
    ],
  },
  render: (props) => {
    const [tableView, setTableView] = useState<TableView>({});

    return (
      <div className='flex h-[300px] flex-col'>
        <ModelFilter
          fields={props.fields}
          tableViewOptions={{ tableView, onTableViewChange: setTableView }}
        />
      </div>
    );
  },
} satisfies Meta<typeof ModelFilter>;
export default meta;

type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {};
