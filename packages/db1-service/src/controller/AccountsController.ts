import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Account} from "../entity/Account";

export class AccountsController {

    private accountRepository = getRepository(Account);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.accountRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.accountRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.accountRepository.save(request.body);
    }

    /*async remove(request: Request, response: Response, next: NextFunction) {
        await this.accountRepository.removeById(request.params.id);
    }*/

}