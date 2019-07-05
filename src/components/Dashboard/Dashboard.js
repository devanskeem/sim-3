import React, {useState, useEffect} from 'react'
import './Dashboard.css'
import axios from 'axios'
import {connect} from 'react-redux'
import {updatePosts} from '../../redux/reducer'


function Dashboard(props) {
    const [searchInput, setSearchInput] = useState('')
    const [showMyPosts, setShowMyPosts] = useState(false)


    const handleSearchInput = e => {
        setSearchInput(e.target.value)
    }
    const handleReset = e => {
        setSearchInput('')
    }
    const toggleCheckbox = e => {
        setShowMyPosts(!showMyPosts)
    }

    useEffect(() => {
        if (!props.reducer.posts[0]){
            axios.get(`/data/search`).then(res => {
                props.updatePosts(res.data)
            })
        }
    })

    const handleSearch = () => {
        axios.get(`/data/search?showMyPosts=${showMyPosts}&searchInput=${searchInput}`, {
            showMyPosts,
            searchInput
        }).then(res => {
            props.updatePosts(res.data)
        })
    }
    const postDisplay = props.reducer.posts.map(post => {
        return (
            <div>
                <h1>{post.title}</h1>
                <img src={post.post_imgurl} alt=""/>
            </div>
        )
    })
    return (
        <div className='Dashboard'>
            <div className="search-container">
                <div className="searchbar">
                    <input type="text" placeholder='Search by Title' value={searchInput} className="search-input" onChange={e => handleSearchInput(e)}/>
                    <button className="reset-btn" onClick={handleReset}>x</button>
                    <button className='reset-btn' onClick={handleSearch}>Search</button>
                </div>
                <div className='my-posts-checkbox'>
                My Posts
                <input onClick={e => toggleCheckbox(e)} type="checkbox"/>
                </div>
            </div>
            {postDisplay}
        </div>
    )
}

const mapDispatchToProps = {updatePosts}


function mapStateToProps(reduxState){
    return reduxState
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

