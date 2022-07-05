"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const user_credentials_model_1 = require("./user-credentials.model");
let User = class User extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        generated: true,
        index: true,
        /*    required: true,*/
        id: true
    }),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "pk", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        index: true,
        postgresql: { dataType: 'varchar' }
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        index: {
            unique: true
        },
        postgresql: { columnName: 'email', dataType: 'varchar(256)', nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        postgresql: { columnName: 'ip', dataType: 'cidr', nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "ip", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        postgresql: { columnName: 'browser_headers', dataType: 'jsonb', nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "browserHeaders", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        default: 'active',
        index: true,
        postgresql: { dataType: 'varchar(255)' }
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "status", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        /*required: true,*/
        defaultFn: 'now',
        index: true,
        postgresql: { columnName: 'created_at', dataType: 'timestamp with time zone', nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        index: true,
        postgresql: { columnName: 'updated_at', dataType: 'timestamp with time zone', /*nullable: 'YES'*/ },
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        index: true,
        postgresql: { dataType: 'varchar(20)' }
        /*postgresql: {columnName: 'username'/*, dataType: 'character varying', nullable: 'YES'*/
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "username", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        default: '',
        postgresql: { dataType: 'varchar(140)' }
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "pitch", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        index: true,
        postgresql: { dataType: 'varchar' }
        /*postgresql: {columnName: 'password', dataType: 'character varying', nullable: 'YES'},*/
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        postgresql: { dataType: 'varchar' }
        /*  postgresql: {columnName: 'realm', dataType: 'character varying',  nullable: 'YES'},*/
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "realm", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        index: true,
        /*postgresql: {columnName: 'emailverified', dataType: 'boolean', /!*nullable: 'YES'},*/
    }),
    tslib_1.__metadata("design:type", Boolean)
], User.prototype, "emailverified", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        index: true,
        postgresql: { dataType: 'varchar' }
        /*postgresql: {columnName: 'verificationtoken'/!*, dataType: 'character varying',nullable: 'YES'*!/},*/
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "verificationtoken", void 0);
tslib_1.__decorate([
    (0, repository_1.hasOne)(() => user_credentials_model_1.UserCredentials),
    tslib_1.__metadata("design:type", user_credentials_model_1.UserCredentials)
], User.prototype, "userCredentials", void 0);
User = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: {
            postgresql: { schema: 'example_jwt', table: 'user' }
        },
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], User);
exports.User = User;
//# sourceMappingURL=user.model.js.map