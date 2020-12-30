import React, { useEffect, useState } from 'react'
import '../Styles/CreatePost.css'
import {Button,Container,Row,Col} from 'react-bootstrap'
import axios from 'axios'
const url='https://blog-api-spring.herokuapp.com';
function CreatePost(props) {
    const [tags,setTags]=useState([]);
    const [tagValue,setTagValue]=useState('');
    const [authorValue,setAuthorValue]=useState('');
    const [postContent,setPostContent] = useState('');
    const [authors, setAuthors] = useState([]);
    const [authorId,setAuthorId]= useState('');
    const [addStatus, setAddStatus]=useState(false);


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

    const handleClickAuthor= (e) =>{
        if(e.key==='Enter'){
            authors.push(authorValue);
            setAuthorValue('');
        }
    }
  
    const handleChangeAuthor= (e) =>{
        setAuthorValue(e.target.value);
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
        await axios.post(`${url}/posts/add` ,{'tag' : `${tags[0]}` , 'postContent' : `${postContent}`})
        .then(res=>{
            addAuthor(res.data.id);
            console.log(res.data);
        }).catch( error => {
            console.log(error);
            alert("You forgot about posts content!")
        });
    }


    async function addAuthor(postId){
        await Promise.all( authors.map((author) => {
            axios.post(`${url}/authors/add` ,{'name':`${author}`})
            .then(res =>{
                console.log(res);
                addAuthorsToPosts(res.data.id,postId);
            }).catch( error => {
                console.log(error);    
            })
        }
       ))
   }
   
     async function addAuthorsToPosts(id,postId){
             console.log(id);
             console.log(postId);
            await axios.post(`${url}/post${postId}/addAuthor${id}`)
             .then(res=>{
                 console.log(res);
                 props.updatePosts();
            })
            .catch(error => console.log(error));
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
                    {
                        authors.length>0 ? 
                        <div>
                            <a>Authors:</a>
                            {
                            authors.map(author => (
                            <a>{' '}{author},</a>
                            ))
                            }
                        </div>
                        :''
                    }
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
                                    <input onKeyUp={e => handleClickAuthor(e)} onChange={(e)=>handleChangeAuthor(e)} value={authorValue} type="text" placeholder="Your nickname"></input>
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
