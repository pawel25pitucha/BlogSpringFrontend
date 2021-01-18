import React, { useEffect , useState} from 'react'
import '../Styles/EditComment.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from 'axios'
const url='http://localhost:8080';
function EditComment(props) {
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    useEffect(() => {
     setAuthor(props.author);
     setContent(props.content);
    }, [])

    const saveComment = () => {
        if(author==='' || content === '') alert('Comment must include author and content ');
        else{
            axios({
                method: 'PUT',
                url: `${url}/api/comment/edit`,
                data: {
                    id: props.id,
                    authorId: props.authorId,
                    content: content,
                    post:props.post
                }
              })
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
            <a>authorname: {props.author.name}</a>
        </div>
        <div className="EditComment-content">   
             <textarea className="editInput" onChange={(e)=> setContent(e.target.value)} value={content}></textarea>
        </div>
        <button onClick={saveComment} className="savebutton">save</button>
    </div>
    )
}

export default EditComment
