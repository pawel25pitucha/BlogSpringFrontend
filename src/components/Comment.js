import React, { useEffect, useState } from 'react'
import '../Styles/Comment.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from 'axios'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import EditComment from './EditComment';
const url='https://blog-api-spring.herokuapp.com';
function Comment(props) {
    const [comment, setComment]= useState([]);
    const [edit,setEdit] = useState(false);


    async function loadComment(){
        const result = await axios.get(`${url}/comments/get${props.id}`);
        setComment(result.data);
        console.log(result.data);
     }
    useEffect(() => {
      loadComment();
    }, [])

    const deleteComment = async() => {
        await axios.delete(`${url}/comment${props.id}/delete`)
        .then(res => {
            console.log(res);
            props.reload();
        })
    }
    const changeStatus = () => {
        setEdit(false);
        loadComment();
    }
    
    return (
        <div>
            {
                (edit) ? 
                <EditComment changeStatus={changeStatus} id={props.id} postId={props.postId} author={comment.username} content={comment.commentContent}/>
                :
                <div className="Comment">
                    <div>
                        <AccountCircleIcon/>
                        <a>authorname: {' '}</a>
                        <a>{comment.username}</a>
                    </div>
                    <div className="Comment-content">
                            {comment.commentContent}<div><EditIcon onClick={()=>setEdit(true)} fontSize="small"/><DeleteIcon onClick={deleteComment} fontSize="small"/></div>
                    </div>
                 
                </div>
            }
        </div>
      
    )
}

export default Comment
