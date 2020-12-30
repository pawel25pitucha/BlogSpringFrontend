import React, { useEffect , useState} from 'react'
import '../Styles/EditComment.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from 'axios'
const url='https://blog-api-spring.herokuapp.com';
function EditComment(props) {
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    useEffect(() => {
     setAuthor(props.author);
     setContent(props.content);
    }, [])

    const saveComment = async () => {
        if(author==='' || content === '') alert('Comment must include author and content ');
        else{
        await axios.post(`${url}/comments/edit`,{'id' : `${props.id}` , 'postId' : `${props.postId}`, 'username' : `${author}` , 'commentContent' : `${content}`})
        .then(res => {
            console.log(res);
            props.changeStatus();
        })
    }
    }
    return (
    <div className="EditComment">
        <div>
            <AccountCircleIcon/>
            <a>authorname: {' '}</a>
            <input  onChange={(e)=> setAuthor(e.target.value)} value={author}></input>
        </div>
        <div className="EditComment-content">   
             <textarea className="editInput" onChange={(e)=> setContent(e.target.value)} value={content}></textarea>
        </div>
        <button onClick={saveComment} className="savebutton">save</button>
    </div>
    )
}

export default EditComment
