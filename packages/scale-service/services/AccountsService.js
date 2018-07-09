var serviceSocket = require('../serviceSocket').serviceSocket
var lockUtils = require('../utils/exclusiveLock')

function resolveDb(id){
    if(id > 99){
        return serviceSocket('db2service', 'accounts')
    }
    return serviceSocket('db1service', 'accounts')
}

function retirar(id, amount){
    if(lockUtils.isIdLocked(id)){
        return false
    }else{
        lockUtils.addIdToLock(id)
        
        const dbCon = resolveDb(id)
        const result = dbCon({ method: 'PUT', data: { id, amount, action: 'withdraw' } })
        
        return result
    }
}
    

function depositar(id, amount){
    if(lockUtils.isIdLocked(id)){
        return false
    }else{
        lockUtils.addIdToLock(id)
        const dbCon = resolveDb(id)
        const result = dbCon({ method: 'PUT', data: { id, amount, action: 'deposit' } })

        return result
    }
}

function transfer({ idFrom, idTo, amount }){
    try{
        if(
            !lockUtils.isIdLocked(idFrom),
            !lockUtils.isIdLocked(idTo)
        ){
            const retirarIsPromise = retirar(idFrom, amount);
            console.log(retirarIsPromise)
            if(retirarIsPromise == false) return false
            
            else retirarIsPromise.then(function (response) {
                lockUtils.removeIdFromLock(idFrom)
    
                const depositarIsPromise = depositar(idTo, amount);
                if(depositarIsPromise == false) return false
    
                else return depositarIsPromise.then(function (response) {
                    lockUtils.removeIdFromLock(idTo)
                    return true
                }).catch(function(e){
                    console.log(e)
                    return false
                })
            })
        }else{
            var lockedFrom = lockUtils.isIdLocked(idFrom)
            var lockedTo = lockUtils.isIdLocked(idTo)
            lockedFrom && console.log(`Não foi possivel adquirir o lock para realizar a operação em id:${idFrom}`)
            lockedTo && console.log(`Não foi possivel adquirir o lock para realizar a operação em id:${idTo}`)
            return false
        }
    }catch(e){
        console.log(e)
    }
}

module.exports = {
    retirar,
    depositar,
    transfer
}