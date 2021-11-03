import React from 'react'
import './style.css'
import datas from './data.json'

let sons = []
let dads = []

let values
let level = 0
let position = -1
     
const rendering = item => {
    values = Object.entries(item)
    values = values[1][1]
    values = Object.entries(values)
    position++
    level = values[3][1]
    
    return values.map(([key, value])=>
    typeof value == 'object'?(
        Object.entries(value).map(rendering)
    ):(
        <Item value={value} level={level} position={position}/>
        )
    )
}

const Item = ({value, level, position}) =>{
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÉ'

    if (typeof value == 'string' && letters.match(value[0])){
        position-=1000

        switch(level){
            case 0:
                return (
                    <li>
                        <input type='checkbox' onClick={clicked} data-position={position} data-level={level}/>
                        <label onDoubleClick={hideAndShow} data-hiding={false} data-position={position} data-level={level}>{value+""}</label>
                    </li>
                    )
            case 1:
                return (
                    <ul><li>
                        <input type='checkbox' onClick={clicked} data-position={position} data-level={level}/>
                        <label onDoubleClick={hideAndShow} data-hiding={false} data-position={position} data-level={level}>{value+""}</label>
                    </li></ul>
                    )
            case 2:
                return (
                    <ul><ul><li>
                        <input type='checkbox' onClick={clicked} data-position={position} data-level={level}/>
                        <label onDoubleClick={hideAndShow} data-hiding={false} data-position={position} data-level={level}>{value+""}</label>
                    </li></ul></ul>
                    )
            case 3:
                return (
                    <ul><ul><ul><li>
                        <input type='checkbox' onClick={clicked} data-position={position} data-level={level}/>
                        <label onDoubleClick={hideAndShow} data-hiding={false} data-position={position} data-level={level}>{value+""}</label>
                    </li></ul></ul></ul>
                    )
            case 4:
                return (
                    <ul><ul><ul><ul><li>
                        <input type='checkbox' onClick={clicked} data-position={position} data-level={level}/>
                        <label onDoubleClick={hideAndShow} data-hiding={false} data-position={position} data-level={level}>{value+""}</label>
                    </li></ul></ul></ul></ul>
                    )
            default:
                break
        } 
    }
    else{
        return (<ul></ul>)
    }
}

const inputs = document.getElementsByTagName('input')
let pos
let lev

// localStorage.removeItem("sons")
// localStorage.removeItem("dads")

function isLocalStorageEmpty(local){
    if (localStorage.getItem(local) !== null){
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
isLocalStorageEmpty('sons')
isLocalStorageEmpty('dads')

function toNumber(array){
    let items = array
    for (let i = 0; i < items.length; i++){
        items[i] = parseInt(items[i])
    }
    return items
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

function validatingSons(){
    sons = sons.split(',')
    let items = toNumber(sons)

    if (items[0] >= 0){
        settingState('sons', items)
    }
}

function validatingDads(){
    dads = dads.split(',')
    let items = toNumber(dads)

    if (items[0] >= 0){
        settingState('dads', items)
    }
}

const clicked = e =>{
    pos = e.target.getAttribute("data-position")
    lev = e.target.getAttribute("data-level")
    let initialPosition = pos

    if (inputs[pos].checked){
        isChecked(true)
        indeterminatingDads(true, initialPosition)
    }
    else{
        isChecked(false)
        indeterminatingDads(false, initialPosition)
    }
    
}

const lis = document.getElementsByTagName('li')
const labels = document.getElementsByTagName('label')

const hideAndShow = e =>{
    pos = e.target.getAttribute("data-position")
    lev = e.target.getAttribute("data-level")

    if (labels[pos].getAttribute("data-hiding") === 'false'){
        isDisplay('none')
        e.target.setAttribute('data-hiding', true)
    }
    else{
        isDisplay('list-item')
        e.target.setAttribute('data-hiding', false)
    }
}

const Lista = () => <ul>{Object.entries(datas).map(rendering)}</ul>
export default Lista

function isDisplay(type){
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

function isChecked(boolean){
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

function indeterminatingDads(boolean, initialPosition){
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
                    dads.push(itemPosition)
                }
                else{
                    dads = dads.splice(itemPosition, 1)
                }
            }
        }
        fathersIndex.push(comparingLevel)
    }
    localStorage.setItem('dads', dads)
}