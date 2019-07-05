import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import './Nav.css'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

function Nav(props) {
    const [imgUrl, setImgUrl] = useState('')
    const [username, setUsername] = useState('')


    const logout = () => {
        axios.get('/auth/logout')
        props.history.push('/')
    }
    if (props.location.pathname === '/') return null
    return (
        <div className='Nav'>
            <div className='nav-container'>
                <div className='upper-btns'>
                    <img src={props.reducer.imgurl} className="profile-image"/>
                    <h3 className='username-display'>{props.reducer.username}</h3>
                    <button className="nav-btn">Home</button>
                    <button className="nav-btn">New</button>
                </div>
                <button className="nav-btn" onClick={logout}>Logout</button>
            </div>
        </div>
    )
}

function mapStateToProps(reduxState){
    return reduxState
}


export default withRouter(connect(mapStateToProps)(Nav))
