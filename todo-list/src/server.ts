import express from 'express';
import {ApplicationConfig, TodoListApplication} from './application';
//import {PageRepository} from "./repositories";
import {once} from 'events';
import {Request, Response} from 'express';
const handlebars = require('express-handlebars')
import path from 'path';
import * as http from "http";
//import {Page, PageRelations} from "./models";
import {repository} from "@loopback/repository";

// const pgp = require("pg-promise")(/*options*/);

export {ApplicationConfig};

export class ExpressServer {
    //@repository(PageRepository)
    public readonly app: express.Application;
    public readonly lbApp: TodoListApplication;
    //public pageRep: PageRepository
    private server?: http.Server;

    constructor(options: ApplicationConfig = {}) {
        let pageContent: any
        //const db = pgp("postgres://wisejester:47jvexRXJHBzjaQ@db:5432/wise_jester_db");
        function getRandomArbitrary(min: number, max: number) {
            return Math.round(Math.random() * (max - min) + min);
        }
        let randomNumber = getRandomArbitrary(100000, 1000000)
        this.app = express();
        this.lbApp = new TodoListApplication(options);
        //this.app.use('/static', express.static('/app/src/public'));
        //this.app.use('/dist', express.static('/app/dist'));
        // this.app.engine(
        //     'handlebars',
        //     handlebars({ defaultLayout: 'main' })
        // )
        // this.app.set('views', './views')
        // this.app.set('view engine', 'handlebars');
        this.app.use('/api', this.lbApp.requestHandler);

        this.app.get('/', (req, res) => {
            res.json({'message': 'Express'})
        })

        this.app.get('/hello', function (_req: Request, res: Response) {
            res.send('Hello world!');
        });

        // this.app.get('/', (req, res) => {
        //     db.one("SELECT html from page where id = 2")
        //         .then(function (data: { value: any; }) {
        //             pageContent = data
        //             console.log(pageContent.html)
        //             res.render('home', { content: pageContent.html, rnd: randomNumber,layout: false })
        //         })
        //         .catch(function (error: any) {
        //             console.log("ERROR:", error);
        //         });
        //     /*            this.pageRep.findById(2).then(r =>
        //                     pageContent = r
        //                 )*/
        //
        // })
        //
        // this.app.get('/what-is-iib', (req, res) => {
        //     db.one("SELECT html from page where id = 3")
        //         .then(function (data: { value: any; }) {
        //             pageContent = data
        //             console.log(pageContent.html)
        //             res.render('about', { content: pageContent.html, rnd: randomNumber,layout: false })
        //         })
        //         .catch(function (error: any) {
        //             console.log("ERROR:", error);
        //         });
        //     /*            this.pageRep.findById(2).then(r =>
        //                     pageContent = r
        //                 )*/
        //
        // })
    }

    async boot() {
        await this.lbApp.boot();
    }

    public async start() {
        await this.lbApp.start();
        const port = this.lbApp.restServer.config.port ?? 3000;
        const host = this.lbApp.restServer.config.host || '127.0.0.1';
        this.server = this.app.listen(port, host);
        await once(this.server, 'listening');
    }
}
