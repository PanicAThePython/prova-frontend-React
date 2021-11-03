import {getDads, getSons} from './storageFunctions'
let dads = getDads()
let sons = getSons()

const inputs = document.getElementsByTagName('input')
const lis = document.getElementsByTagName('li')

export function isDisplay(type, pos, lev){
    pos++
    for (let i = pos; i < inputs.length; i++){
        let comparingLevel = inputs[i].getAttribute("data-level")
        if (comparingLevel > lev){
            lis[i].style.display = type
        }
        else{
            break
        }
    } 
}


export function isChecked(boolean, pos, lev){
    let initialPosition = inputs[pos].getAttribute("data-position")
    pos++
    let never = true
    for (let i = pos; i < inputs.length; i++){
        let comparingLevel = inputs[i].getAttribute("data-level")
        let itemPosition = inputs[i].getAttribute("data-position")

        if (comparingLevel > lev){
            never = false
            inputs[i].checked = boolean
            addingSons(never, boolean, initialPosition, itemPosition)
        }
        else{
            break
        }
    }
    //entra aqui se não possuir filhos
    if (never){
        addingSons(never, boolean, initialPosition)
        never = false
    }
    localStorage.setItem('sons', sons)

}

export function indeterminatingDads(boolean, initialPosition, lev){
    let fathers = [...inputs].splice(0, initialPosition)
    let fathersIndex = []

    for (let j = initialPosition-1; j >= 0; j--){
        let comparingLevel = fathers[j].getAttribute("data-level")
        let itemPosition = fathers[j].getAttribute("data-position")

        //verificar se já há um elemento de tal nível como indeterminate,
        //para evitar que elementos "irmãos" tenham indeterminate
        if (comparingLevel < lev){
            if (fathersIndex.find(index => index === comparingLevel) === undefined){
                fathers[j].indeterminate = boolean
                if (boolean){
                    if (dads.find(index => index === itemPosition) === undefined){
                        dads.push(itemPosition)
                    }
                }
                else{
                    dads = dads.splice(itemPosition, 1)

                    if(sons.length === 0){
                        dads = []
                    }
                }
            }
        }
        fathersIndex.push(comparingLevel)        
    }
    localStorage.setItem('dads', dads)
}

function addingSons(never, boolean, initialPosition, itemPosition){
    if (boolean){
        if (sons.find(index => index === initialPosition) === undefined){
            sons.push(initialPosition)
        }
        if(!never){
            sons.push(itemPosition)
        }
    }
    else{
        if (sons.find(index => index === initialPosition) === initialPosition){
            sons = sons.splice(initialPosition, 1)
        }
        if(!never){
            sons = sons.splice(itemPosition, 1)
        }
    }
 }