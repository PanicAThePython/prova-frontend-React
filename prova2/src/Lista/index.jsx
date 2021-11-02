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
                        <label>{value+""}</label>
                    </li>
                    )
            case 1:
                return (
                    <ul><li>
                        <input type='checkbox' onClick={clicked} data-position={position} data-level={level}/>
                        <label>{value+""}</label>
                    </li></ul>
                    )
            case 2:
                return (
                    <ul><ul><li>
                        <input type='checkbox' onClick={clicked} data-position={position} data-level={level}/>
                        <label>{value+""}</label>
                    </li></ul></ul>
                    )
            case 3:
                return (
                    <ul><ul><ul><li>
                        <input type='checkbox' onClick={clicked} data-position={position} data-level={level}/>
                        <label>{value+""}</label>
                    </li></ul></ul></ul>
                    )
            case 4:
                return (
                    <ul><ul><ul><ul><li>
                        <input type='checkbox' onClick={clicked} data-position={position} data-level={level}/>
                        <label>{value+""}</label>
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
    
const clicked = e =>{
    const inputs = document.getElementsByTagName('input')
    let pos = e.target.getAttribute("data-position")
    const lev = e.target.getAttribute("data-level")
    let initialPosition = pos

    if (inputs[pos].checked){
        pos++
        
        for (let i = pos; i < inputs.length; i++){
            let comparingLevel = inputs[i].getAttribute("data-level")
            if (comparingLevel > lev){
                inputs[i].checked = true
            }
            else{
                break
            }
        }
        let fathers = [... inputs].splice(0, initialPosition)
    
        for (let j = initialPosition-1; j >= 0; j--){
            let comparingLevel = fathers[j].getAttribute("data-level")
            console.log(comparingLevel)
            console.log(lev)
            
            if (comparingLevel < lev){
                fathers[j].indeterminate = true
            }
        }
    }
    else{
        // console.log(pos)
        // for (let i = pos; i < inputs.length; i++){
        //     let comparingLevel = inputs[i].getAttribute("data-level")
        //     console.log(inputs[i])
        //     console.log(lev)
        //     if (comparingLevel >= lev){
        //         inputs[i].checked = false
        //     }
        //     else{
        //         break
        //     }
        // }
        // let fathers = [... inputs].splice(0, initialPosition)
    
        // for (let j = initialPosition-1; j >= 0; j--){
        //     let comparingLevel = fathers[j].getAttribute("data-level")
            
        //     if (comparingLevel < lev){
        //         fathers[j].indeterminate = false
        //     }
        // }
    }
    
}

const Lista = () => <ul>{Object.entries(datas).map(renderiza)}</ul>
export default Lista