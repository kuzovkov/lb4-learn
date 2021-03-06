// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-access-control-migration
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Entity, model, property} from '@loopback/repository';

@model({
    settings: {
        postgresql: {schema: 'public', table: 'user_credentials'},
    },
})
export class UserCredentials extends Entity {
    @property({
        type: 'number',
        generated: true,
        id: true,
    })
    id: number;

    @property({
        type: 'string',
        required: true,
        postgresql: {dataType: 'varchar'}
    })
    password: string;

    @property({
        type: 'string',
        required: true,
        index: true,
        postgresql: {dataType: 'varchar'}
    })
    userId: string;

    // Define well-known properties here

    // Indexer property to allow additional data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [prop: string]: any;

    constructor(data?: Partial<UserCredentials>) {
        super(data);
    }
}

export interface UserCredentialsRelations {
    // describe navigational properties here
}

export type UserCredentialsWithRelations = UserCredentials &
    UserCredentialsRelations;