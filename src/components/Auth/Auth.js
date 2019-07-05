import React, { useState } from 'react'
import './Auth.css'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import {updateUser} from '../../redux/reducer'
function Auth(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleLogin = () => {
        axios.post('/auth/login', { username, password }).then((res) => {
            props.updateUser(res.data)
            
            props.history.push('/dashboard')
        }).catch(err => alert(err))
    }

    const handleRegister = () => {
        axios.post('/auth/register', { username, password }).then((res) => {
            props.updateUser(res.data)
            props.history.push('/dashboard')
        }).catch(err => alert(err))
    }
    return (
        <div className='Auth'>
            <div className='input-box'>
                <div className='logo'>
                    <h1 className='login-title'>
                        Helo
                    </h1>
                </div>
                <div className="form-input">
                    Username:
                    <input
                        type="text"
                        name='username'
                        className="input-field"
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-input">
                    Password:
                    <input
                        type="password"
                        name='password'
                        className="input-field"
                        onChange={e => setPassword(e.target.value)}
                    />

                </div>
                <div className="buttons">
                    <button onClick={handleLogin}>Log In</button>
                    <button onClick={handleRegister}>Register</button>
                </div>
            </div>


        </div>
    )
}

const mapDispatchToProps = {updateUser}

export default withRouter(connect(null, mapDispatchToProps)(Auth))

