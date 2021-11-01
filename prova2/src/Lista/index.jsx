import React from 'react'
import './style.css'
import datas from './data.json'
// import { render } from '@testing-library/react'

// const Item = (props) =>{
//     // console.log(props)
//     // const result = Object.entries(props)
//     const result = Object.keys(props).map((key) => props[key])
//     // console.log(result[0])
    
//     return populateList(result[0])
    
// }

// let contador = 0;

// function populateList(list){
//     // if (list.length ==0){
//     //     return(<div>No data to request</div>)
//     // }
//     let array = Object.keys(list).map((key) => list[key])
//     // console.log(array[1])
//     for (let i = 0; i < array.length; i++){
//         let listagem = []
//         let item = Object.keys(array[i]).map((key) => array[i][key])

//         for (let i = 0; i < item.length; i++){
//             listagem[i] = item[i]
//         }

//         if (typeof item[1][1] == 'object'){
//             item = Object.entries(item[1][1])
//             listagem  = item
//             item[0] = listagem[0][1]
//             item[1] = listagem[1][1]
//             item[2] = listagem[2][1]
//             item[3] = listagem[3][1]
//         }

//         if (typeof item[1] != 'string'){
//             item = Object.entries(item[1])
//             listagem = item
//             item[0] = listagem[0][1]
//             item[1] = listagem[1][1]
//             item[2] = listagem[2][1]
//             item[3] = listagem[3][1]
//         }
//         console.log(item)

//         switch(item[3]){
//             case 0:
//                 return(
//                     <div>
//                         <ul className='item'>
//                             <li visible="true">
//                                 <input type="checkbox" level={item[3]} ></input>
//                                 <label >{item[1]}</label>
//                             </li>
//                         </ul>
//                         {
//                             item[2]
//                         ?(
//                             populateList(Object.entries(Object.entries(item[2])))
//                         ):
//                         (<div></div>)
//                         }
//                     </div>
//                 )
//             case 1:
//                 return(
//                     <div>
//                         <ul className='item'>
//                             <ul className='item'>
//                                 <li visible="true">
//                                     <input type="checkbox" level={item[3]} ></input>
//                                     <label >{item[1]}</label>
//                                 </li>
//                             </ul>
//                         </ul>
//                         {
//                             item[2]
//                         ?(
//                             populateList(Object.entries(item[2]))
//                         ):
//                         (<div></div>)
//                         }
//                     </div>
//                 )
//             case 2:
//                 return(
//                     <div>
//                         <ul className='item'>
//                             <ul className='item'>
//                                 <ul className='item'>
//                                     <li visible="true">
//                                         <input type="checkbox" level={item[3]} ></input>
//                                         <label >{item[1]}</label>
//                                     </li>
//                                 </ul>
//                             </ul>
//                         </ul>
//                         {
//                             item[2]
//                         ?(
//                             populateList(Object.entries(item[2]))
//                         ):
//                         (<div></div>)
//                         }
//                     </div>
//                 )

//             case 3:
//                 return(
//                     <div>
//                         <ul className='item'>
//                             <ul className='item'>
//                                 <ul className='item'>
//                                     <ul className='item'>
//                                         <li visible="true">
//                                             <input type="checkbox" level={item[3]} ></input>
//                                             <label >{item[1]}</label>
//                                         </li>
//                                     </ul>
//                                 </ul>
//                             </ul>
//                         </ul>
//                         {
//                             item[2]
//                         ?(
//                             populateList(Object.entries(item[2]))
//                         ):
//                         (<div></div>)
//                         }
//                     </div>
//                 )
        
//             case 4:
//                 return(
//                     <div>
//                         <ul className='item'>
//                             <ul className='item'>
//                                 <ul className='item'>
//                                     <ul className='item'>
//                                         <ul className='item'>
//                                             <li visible="true">
//                                                 <input type="checkbox" level={item[3]} ></input>
//                                                 <label >{item[1]}</label>
//                                             </li>
//                                         </ul>
//                                     </ul>
//                                 </ul>
//                             </ul>
//                         </ul>
//                         {
//                             item[2]
//                         ?(
//                             populateList(Object.entries(item[2]))
//                         ):
//                         (<div></div>)
//                         }
//                     </div>
//                 )
//             default:
//                 return ( <div>Nível não indentificado</div>)
//         }
//     }
// }
let valores
const renderiza = item => {
    valores = Object.entries(item)
    valores = valores[1][1]
    valores = Object.entries(valores)
    // let resultado = [];
    // resultado[0] = valores[0][1]
    // resultado[1] = valores[1][1]
    // resultado[2] = valores[2][1]
    // resultado[3] = valores[3][1]
    // resultado[2] = Object.entries(resultado[2])
    // console.log(Array.isArray(resultado[2]))
    // console.log(valores)
    // level = valores[3][1]
    return valores.map(([key, value])=>
    typeof value == 'object'?(
        // console.log(key+" "+value)
        Object.entries(value).map(renderiza)
    ):(
        <Item type={key} value={value}/>
        // console.log(key+" "+value)

    )
    )
}

// const SubLista  = ({key, value}) =>(
//     <ul>
//         <Item typevar={key} value={value}/>
        
//         if ({key} == 'children'){
           
//         }
        
//     </ul>
// )

const Item = ({key, value}) =>{
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (typeof value == 'string' && letras.match(value[0])){
        // return (<p>{level}</p>)
        switch(valores[3][1]){
            case 0:
                return (
                    <li>
                        <input type='checkbox'/>
                        <label>{value+""}</label>
                    </li>
                    )
            case 1:
                return (
                    <ul><li>
                        <input type='checkbox'/>
                        <label>{value+""}</label>
                    </li></ul>
                    )
            case 2:
                return (
                    <ul><ul><li>
                        <input type='checkbox'/>
                        <label>{value+""}</label>
                    </li></ul></ul>
                    )
            case 3:
                return (
                    <ul><ul><ul><li>
                        <input type='checkbox'/>
                        <label>{value+""}</label>
                    </li></ul></ul></ul>
                    )
            case 4:
                return (
                    <ul><ul><ul><ul><li>
                        <input type='checkbox'/>
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
    

const Lista = () => <ul>{Object.entries(datas).map(renderiza)}</ul>
export default Lista