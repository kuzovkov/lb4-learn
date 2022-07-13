import { Entity } from '@loopback/repository';
export declare class Project extends Entity {
    id: number;
    name?: string;
    balance: number;
    ownerId: number;
    [prop: string]: any;
    constructor(data?: Partial<Project>);
}
export interface ProjectRelations {
}
export declare type ProjectWithRelations = Project & ProjectRelations;
