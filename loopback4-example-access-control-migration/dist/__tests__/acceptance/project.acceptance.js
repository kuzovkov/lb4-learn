"use strict";
// Copyright IBM Corp. and LoopBack contributors 2020. All Rights Reserved.
// Node module: @loopback/example-access-control-migration
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const testlab_1 = require("@loopback/testlab");
const __1 = require("../../");
describe('AccessControlApplication - permissions', () => {
    let app;
    let client;
    let token;
    before(givenRunningApplication);
    before(() => {
        client = (0, testlab_1.createRestAppClient)(app);
    });
    after(async () => {
        process.env.SEED_DATA = undefined;
        await app.stop();
    });
    const USER_CREDENTIAL_MAPPING = {
        admin: ['bob@projects.com', 'opensesame'],
        owner: ['john@doe.com', 'opensesame'],
        team: ['jane@doe.com', 'opensesame'],
    };
    context('admin', () => {
        const permissions = {
            list: true,
            view: true,
            balance: false,
            donate: true,
            withdraw: false,
        };
        testPermission('admin', permissions);
    });
    context('owner', () => {
        const permissions = {
            list: true,
            view: false,
            balance: true,
            donate: true,
            withdraw: true,
        };
        testPermission('owner', permissions);
    });
    context('team-member', () => {
        const permissions = {
            list: true,
            view: false,
            balance: true,
            donate: true,
            withdraw: false,
        };
        testPermission('team', permissions);
    });
    context('anonymous', () => {
        const permissions = {
            list: true,
            view: false,
            balance: false,
            donate: false,
            withdraw: false,
        };
        testPermission('anonymous', permissions);
    });
    /**
     * Test a role's permission when visit the 5 endpoints in the
     * project controller
     * @param role
     * @param permissions
     */
    function testPermission(role, permissions) {
        it(`role ${role} login successfully`, async () => {
            const credentials = USER_CREDENTIAL_MAPPING[role];
            // for anonymous user
            if (!credentials)
                return;
            const res = await client
                .post('/users/login')
                .send({ email: credentials[0], password: credentials[1] })
                .expect(200);
            token = res.body.token;
        });
        it(`list-projects returns ${permissions.list} for role ${role}`, async () => {
            if (role === 'anonymous') {
                await client.get('/list-projects').expect(200);
                return;
            }
            await client
                .get('/list-projects')
                .set('Authorization', 'Bearer ' + token)
                .expect(200);
        });
        it(`view returns ${permissions.view} for role ${role}`, async () => {
            const errorCode = role === 'anonymous' ? 401 : 403;
            const expectedStatus = permissions.view ? 200 : errorCode;
            if (role === 'anonymous') {
                await client.get('/view-all-projects').expect(expectedStatus);
                return;
            }
            await client
                .get('/view-all-projects')
                .set('Authorization', 'Bearer ' + token)
                .expect(expectedStatus);
        });
        it(`show-balance returns ${permissions.balance} for role ${role}`, async () => {
            const errorCode = role === 'anonymous' ? 401 : 403;
            const expectedStatus = permissions.balance ? 200 : errorCode;
            if (role === 'anonymous') {
                await client.get('/projects/1/show-balance').expect(expectedStatus);
                return;
            }
            await client
                .get('/projects/1/show-balance')
                .set('Authorization', 'Bearer ' + token)
                .expect(expectedStatus);
        });
        it(`donate returns ${permissions.donate} for role ${role}`, async () => {
            const errorCode = role === 'anonymous' ? 401 : 403;
            const expectedStatus = permissions.donate ? 204 : errorCode;
            if (role === 'anonymous') {
                await client.patch('/projects/1/donate').expect(expectedStatus);
                return;
            }
            await client
                .patch('/projects/1/donate')
                .set('Authorization', 'Bearer ' + token)
                .expect(expectedStatus);
        });
        it(`withdraw returns ${permissions.withdraw} for role ${role}`, async () => {
            const errorCode = role === 'anonymous' ? 401 : 403;
            const expectedStatus = permissions.withdraw ? 204 : errorCode;
            if (role === 'anonymous') {
                await client.patch('/projects/1/withdraw').expect(expectedStatus);
                return;
            }
            await client
                .patch('/projects/1/withdraw')
                .set('Authorization', 'Bearer ' + token)
                .expect(expectedStatus);
        });
    }
    /*
     ============================================================================
     TEST HELPERS
     These functions help simplify setup of your test fixtures so that your tests
     can:
     - operate on a "clean" environment each time (a fresh in-memory database)
     - avoid polluting the test with large quantities of setup logic to keep
     them clear and easy to read
     - keep them DRY (who wants to write the same stuff over and over?)
     ============================================================================
     */
    async function givenRunningApplication() {
        process.env.SEED_DATA = '1';
        app = new __1.AccessControlApplication({
            rest: (0, testlab_1.givenHttpServerConfig)(),
        });
        app.bind('datasources.config.db').to({
            name: 'db',
            connector: 'memory',
        });
        await app.boot();
        // Start Application
        await app.start();
    }
});
//# sourceMappingURL=project.acceptance.js.map