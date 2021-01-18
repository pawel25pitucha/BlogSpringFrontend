import React, { useEffect, useState } from 'react'
import '../Styles/Comment.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from 'axios'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import EditComment from './EditComment';
const url='http://localhost:8080';
function Comment(props) {
    const [edit,setEdit] = useState(false);
    const [author,setAuthor]= useState(null);
    const [checked,setChecked] = useState(false);
  
    useEffect(() => {
        axios.get(`${url}/api/author/get${props.authorId}`)
        .then(res=> {
            setAuthor(res.data);
            check(res.data);
        }
             );
    }, [])

    const deleteComment = () => {
        axios.delete(`${url}/api/comment/delete${props.id}`)
        .then(res => {
            props.reload();
        })
    }
    const changeStatus = () => {
        setEdit(false);
        props.reload();
    }
    function check(author) {
        if(typeof props.user==='undefined'){
            setChecked(false);
        }else{
            if(props.user.name === 'administrator'){
                setChecked(true);
            }else{
                if( author.name=== props.user.name){
                    setChecked(true);
                }   
        }
        }
       }
    
    return (
        <div>
            {
                (edit) ? 
                <EditComment changeStatus={changeStatus} post={props.post} id={props.id} postId={props.postId} author={author} content={props.content}/>
                :
                <div className="Comment">
                    <div>
                        <AccountCircleIcon/>
                        <a>authorname: {' '}</a>
                        <a>{author? author.name : ''}</a>
                    </div>
                    <div className="Comment-content">
                            {props.content}{checked ? <div><EditIcon onClick={()=>setEdit(true)} fontSize="small"/><DeleteIcon onClick={deleteComment} fontSize="small"/></div> : ''}
                    </div>
                 
                </div>
            }
        </div>
      
    )
}

export default Comment
