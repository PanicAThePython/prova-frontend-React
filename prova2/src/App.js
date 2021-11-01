import './App.css';
import {useState} from 'react';
import Lista from'./Lista';
import ReactDOM from 'react-dom';
import React, { useEffect } from 'react';

function populateList(props){

    let element = <div></div>
    console.log(props)
    switch(props.level){
        case 0:
            element = (
                <div>
                    <ul className='item'>
                        <li visible="true">
                            <input type="checkbox" level={props.level} ></input>
                            <label >{props.name}</label>
                        </li>
                    </ul>
                </div>
            )
            break
        case 1:
            element = (
                <div>
                    <ul className='item'>
                        <ul className='item'>
                            <li visible="true">
                                <input type="checkbox" level={props.level} ></input>
                                <label >{props.name}</label>
                            </li>
                        </ul>
                    </ul>
                </div>
            )
            break
        case 2:
            element = (
                <div>
                    <ul className='item'>
                        <ul className='item'>
                            <ul className='item'>
                                <li visible="true">
                                    <input type="checkbox" level={props.level} ></input>
                                    <label >{props.name}</label>
                                </li>
                            </ul>
                        </ul>
                    </ul>
                </div>
            )
            break
        case 3:
            element = (
                <div>
                    <ul className='item'>
                        <ul className='item'>
                            <ul className='item'>
                                <ul className='item'>
                                    <li visible="true">
                                        <input type="checkbox" level={props.level} ></input>
                                        <label >{props.name}</label>
                                    </li>
                                </ul>
                            </ul>
                        </ul>
                    </ul>
                </div>
            )
            break
        case 4:
            element = (
                <div>
                    <ul className='item'>
                        <ul className='item'>
                            <ul className='item'>
                                <ul className='item'>
                                    <ul className='item'>
                                        <li visible="true">
                                            <input type="checkbox" level={props.level} ></input>
                                            <label >{props.name}</label>
                                        </li>
                                    </ul>
                                </ul>
                            </ul>
                        </ul>
                    </ul>
                </div>
            )
            break
        default:
            console.log("level not indetificated")
            break
    }

    ReactDOM.render(element, document.getElementById("root"))
}

function App() {

  // const [name, setName] = useState();
  const [people, setPeople] = useState([]);

  useEffect(()=>{
    fetch("./data.json", {
        headers: {
            Accept: "apliccation/json"
        }
    })
    .then(response => response.json())
    .then(response=> setPeople(response))
    // .then(response => console.log(response))
    .catch((error) =>{
      console.log(error)
    })
  }, [])
    

//   console.log(people)
//   const result = Object.keys(people).map((key) => people[key])
//   console.log("Array:"+result)
  return(
    <div>
       <Lista/>
    </div>)
}

export default App;
