import {Entity, model, property, hasOne} from '@loopback/repository';
import {UserCredentials} from './user-credentials.model';

@model({
  settings: {
    postgresql: {schema: 'public', table: 'user'}
  },
})
export class User extends Entity {
  @property({
    type: 'number',
    generated: true,
    index: true,
/*    required: true,*/
    id: true
  })
  pk: number;

  @property({
    type: 'string',
    index: true,
    postgresql: {dataType: 'varchar'}
  })
  id: string;


  @property({
    type: 'string',
    index: {
      unique: true
    },
    postgresql: {columnName: 'email', dataType: 'varchar(256)', nullable: 'YES'},
  })
  email?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'ip', dataType: 'cidr', nullable: 'YES'},
  })
  ip?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'browser_headers', dataType: 'jsonb', nullable: 'YES'},
  })
  browserHeaders?: string;

  @property({
    type: 'string',
    default: 'active',
    index: true,
    postgresql: {dataType: 'varchar(255)'}
  })
  status: string

  @property({
    type: 'date',
    /*required: true,*/
    defaultFn: 'now',
    index: true,
    postgresql: {columnName: 'created_at', dataType: 'timestamp with time zone', nullable: 'NO'},
  })
  createdAt: string;

  @property({
    type: 'date',
    index: true,
    postgresql: {columnName: 'updated_at', dataType: 'timestamp with time zone', /*nullable: 'YES'*/},
  })
  updatedAt?: string;

  @property({
    type: 'string',
    index: true,
    postgresql: {dataType: 'varchar(20)'}
    /*postgresql: {columnName: 'username'/*, dataType: 'character varying', nullable: 'YES'*/
  })
  username?: string;

  @property({
    type: 'string',
    default: '',
    postgresql: {dataType: 'varchar(140)'}
  })
  pitch?: string;

  @property({
    type: 'string',
    index: true,
    postgresql: {dataType: 'varchar'}
    /*postgresql: {columnName: 'password', dataType: 'character varying', nullable: 'YES'},*/
  })
  password?: string;

  @property({
    type: 'string',
    postgresql: {dataType: 'varchar'}
    /*  postgresql: {columnName: 'realm', dataType: 'character varying',  nullable: 'YES'},*/
  })
  realm?: string;

  @property({
    type: 'boolean',
    index: true,
    /*postgresql: {columnName: 'emailverified', dataType: 'boolean', /!*nullable: 'YES'},*/
  })
  emailverified?: boolean;

  @property({
    type: 'string',
    index: true,
    postgresql: {dataType: 'varchar'}
    /*postgresql: {columnName: 'verificationtoken'/!*, dataType: 'character varying',nullable: 'YES'*!/},*/
  })
  verificationtoken?: string;

  @hasOne(() => UserCredentials)
  userCredentials: UserCredentials;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
