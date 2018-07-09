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

    async update(request: Request, response: Response, next: NextFunction) {
        const { amount, id, action } = request.body.data
        console.log('DB2SERVICE, ALTERANDO A CONTA: ' + id)
        const account = await this.accountRepository.findOne(id)
        if(action == 'withdraw') account.cc_total_reais = account.cc_total_reais - parseInt(amount)
        else if(action == 'deposit') account.cc_total_reais = account.cc_total_reais + parseInt(amount)
        else account.cc_total_reais = account.cc_total_reais - parseInt(amount)
        console.log('Saldo final da conta: ' + id + ' -> ' + account.cc_total_reais)
        return await this.accountRepository.save(account);
    }
    
    /*async remove(request: Request, response: Response, next: NextFunction) {
        await this.accountRepository.removeById(request.params.id);
    }*/

}