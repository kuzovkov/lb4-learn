// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-access-control-migration
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Getter, inject} from '@loopback/core';
import {
    DefaultCrudRepository,
    HasOneRepositoryFactory,
    repository,
} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {UserCredentials} from '../models';
import {User, UserRelations} from '../models/user.model'
import {UserCredentialsRepository} from './user-credentials.repository';

export class UserRepository extends DefaultCrudRepository<
    User,
    typeof User.prototype.id,
    UserRelations
    > {
    public readonly userCredentials: HasOneRepositoryFactory<
        UserCredentials,
        typeof User.prototype.id
        >;


    constructor(
        @inject('datasources.db') dataSource: DbDataSource,
        @repository.getter('UserCredentialsRepository')
        protected userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>,
    ) {
        super(User, dataSource);
        this.userCredentials = this.createHasOneRepositoryFactoryFor(
            'userCredentials',
            userCredentialsRepositoryGetter,
        );
        this.registerInclusionResolver(
            'userCredentials',
            this.userCredentials.inclusionResolver,
        );
    }

    async findCredentials(
        userId: typeof User.prototype.id,
    ): Promise<UserCredentials | undefined> {
        try {
            return await this.userCredentials(userId).get();
        } catch (err) {
            if (err.code === 'ENTITY_NOT_FOUND') {
                return undefined;
            }
            throw err;
        }
    }

/*    async verifyEmail(
        userId: typeof User.prototype.id,
    ): Promise<User | undefined> {
        try {
            return await this.find()
        } catch (err) {
            if (err.code === 'ENTITY_NOT_FOUND') {
                return undefined;
            }
            throw err;
        }
    }*/
}