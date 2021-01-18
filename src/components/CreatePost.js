import React, { useEffect, useState } from 'react'
import '../Styles/CreatePost.css'
import {Button,Container,Row,Col} from 'react-bootstrap'
import axios from 'axios'
import PickerInput from './PickerInput';
const url='http://localhost:8080';
function CreatePost(props) {
    const [tags,setTags]=useState([]);
    const [tagValue,setTagValue]=useState('');
    const [authorValue,setAuthorValue]=useState('');
    const [postContent,setPostContent] = useState('');
    const [authors, setAuthors] = useState([]);


    const handleClick= (e) =>{
        if(e.key==='Enter'){
            tags.push(tagValue);
            setTagValue('');
        }
    }
    const handleChange= (e) =>{
        setTagValue(e.target.value);
    }

    /*----------------------------------*/
    const addAuthor=(author) => {
        if(author!=null){
        if(!authors.includes(author)) setAuthors([...authors,author]);
        else alert("już dodałeś tego autora")
        }
    }



    /*----------------------------------*/
    const postContentChange =(e) => {
        setPostContent(e.target.value);


    /*----------------------------------*/
    }
    const savePost =  () =>{
        if(authors.length===0) alert("Dont forget about authors!");
        else addPost();
    }

    async function addPost(){     
         axios({
            method: 'POST',
            url: `${url}/api/post/save`,
            data: {
            authors:authors,
            content: postContent,
            tags:tags,
            }
          }).then(res=> props.updatePosts());
        
    }

   
    return (
        <div className="CreatePost">

  
        <Container>
            <Row>
                <Col>
                    {
                        tags.length>0 ?
                        tags.map(tag => (
                            <a>#{tag}</a>
                        ))
                        :''
                    }
                </Col>   
                <Col>        
                        <div>
                            <a>Authors:</a>
                            {
                                authors.length?
                                authors.map(author => {
                                   
                                       return ( <a key={author.id}>{author.name},</a> )
                                    
                                 } ) : ''
                            }
                        </div>                  
                </Col> 
            </Row>
            <Row>
                <Col>
                    <form>
                        <textarea onChange={e => postContentChange(e)} value={postContent} placeholder="Hey, how u doin?"></textarea>
                    </form>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Container>
                            <Row>
                                <Col>
                                    <a>Leave some tags:</a>
                                    <input onKeyUp={e => handleClick(e)} onChange={(e)=>handleChange(e)} value={tagValue} placeholder="Add tag"></input></Col>
                                <Col>
                                    <a>Authors:</a>
                                    <PickerInput add={addAuthor}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <Col xs="6"  sm="6"  md ="6" lg="6"  xl="6">
                                    <Button className="add-button" onClick={savePost}  size="sm" style={{backgroundColor:"#12343b"}}>Add Post</Button>
                                </Col>
                                <Col></Col>
                            </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
        </div>
    )
}

export default CreatePost
