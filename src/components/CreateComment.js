
import React, { useState } from 'react'
import {Container,Row ,Col} from 'react-bootstrap'
import '../Styles/CreateComment.css'
import axios from 'axios'
const url='https://blog-api-spring.herokuapp.com';
function CreateComment(props) {
    const [authorValue,setAuthorValue] = useState('');
    const [contentValue,setContentValue] = useState('');


    const authorChange= (e) =>{
        setAuthorValue(e.target.value);
    }
    const contentChange= (e) =>{
        setContentValue(e.target.value);
    }
    const addComment=async () =>{
        if(authorValue==='' || contentValue === '') alert('Comment must include author and content ');
        else{
       await axios.post(`${url}/comments/add`,{'postId': `${props.postId}` , 'username' : `${authorValue}` , 'commentContent' : `${contentValue}`})
        .then(res => {
            console.log(res);
            props.reload()
        });
    }
    }
    return (
        <Container fluid className="CreateCommentContainer">
            <Row>
                <Col>
                    <input onChange={e => authorChange(e)} value={authorValue} placeholder="Who are you?"></input>
                </Col>
            </Row>
            <Row>
                <Col>
                   <textarea onChange={e => contentChange(e)} value={contentValue} placeholder="Write comment"></textarea>
                   <button onClick={addComment} className="Add-button">Add</button>
                </Col>
            </Row>
        </Container>
          
    )
}

export default CreateComment
