
import React, { useState } from 'react'
import {Container,Row ,Col} from 'react-bootstrap'
import '../Styles/CreateComment.css'
import axios from 'axios'
import PickerInput from './PickerInput';
const url='http://localhost:8080';
function CreateComment(props) {
    const [authorValue,setAuthorValue] = useState('');
    const [contentValue,setContentValue] = useState('');



    const contentChange= (e) =>{
        setContentValue(e.target.value);
    }
    const addAuthor=(author)=>{
        setAuthorValue(author.id);
    }
    const addComment=() =>{
       
        if(authorValue==='' || contentValue === '') alert('Comment must include author and content ');
        else{
        axios({
            method: 'POST',
            url: `${url}/api/comment/save`,
            data: {
                authorId: authorValue,
                content: contentValue,
                post:props.post
            }
          }).then(res => {
            console.log(res);
            props.reload()
        });
    }
    }
    return (
        <Container fluid className="CreateCommentContainer">
            <Row>
                <Col>
                    <PickerInput add={addAuthor}/>
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
