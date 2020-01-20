import React from 'react'
import './style.css'

function DevItem({dev}){
    return(
        <li className="dev" >
                  <header>
                    <img src={dev.avatar_url} alt="Luiz"/>
                    <div className="user-info">
                      <strong>{dev.nome}</strong>
                      <span>{dev.techs.join(', ')}</span>
                    </div>
                  </header>
                  <p>{dev.biografia}</p>
                  <a href={`https://github.com/${dev.git_user}`}>Acessar perfil no github</a>
        </li>
    );
}

export default DevItem;