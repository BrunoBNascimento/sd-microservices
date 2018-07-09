var fs = require('fs')
var _ = require('lodash')


var file = `${__dirname }/lockeds.json`

function getLockedsObject(){
    var data = fs.readFileSync(file)
    return JSON.parse(data);
}

function addIdToLock(id){
    console.log(`Adicionando o id: ${id} a lista de locks`)
    var lockedIds = getLockedsObject()
    lockedIds.push({ id, locked: 1 })
    var uniqueArray = _.uniqBy(lockedIds, 'id');
    var uniqueArrayJson = JSON.stringify(uniqueArray)
    fs.writeFileSync(file, uniqueArrayJson, function (err) {
        if (err)
            return console.log(err);
    });
}

function removeIdFromLock(id){
    try{
        var lockedIds = getLockedsObject()

        var newRemovedArray = _.remove(lockedIds, function(n) {
            return n.id === id;
          });

        var uniqueArrayJson = JSON.stringify(lockedIds)
    
        return fs.writeFileSync(file, uniqueArrayJson, function (err) {
            if (err)
                return console.log(err);
        });
    }catch(e){
        console.log(e)
    }
}

function isIdLocked(id){
    console.log(`Verificando se o ${id} não está lockado`)
    try{
        var lockedIds = getLockedsObject()
        var indexOfId = _.findIndex(lockedIds, function(o) { return o.id == id; });
        if(indexOfId == -1) return false
        else if(lockedIds[indexOfId].locked == 1) return true
        
        return false
    }catch(e){
        console.log(e)
    }
}

module.exports = {
    getLockedsObject,
    addIdToLock,
    removeIdFromLock,
    isIdLocked
}