import './App.css';
import Lista from'./Lista';
import React, { useEffect } from 'react';

function App() {

  useEffect(()=>{
    fetch("./data.json", {
        headers: {
            Accept: "apliccation/json"
        }
    })
    .then(response => response.json())
    .catch((error) =>{
      console.log(error)
    })
  }, [])
    
  return(
    <div>
       <Lista/>
    </div>)
}

export default App;