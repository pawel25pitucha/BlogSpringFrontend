import React, { useCallback, useEffect, useRef, useState } from 'react'
import Post from './Post'
import {Col, Container, Row} from 'react-bootstrap'
import '../Styles/Board.css'
import CreatePost from './CreatePost'
import axios from 'axios'

import Navi from './Navi'

const postsPerPage = 50;
let arrayForHoldingPosts = [];
const url='https://blog-api-spring.herokuapp.com';

function Board() {

    const[loading ,setLoading]=useState(true);
    const [error , setError] = useState(false);
    const[posts, setPosts] = useState([]);
    const [postsToShow, setPostsToShow] = useState([]);
    const [next, setNext] = useState(3);
    const[authors, setAuthors]=useState([]);
    
    useEffect(() => {

      const loadData = async () => {
        console.log("loading posts...");
        setLoading(true);
        setError(false);
        await axios({
            method: 'GET',
            url: `${url}/posts/get`,
        }).then(res => {
            res.data.map((data,index) => {
                if(!posts.includes(data)){
                    posts.push(data);
                }
            });
            posts.reverse();
            setLoading(false);
            loopWithSlice(0,postsPerPage);
        }).catch(e => {
            setError(true);
        })
      }
    
  loadData();
}, [])


    const searchTags = (tag) => {
        if(tag!==''){
          searchPosts(tag);
        }else setPostsToShow(arrayForHoldingPosts);
    }
    
    const searchPosts = async (tag) =>{
       await axios.get(`${url}/posts/tag/${tag}`)
       .then(res =>  setPostsToShow(res.data));
    }

    const loopWithSlice = (start, end) => {
        let slicedPosts = posts.slice(start, end);
        arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedPosts];
        setPostsToShow(arrayForHoldingPosts);
      };

      const handleShowMorePosts = () => {
        loopWithSlice(next, next + postsPerPage);
        setNext(next + postsPerPage);
      };

      const newPostAdded = () => {
        setNext(0);
        window.location.reload();
      }
    return (
        <div>
      
               <Navi search={searchTags}/>
                <CreatePost updatePosts={newPostAdded} />

                {
                    postsToShow.map(post => {
                    return <div key={post.id}><Post content={post.postContent} id={post.id} tag={post.tag} /></div>
                    })
                } 
                {loading&&<div>Loading...</div>}
               
      
            <button onClick={handleShowMorePosts}>Load more</button>
        </div>
    )
}

export default Board
