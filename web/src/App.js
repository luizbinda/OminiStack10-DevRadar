import React, { useState, useEffect } from 'react';
import api from './services/api'
import  './global.css'
import  './App.css'
import  './SideBar.css'
import  './Main.css'

import DevItem from './components/DevItem/index'
import DevForm from './components/DevForm/index'

function App() {
  const [devs, setDevs] = useState([]);  

  useEffect( () => {
    async function loadDevs(){
      const response = await api.get('/devs');
      setDevs(response.data);
    }
    loadDevs()
  },[])

  async function handlerSubmit(gitUser, techs, latitude, longitude){
    
    const response = await api.post('/devs',{
      gitUser,
      techs,
      latitude,
      longitude
    })
      
    setDevs([...devs, response.data])
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm handlerSubmit={handlerSubmit}/>
      </aside>
      <main>
        <ul>
          {
            devs.map( dev => {
              return (
                <DevItem dev={dev} id={dev._id}/>
              )
            } )
          }
        </ul>
      </main>
    </div>
  );
}

export default App;
