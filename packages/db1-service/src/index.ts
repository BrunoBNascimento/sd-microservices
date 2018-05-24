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

    // setup express app here
    // ...

    // start express server
    app.listen(port);

    // insert the first 100 registers
    const generateOneToHundread = async (iterator = 0) => {
        iterator = ++iterator
        console.log(`INSERT JOB, CURRENT INSERT: ${iterator}`)
        const etc = await connection.manager.save(connection.manager.create(Account, {
            cc_codigo: iterator,
            cc_conta_corrente: "19991-9",
            cc_total_reais: Math.random()
        }));

        return iterator === 99 ? -1 : generateOneToHundread(iterator)
    }
    generateOneToHundread()

    const asciiart = `db2service: service is running in port: ${port}
    
    888 888       .d8888b.                                     d8b                  
    888 888      d88P  Y88b                                    Y8P                  
    888 888             888                                                         
.d88888 88888b.       .d88P .d8888b   .d88b.  888d888 888  888 888  .d8888b .d88b.  
d88" 888 888 "88b  .od888P"  88K      d8P  Y8b 888P"   888  888 888 d88P"   d8P  Y8b 
888  888 888  888 d88P"      "Y8888b. 88888888 888     Y88  88P 888 888     88888888 
Y88b 888 888 d88P 888"            X88 Y8b.     888      Y8bd8P  888 Y88b.   Y8b.     
"Y88888 88888P"  888888888   88888P'  "Y8888  888       Y88P   888  "Y8888P "Y8888 `
    console.log(asciiart);

}).catch(error => console.log(error));
