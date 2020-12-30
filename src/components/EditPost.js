import React, { useEffect, useState } from 'react'
import '../Styles/EditPost.css'
import GroupIcon from '@material-ui/icons/Group';
import ChatIcon from '@material-ui/icons/Chat';
import EditIcon from '@material-ui/icons/Edit';
import { Col,Row,Container } from 'react-bootstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import axios from 'axios';
const url='https://blog-api-spring.herokuapp.com';
function EditPost(props) {
    
    const [authors,setAuthors] =useState([]);
    const [deletedAuthors,setDelatedAuthors] =useState([]);
    const [tags, setTags] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        setAuthors(props.authors);
        setTags(props.tags);
        setContent(props.content);
    }, [])

    const removeAuthor = (author) => {
        let arr = authors.filter(function(item) {
            return item.name !== author.name
        })
        setAuthors(arr);
        deletedAuthors.push(author);
       
    }
    const changeAuthors = (e) =>{
  
        if(e.key==='Enter'){
          let author = {name : e.target.value};
          const list = authors.concat([author]);
          setAuthors(list);
        }
    }
    const changeTag = (e) =>{
  
        if(e.key==='Enter'){
    
          setTags(e.target.value);
       
        }
    }

    const contentChange = (e) =>{
        setContent(e.target.value);
    }

    const saveChanges=() => {
        if(authors.length===0) alert("Dont forget about authors!")
        addPost();
        
    }

    async function addPost(){     
        await axios.post(`${url}/post/edit` ,{'id':`${props.id}`,'tag' : `${tags}` , 'postContent' : `${content}`})
        .then(res=>{
            addAuthor(props.id);
            console.log(res.data);
        }).catch(error => {
            console.log(error);
            alert("Post content is empty");
        })
    }


    async function addAuthor(postId){
        await Promise.all( authors.map((author,index) => {
            axios.post(`${url}/authors/add` ,{'name':`${author.name}`})
            .then(res =>{
                addAuthorsToPosts(res.data.id,postId);
                if(index===authors.length-1) deleteAuthorsToPosts(postId)
            });
       }))
   }
   
     async function addAuthorsToPosts(id,postId){
            await axios.post(`${url}/post${postId}/addAuthor${id}`)
            .catch(error => console.log(error));
    }

    async function deleteAuthorsToPosts(postId){
        
        if(deletedAuthors.length===0) props.editStatus();
        await Promise.all( deletedAuthors.map( (author,index) => {
            axios.delete(`${url}/post${postId}/author${author.id}`)
            .then(res =>{
                console.log(res)
                if(index===deletedAuthors.length-1) props.editStatus();
            } )
           .catch(error => console.log(error));
        }));
      
     
}

    return (
        <div className="EditPost" >
        <Container>
        <Row>
            <Col>
                <div className="EditHeader">
                    <GroupIcon />
                    <h5>Authors:</h5>
                    {authors.map((author) => {
                        return ( <a>{author.name} <RemoveCircleOutlineIcon onClick={removeAuthor.bind(this,author)}/></a>)
                    })} 
                </div>
                <input onKeyUp={e=>changeAuthors(e)} id="addAuthorInput" className="editAuthorsInput" placeholder={'Add new author'}></input><AddCircleOutlineIcon style={{color: "green"}}/>
            </Col>
            <Col>
                Tags: {tags} 
                <input placeholder="Change tags" onKeyUp={e=>changeTag(e)}></input>
                <AddCircleOutlineIcon style={{color: "green"}}/>
            </Col>
        </Row>
        <Row>
            <Col>
                <div className="EditContent">
                   <textarea onChange={e => contentChange(e)} className="EditTextArea" value={content}></textarea>
                </div>
            </Col>
        </Row>
        <Row>
            <Col>
                    <button onClick={saveChanges}>Save changes</button>
            </Col>
            <Col xs="2"  sm="2"  md="2"  lg="2"  xl="2">
                <div className="EditOperations">
                    <EditIcon/>
                    <DeleteIcon/>
                </div>
            </Col>
        </Row>
    </Container>
    </div>
    )
}

export default EditPost
