"use strict";
// Copyright IBM Corp. and LoopBack contributors 2020. All Rights Reserved.
// Node module: @loopback/example-access-control-migration
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authorization_1 = require("@loopback/authorization");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const casbin_authorization_1 = require("../components/casbin-authorization");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
// TBD: refactor the ACLs to a separate file
const RESOURCE_NAME = 'project';
const ACL_PROJECT = {
    'view-all': {
        resource: `${RESOURCE_NAME}*`,
        scopes: ['view-all'],
        allowedRoles: ['admin'],
    },
    'show-balance': {
        resource: RESOURCE_NAME,
        scopes: ['show-balance'],
        allowedRoles: ['owner', 'team'],
        voters: [casbin_authorization_1.assignProjectInstanceId],
    },
    donate: {
        resource: RESOURCE_NAME,
        scopes: ['donate'],
        allowedRoles: ['admin', 'owner', 'team'],
        voters: [casbin_authorization_1.assignProjectInstanceId],
    },
    withdraw: {
        resource: RESOURCE_NAME,
        scopes: ['withdraw'],
        allowedRoles: ['owner'],
        voters: [casbin_authorization_1.assignProjectInstanceId],
    },
};
// TODO: add other CRUD methods and corresponding ACL
let ProjectController = class ProjectController {
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    // LIST PROJECTS (balance is not public)
    async listProjects() {
        const projects = await this.projectRepository.find();
        return projects.map(p => lodash_1.default.omit(p, 'balance'));
    }
    // VIWE ALL PROJECTS (including balance)
    async viewAll() {
        return this.projectRepository.find();
    }
    // SHOW BALANCE: get project by id
    async findById(id) {
        return this.projectRepository.findById(id);
    }
    // DONATE BY ID
    async donateById(id, amount) {
        const project = await this.projectRepository.findById(id);
        await this.projectRepository.updateById(id, {
            balance: project.balance + amount,
        });
        // TBD: return new balance
    }
    // WITHDRAW BY ID
    async withdrawById(id, amount) {
        const project = await this.projectRepository.findById(id);
        if (project.balance < amount) {
            throw new Error('Balance is not enough.');
        }
        await this.projectRepository.updateById(id, {
            balance: project.balance - amount,
        });
        // TBD: return new balance
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/list-projects', {
        responses: {
            '200': {
                description: 'List all the project model instances without balance',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: (0, rest_1.getModelSchemaRef)(models_1.Project, {
                                title: 'ProjectPublic',
                                exclude: ['balance'],
                            }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ProjectController.prototype, "listProjects", null);
tslib_1.__decorate([
    (0, rest_1.get)('/view-all-projects', {
        responses: {
            '200': {
                description: 'Array of all Project model instances including balance',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: (0, rest_1.getModelSchemaRef)(models_1.Project),
                        },
                    },
                },
            },
        },
    }),
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)(ACL_PROJECT['view-all']),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ProjectController.prototype, "viewAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/projects/{id}/show-balance', {
        responses: {
            '200': {
                description: 'show balance of a project',
                content: {
                    'application/json': {
                        schema: (0, rest_1.getModelSchemaRef)(models_1.Project),
                    },
                },
            },
        },
    }),
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)(ACL_PROJECT['show-balance']),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ProjectController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/projects/{id}/donate', {
        responses: {
            '204': {
                description: 'Project donate success',
            },
        },
    }),
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)(ACL_PROJECT.donate),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.number('amount')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ProjectController.prototype, "donateById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/projects/{id}/withdraw', {
        responses: {
            '204': {
                description: 'Project withdraw success',
            },
        },
    }),
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)(ACL_PROJECT.withdraw),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.number('amount')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ProjectController.prototype, "withdrawById", null);
ProjectController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.ProjectRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ProjectRepository])
], ProjectController);
exports.ProjectController = ProjectController;
//# sourceMappingURL=project.controller.js.map