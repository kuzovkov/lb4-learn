import {Entity, model, property, belongsTo} from '@loopback/repository';
import {TodoList} from './todo-list.model';

@model({
  settings: {
    postgresql: {schema: 'public', table: 'todo'},
      foreignKeys: {
        fk_todo_todoListId: {
          name: 'fk_todo_todoListId',
          entity: 'TodoList',
          entityKey: 'id',
          foreignKey: 'todolistid',
        },
      },
  },
})
export class Todo extends Entity {
  @property({
    type: 'number',
    id: 1,
    generated: true
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'title',
      dataType: 'VARCHAR',
      dataLength: 255,
      nullable: 'NO',
    },
  })
  title: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'desc',
      dataType: 'TEXT',
      nullable: 'YES',
    },
  })
  desc?: string;

  @property({
    type: 'boolean',
    postgresql: {
      columnName: 'is_complete',
      dataType: 'BOOL',
      nullable: 'YES',
    },
  })
  isComplete?: boolean;

  @property({
    type: 'number',
    postgresql: {
      columnName: 'estimation',
      dataType: 'INTEGER',
      nullable: 'YES',
    },
  })
  estimation?: number;

  @belongsTo(() => TodoList)
  todoListId: number;

  constructor(data?: Partial<Todo>) {
    super(data);
  }
}

export interface TodoRelations {
  // describe navigational properties here
}

export type TodoWithRelations = Todo & TodoRelations;
