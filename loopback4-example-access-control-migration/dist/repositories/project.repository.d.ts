import { Getter } from '@loopback/core';
import { BelongsToAccessor, DefaultCrudRepository } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { Project, ProjectRelations, User } from '../models';
import { UserRepository } from './user.repository';
export declare class ProjectRepository extends DefaultCrudRepository<Project, typeof Project.prototype.id, ProjectRelations> {
    protected userRepositoryGetter: Getter<UserRepository>;
    readonly owner: BelongsToAccessor<User, typeof Project.prototype.id>;
    constructor(dataSource: DbDataSource, userRepositoryGetter: Getter<UserRepository>);
}
