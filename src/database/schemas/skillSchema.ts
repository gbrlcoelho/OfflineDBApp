import {tableSchema} from '@nozbe/watermelondb'

export const skillSchema = tableSchema({
  name: 'skills',
  columns: [
    {
      name: 'string',
      type: 'string',
    },
    {
      name: 'string',
      type: 'string',
    },
  ],
})
