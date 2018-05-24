import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";
import {Account} from "./entity/Account";

createConnection().then(async connection => {

    // create express app
    const app = express();
    const port = 3000
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    // start express server
    app.listen(port);

    // insert the first 100 registers
    const generateHundread = async (iterator = 100) => {
        iterator = ++iterator
        console.log(`INSERT JOB, CURRENT INSERT: ${iterator}`)
        const etc = await connection.manager.save(connection.manager.create(Account, {
            cc_codigo: iterator,
            cc_conta_corrente: "19991-9",
            cc_total_reais: Math.random()
        }));

        return iterator === 200 ? -1 : generateHundread(iterator)
    }
    generateHundread()

    const asciiart = 
    `db1service: service is running on port ${port}

    888 888      d888                                     d8b                  
    888 888     d8888                                     Y8P                  
    888 888       888                                                          
.d88888 88888b.   888  .d8888b   .d88b.  888d888 888  888 888  .d8888b .d88b.  
d88" 888 888 "88b  888  88K      d8P  Y8b 888P"   888  888 888 d88P"   d8P  Y8b 
888  888 888  888  888  "Y8888b. 88888888 888     Y88  88P 888 888     88888888 
Y88b 888 888 d88P  888       X88 Y8b.     888      Y8bd8P  888 Y88b.   Y8b.     
"Y88888 88888P" 8888888 88888P'  "Y8888  888       Y88P   888  "Y8888P "Y8888`
    console.log(asciiart);

}).catch(error => console.log(error));
