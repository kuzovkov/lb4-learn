import { Entity } from '@loopback/repository';
import { UserCredentials } from './user-credentials.model';
export declare class User extends Entity {
    pk: number;
    id: string;
    email?: string;
    ip?: string;
    browserHeaders?: string;
    status: string;
    createdAt: string;
    updatedAt?: string;
    username?: string;
    pitch?: string;
    password?: string;
    realm?: string;
    emailverified?: boolean;
    verificationtoken?: string;
    userCredentials: UserCredentials;
    [prop: string]: any;
    constructor(data?: Partial<User>);
}
export interface UserRelations {
}
export declare type UserWithRelations = User & UserRelations;
