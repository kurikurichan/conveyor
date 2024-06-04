import type { Meta, StoryObj } from '@storybook/react';

import { ScalarTypes } from '@/types';

import { ModelIndex } from './ModelIndex';

const meta = {
  title: 'Model/ModelIndex/ModelIndex',
  component: ModelIndex,
  tags: ['autodocs'],
  args: {
    model: 'DisneyCats',
    fields: [
      'id',
      'type',
      {
        name: 'name',
        type: ScalarTypes.STRING,
        editable: true,
        required: true,
      },
      { name: 'isHappy', type: ScalarTypes.BOOLEAN, editable: true },
      { name: 'released', type: ScalarTypes.DATETIME, editable: true },
      { name: 'bestBearFriend', type: 'DisneyBear', editable: true },
    ],
    data: [
      {
        id: '1',
        type: 'Tiger',
        name: 'Tigger',
        isHappy: false,
        released: '1928-10-1',
        bestBearFriend: { id: '1' },
      },
      {
        id: '2',
        type: 'Cat',
        name: 'Duchess',
        isHappy: true,
        released: '1994-06-24',
        bestBearFriend: null,
      },
      {
        id: '3',
        type: 'Lion',
        name: 'Simba',
        isHappy: true,
        released: '1970-12-24',
        bestBearFriend: null,
      },
    ],
  },
  argTypes: {
    showActions: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof ModelIndex>;
export default meta;

type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {};

export const NoFields: Story = {
  args: {
    fields: [],
  },
};

export const NoData: Story = {
  args: {
    data: [],
  },
};

export const UndefinedData: Story = {
  args: {
    data: undefined,
  },
};

export const DisableActions = {
  args: {
    showActions: false,
  },
};