"use strict";
// Copyright IBM Corp. and LoopBack contributors 2020. All Rights Reserved.
// Node module: @loopback/example-access-control-migration
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleObserver = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const bcryptjs_1 = require("bcryptjs");
const _ = tslib_1.__importStar(require("lodash"));
const project_repository_1 = require("../repositories/project.repository");
const team_repository_1 = require("../repositories/team.repository");
const user_repository_1 = require("../repositories/user.repository");
/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
let SampleObserver = class SampleObserver {
    constructor(app, projectRepo, teamRepo, userRepo) {
        this.app = app;
        this.projectRepo = projectRepo;
        this.teamRepo = teamRepo;
        this.userRepo = userRepo;
    }
    /**
     * This method will be invoked when the application starts
     */
    async start() {
        // Add your logic for start
        if (process.env.SEED_DATA) {
            await this.createUsers();
            await this.createProjects();
            await this.createTeams();
        }
    }
    /**
     * This method will be invoked when the application stops
     */
    async stop() {
        // Add your logic for stop
    }
    async createUsers() {
        const hashedPassword = await this.hashPassword('opensesame', 10);
        const users = [
            {
                id: 1,
                username: 'John',
                email: 'john@doe.com',
                password: hashedPassword,
            },
            {
                id: 2,
                username: 'Jane',
                email: 'jane@doe.com',
                password: hashedPassword,
            },
            {
                id: 3,
                username: 'Bob',
                email: 'bob@projects.com',
                password: hashedPassword,
            },
        ];
        for (const u of users) {
            await this.userRepo.create(_.pick(u, ['id', 'email', 'username']));
            await this.userRepo
                .userCredentials(u.id)
                .create({ password: u.password, userId: u.id });
        }
    }
    async createProjects() {
        const projects = [
            { id: 1, name: 'project1', balance: 0, ownerId: 1 },
            { id: 2, name: 'project2', balance: 0, ownerId: 2 },
        ];
        for (const p of projects) {
            await this.projectRepo.create(p);
        }
    }
    async createTeams() {
        const teams = [
            { id: 1, ownerId: 1, memberIds: [1, 2] },
            { id: 2, ownerId: 2, memberIds: [2] },
        ];
        for (const t of teams) {
            await this.teamRepo.create(t);
        }
    }
    async hashPassword(password, rounds) {
        const salt = await (0, bcryptjs_1.genSalt)(rounds);
        return (0, bcryptjs_1.hash)(password, salt);
    }
};
SampleObserver = tslib_1.__decorate([
    (0, core_1.lifeCycleObserver)(''),
    tslib_1.__param(0, (0, core_1.inject)(core_1.CoreBindings.APPLICATION_INSTANCE)),
    tslib_1.__param(1, (0, core_1.inject)('repositories.ProjectRepository')),
    tslib_1.__param(2, (0, core_1.inject)('repositories.TeamRepository')),
    tslib_1.__param(3, (0, core_1.inject)('repositories.UserRepository')),
    tslib_1.__metadata("design:paramtypes", [core_1.Application,
        project_repository_1.ProjectRepository,
        team_repository_1.TeamRepository,
        user_repository_1.UserRepository])
], SampleObserver);
exports.SampleObserver = SampleObserver;
//# sourceMappingURL=sample.observer.js.map