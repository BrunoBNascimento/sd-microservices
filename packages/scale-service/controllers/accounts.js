var express = require('express');
var router = express.Router();
var retirar = require('../services/AccountsService').retirar
var depositar = require('../services/AccountsService').depositar
var transfer = require('../services/AccountsService').transfer
var lockUtils = require('../utils/exclusiveLock')

/* GET users listing. */
router.get('/', function(req, res, next){
    res.send('ok')
})
router.post('/retirar/:id', function(req, res, next) {
    try{
        const { id } = req.params
        const retirarIsPromise = retirar(id, req.body.amount);

        if(retirarIsPromise == false) res.send({ msg:`Falha ao retirar o recurso: ${id}, provavelmente está locked`, success: false })
    
        else retirarIsPromise.then(function (response) {
            console.log('Removendo lock para o recurso id:' + id)
            lockUtils.removeIdFromLock(id)
            res.send({ msg:"O banco de dados distribuido foi alterado com sucesso!", success: true })
        }).catch(function (error) {
            console.log('Removendo lock para o recurso id:' + id)
            lockUtils.removeIdFromLock(id)
            res.send({ msg:`Falha ao realizar retirada da conta: ${id}`, success: false  })
        })
    }catch(e){
        console.log(e)
    }
});

router.post('/depositar/:id', function(req, res, next) {
    try{
        const { id } = req.params
        const depositarIsPromise = depositar(id, req.body.amount);

        if(depositarIsPromise == false) res.send({ msg:`Falha ao depositar no recurso: ${id}, provavelmente está locked`, success: false })
    
        else depositarIsPromise.then(function (response) {
            console.log('Removendo lock para o recurso id:' + id)
            lockUtils.removeIdFromLock(id)
            res.send({ msg:"O banco de dados distribuido foi alterado com sucesso!", success: true })
        }).catch(function (error) {
            console.log('Removendo lock para o recurso id:' + id)
            lockUtils.removeIdFromLock(id)
            res.send({ msg:`Falha ao realizar retirada da conta: ${id}`, success: false  })
        })
    }catch(e){
        console.log(e)
    }
});

router.post('/transfer', function(req, res, next) {
    try{
        const { idFrom, idTo, amount } = req.body
        if(transfer(req.body))
            res.send({ msg: `Operação de transferencia realizada com sucesso do id ${idFrom} para o id ${idTo}`, success: true })

        res.send({ msg: `Falha ao transferir de ${idFrom} para ${idTo} verifique os locks`, success:false })
    }catch(e){
        console.log(e)
    }
    
});


module.exports = router;
