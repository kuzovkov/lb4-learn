"use strict";
// Copyright IBM Corp. and LoopBack contributors 2020. All Rights Reserved.
// Node module: @loopback/example-access-control-migration
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECURITY_SCHEME_SPEC = exports.OPERATION_SECURITY_SPEC = void 0;
exports.OPERATION_SECURITY_SPEC = [{ jwt: [] }];
exports.SECURITY_SCHEME_SPEC = {
    jwt: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
    },
};
//# sourceMappingURL=security.spec.js.map