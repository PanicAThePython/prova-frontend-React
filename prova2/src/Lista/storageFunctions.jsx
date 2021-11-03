import {toNumber} from './auxFunctions'

let sons = []
let dads = []
let inputs

// localStorage.removeItem("sons")
// localStorage.removeItem("dads")

export function getSons(){
    let sons = []
    return sons
}
export function getDads(){
    let dads = []
    return dads
}

export function isLocalStorageEmpty(local){
    if (localStorage.getItem(local) !== null){
        inputs = document.getElementsByTagName('input')

        if (local === 'sons'){
            sons = localStorage.getItem(local)
            validatingSons()
        }
        else{
            dads = localStorage.getItem(local)
            validatingDads()
        }
    }
}


function validatingSons(){
    sons = sons.split(',')
    let items = toNumber(sons)

    if (items[0] < 0){
        items = items.splice(0, 1)
    }
    if (items[0] >= 0){
        settingState('sons', items)
    }
}

function validatingDads(){
    dads = dads.split(',')
    let items = toNumber(dads)

    if (items[0] < 0){
        items = items.splice(0, 1)
    }
    if (items[0] >= 0){
        settingState('dads', items)
    }
}

function settingState(type, items){
    for (let i = 0; i < items.length; i++){
        let id = items[i]
        if (type === 'sons'){
            inputs[id].checked = true

        }else{
            inputs[id].indeterminate = true
        }
    }
}