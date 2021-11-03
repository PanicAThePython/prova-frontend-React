import React from 'react'
import './style.css'
import datas from './data.json'

let sons = []
let dads = []

let valores
let level = 0
let array = []
let position = -1
     
const renderiza = item => {
    valores = Object.entries(item)
    valores = valores[1][1]
    valores = Object.entries(valores)
    array.push(valores)
    position++
    level = valores[3][1]
    
    return valores.map(([key, value])=>
    typeof value == 'object'?(
        Object.entries(value).map(renderiza)
    ):(
        <Item type={key} value={value} level={level} position={position}/>
        )
    )
}

const Item = ({key, value, level, position}) =>{
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    if (typeof value == 'string' && letras.match(value[0])){
        position-=1000
        if (position > 6){
            position--
        }

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
        return (<p></p>)
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
    else{
        
    }
}
isLocalStorageEmpty('sons')
isLocalStorageEmpty('dads')


function validatingSons(){
    let items = sons.split(',')

    //transformando em numero
    for (let i = 0; i < items.length; i++){
        items[i] = parseInt(items[i])
    }

    //removendo NaN
    for (let i = 0; i < items.length; i++){
        if (items[i] >= 0){
            continue
        }
        else{
            items.splice(i, 1)
        }
    }

    //dando check nos filhos
    for (let i = 0; i < items.length; i++){
        let id = items[i]
        inputs[id].checked = true
    }
}

function validatingDads(){
    //transformando em array
    let items = dads.split(',')

    //transformando em numero
    for (let i = 0; i < items.length; i++){
        items[i] = parseInt(items[i])
    }

    //removendo NaN
    for (let i = 0; i < items.length; i++){
        if (items[i] >= 0){
            continue
        }
        else{
            items.splice(i, 1)
        }
    }

    //dando indeterminate nos pais
    for (let i = 0; i < items.length; i++){
        let id = items[i]
        inputs[id].indeterminate = true
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

const Lista = () => <ul>{Object.entries(datas).map(renderiza)}</ul>
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
    for (let i = pos; i < inputs.length; i++){
        let comparingLevel = inputs[i].getAttribute("data-level")
        let itemPosition = inputs[i].getAttribute("data-position")

        if (comparingLevel > lev){
            inputs[i].checked = boolean
            if (boolean){
                if (sons.find(index => index === initialPosition) === undefined){
                    sons.push(initialPosition)
                }
                sons.push(itemPosition)
            }
            else{
                if (sons.find(index => index === initialPosition) === initialPosition){
                    sons = sons.splice(initialPosition, 1)
                }
                sons = sons.splice(itemPosition, 1)
            }
        }
        else{
            break
        }
    }
    localStorage.setItem('sons', sons)

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