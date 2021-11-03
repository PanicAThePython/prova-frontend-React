import React from 'react'
import './style.css'
import datas from './data.json'
import { isDisplay, isChecked, indeterminatingDads } from './eventFunctions'
import {isLocalStorageEmpty} from './storageFunctions'

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

isLocalStorageEmpty('sons')
isLocalStorageEmpty('dads')

const clicked = e =>{
    pos = e.target.getAttribute("data-position")
    lev = e.target.getAttribute("data-level")
    let initialPosition = pos

    if (inputs[pos].checked){
        isChecked(true, pos, lev)
        indeterminatingDads(true, initialPosition, lev)
    }
    else{
        isChecked(false, pos, lev)
        indeterminatingDads(false, initialPosition, lev)
    }
}

const labels = document.getElementsByTagName('label')

const hideAndShow = e =>{
    pos = e.target.getAttribute("data-position")
    lev = e.target.getAttribute("data-level")

    if (labels[pos].getAttribute("data-hiding") === 'false'){
        isDisplay('none', pos, lev)
        e.target.setAttribute('data-hiding', true)
    }
    else{
        isDisplay('list-item', pos, lev)
        e.target.setAttribute('data-hiding', false)
    }
}

const Lista = () => <ul>{Object.entries(datas).map(rendering)}</ul>
export default Lista