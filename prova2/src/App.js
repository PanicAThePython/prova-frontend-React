import './App.css';
import {useState} from 'react';
import Lista from'./Lista';
import ReactDOM from 'react-dom';
import React, { useEffect } from 'react';


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
