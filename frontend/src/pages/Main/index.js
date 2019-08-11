import React, { useEffect, useState } from 'react'

import './style.css'

import api from '../../services/api'

import logo from '../../assets/logo.svg'
import like from '../../assets/like.svg'
import dislike from '../../assets/dislike.svg'

export default function Main({ match }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/devs', {
        headers: {
          user: match.params.id,
        }
      })
      setUsers(response.data)
    }

    loadUsers();
  }, [match.params.id]);

  async function handleLike(id) {
    console.log('Like ' + id);
    
  }

  async function handleDeslike(id){
    console.log('Des ' + id);
    
  }

  return (
    <div className="main-container">
      <img src={logo} alt="Tindev"></img>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <img src={user.avatar} alt={user.name}></img>
            <footer>
              <strong>{user.name}</strong>
              <p>{user.bio}</p>
            </footer>
            <div className="buttons">
              <button type="button">
                <img src={dislike} alt="Deslike" onClick={() => handleDeslike(user._id)}></img>
              </button>
              <button type="button">
                <img src={like} alt="Like" onClick={() => handleLike(user._id)}></img>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}