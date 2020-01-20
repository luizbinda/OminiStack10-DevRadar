import React, { useState, useEffect} from 'react'
import './style.css'

function DevForm({handlerSubmit}){

    const [gitUser, setGitUser] = useState('');
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect( () => {
        navigator.geolocation.getCurrentPosition(
          (position) =>{
            const {latitude , longitude} = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
          },
          (err) => {
            console.log(err)
          },
          {
            timeout: 30000,
          }
    
        )
    },[]);

    async function onSubmit(e){
        e.preventDefault();

        await handlerSubmit(gitUser, techs, latitude, longitude);

        setGitUser('');
        setTechs('');
    }

    return(
        <form onSubmit={onSubmit}>
            <div className="input-block">
            <label htmlFor="gituser">Usuario do GitHub</label>
            <input 
            name="gituser" 
            id="gituser" 
            required
            value={gitUser}
            onChange={ e => setGitUser(e.target.value)}
            />
            </div>
            <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input 
                name="techs" 
                id="techs"
                required
                value={techs}
                onChange={ e => setTechs(e.target.value)}
            />
            </div>
            <div className="input-group">
            <div className="input-block">
                <label htmlFor="latitude">Latitude</label>
                <input
                type="number"
                name="latitude"
                id="latitude" 
                required 
                value={latitude}
                onChange={ e=> setLatitude(e.target.value)}
                />
            </div>
            <div className="input-block">
                <label htmlFor="longitude">Longitude</label>
                <input
                type="number" 
                name="longitude" 
                id="longitude" 
                required 
                value={longitude}
                onChange={ e=> setLongitude(e.target.value)}
                />
            </div>
            </div>
            <button type="submit">Salvar</button>
        </form>
    );
}

export default DevForm;