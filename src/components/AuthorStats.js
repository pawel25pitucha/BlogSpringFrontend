import React, { useEffect, useState } from 'react'
import axios from 'axios'
const url='https://blog-api-spring.herokuapp.com';
export default function AuthorStats(props) {
    const [comments , setComments] = useState('');
    const [posts , setPosts] = useState('');
    const [loading,setLoading]=useState(true);

    useEffect(() => {
        laodAuthorStats();
    }, [props.id])

    //load stats with authors
    const laodAuthorStats =  () => {
        console.log(props.id);
         axios.get(`${url}/authors${props.id}/stats`)
        .then(res => {
            setPosts(res.data.postsNumber);
            setComments(res.data.commentsNumber);
            setLoading(false);
        });
       
    }
    return (
        <div  className="Author-container">
            <div className="AuthorName">
                {props.name}
            </div>
        
            <div className="Stats">
           {loading? <a>loading...</a> : <a>Posts : {posts}</a> } 
           {loading? <a>loading...</a> : <a>Comments : {comments}</a>}
            </div>
     </div>
    )
}
