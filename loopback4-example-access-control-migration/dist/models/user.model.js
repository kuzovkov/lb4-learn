"use strict";
// Copyright IBM Corp. and LoopBack contributors 2020. All Rights Reserved.
// Node module: @loopback/example-access-control-migration
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const team_model_1 = require("./team.model");
const user_credentials_model_1 = require("./user-credentials.model");
let User = class User extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: 1,
        generated: false,
        updateOnly: true,
    }),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "realm", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "username", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
    }),
    tslib_1.__metadata("design:type", Boolean)
], User.prototype, "emailVerified", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "verificationToken", void 0);
tslib_1.__decorate([
    (0, repository_1.hasOne)(() => user_credentials_model_1.UserCredentials),
    tslib_1.__metadata("design:type", user_credentials_model_1.UserCredentials)
], User.prototype, "userCredentials", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => team_model_1.Team, { keyTo: 'ownerId' }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "teams", void 0);
User = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: {
            strict: false,
        },
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], User);
exports.User = User;
//# sourceMappingURL=user.model.js.map