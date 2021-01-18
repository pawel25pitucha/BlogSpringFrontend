import React, { useCallback, useEffect, useRef, useState } from 'react'
import Post from './Post'
import '../Styles/Board.css'
import CreatePost from './CreatePost'
import axios from 'axios'

import Navi from './Navi'
import { useDispatch, useSelector } from 'react-redux'
import logIN from '../actions/login'


const url='http://localhost:8080';

function Board(props) {
    const dispatch = useDispatch();
    const isLogged = useSelector(state => state);
    const[posts, setPosts] = useState([]);
    const[user,setUser] = useState(null);
    
    useEffect(() => {
      loadPosts();
      setUser(props.user);
      

}, [])
const loadPosts=()=>{
  axios.get(`${url}/api/post/get-all`).then(res => {
    console.log(res.data);
        var sorted = res.data.reverse();
        setPosts(sorted);
    
    }).catch(e => {
     
    })
}

const search=(tag)=>{
  if(tag==='') {loadPosts();}
  else{
  var filtered= [];
  posts.map(post => {
    post.tags.map(item=>{
      if(item === tag){
        filtered.push(post);
      }
    })
  });
  setPosts(filtered);
}
}
  
const newPostAdded=()=>{
    loadPosts();
}


    return (
        <div>
              <button onClick={() => dispatch(logIN())}>logout</button>
               <Navi search={search}/>
              {typeof user === 'undefined' ? ' ' : <CreatePost updatePosts={newPostAdded} />}

                {
                    posts.map(post => {
                    return (
                    <div key={post.id}><Post user={user} loadPosts={newPostAdded}  content={post.content} id={post.id} tag={post.tags} authors={post.authors} /></div>
                    )
                    })
                } 
  
               
      
        </div>
    )
}

export default Board
