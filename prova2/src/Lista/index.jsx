import React from 'react'
import './style.css'
import datas from './data.json'
     
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
    pos++
    for (let i = pos; i < inputs.length; i++){
        let comparingLevel = inputs[i].getAttribute("data-level")
        if (comparingLevel > lev){
            inputs[i].checked = boolean
        }
        else{
            break
        }
    }
}

function indeterminatingDads(boolean, initialPosition){
    let fathers = [... inputs].splice(0, initialPosition)
    let fathersIndex = []

    for (let j = initialPosition-1; j >= 0; j--){
        let comparingLevel = fathers[j].getAttribute("data-level")

        //verificar se já há um elemento de tal nível como indeterminate,
        //para evitar que elementos "irmãos" tenham indeterminate
        
        if (comparingLevel < lev){
            if (fathersIndex.find(index => index === comparingLevel) == undefined){
                fathers[j].indeterminate = boolean
            }
        }
        fathersIndex.push(comparingLevel)
    }
}