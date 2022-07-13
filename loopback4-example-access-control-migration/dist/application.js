"use strict";
// Copyright IBM Corp. and LoopBack contributors 2020. All Rights Reserved.
// Node module: @loopback/example-access-control-migration
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessControlApplication = exports.PackageKey = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authorization_1 = require("@loopback/authorization");
const boot_1 = require("@loopback/boot");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const rest_explorer_1 = require("@loopback/rest-explorer");
const service_proxy_1 = require("@loopback/service-proxy");
const path_1 = tslib_1.__importDefault(require("path"));
const casbin_authorization_1 = require("./components/casbin-authorization");
const jwt_authentication_1 = require("./components/jwt-authentication");
const sequence_1 = require("./sequence");
exports.PackageKey = core_1.BindingKey.create('application.package');
class AccessControlApplication extends (0, boot_1.BootMixin)((0, service_proxy_1.ServiceMixin)((0, repository_1.RepositoryMixin)(rest_1.RestApplication))) {
    constructor(options = {}) {
        super(options);
        // Set up the custom sequence
        this.sequence(sequence_1.MySequence);
        // Set up default home page
        this.static('/', path_1.default.join(__dirname, '../public'));
        this.addSecuritySpec();
        this.component(rest_explorer_1.RestExplorerComponent);
        // Bind authentication and authorization related elements
        this.component(authentication_1.AuthenticationComponent);
        this.component(authorization_1.AuthorizationComponent);
        this.component(jwt_authentication_1.JWTAuthenticationComponent);
        this.component(casbin_authorization_1.CasbinAuthorizationComponent);
        this.projectRoot = __dirname;
        // Customize @loopback/boot Booter Conventions here
        this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true,
            },
        };
    }
    addSecuritySpec() {
        this.api({
            openapi: '3.0.0',
            info: {
                title: 'access-control-example',
                version: require('.././package.json').version,
            },
            paths: {},
            components: { securitySchemes: jwt_authentication_1.SECURITY_SCHEME_SPEC },
            security: [
                {
                    jwt: [],
                },
            ],
            servers: [{ url: '/' }],
        });
    }
}
exports.AccessControlApplication = AccessControlApplication;
//# sourceMappingURL=application.js.map