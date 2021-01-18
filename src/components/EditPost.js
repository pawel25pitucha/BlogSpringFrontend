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
import PickerInput from './PickerInput';
const url='http://localhost:8080';

function EditPost(props) {
    
    const [authors,setAuthors] =useState([]);
    const [deletedAuthors,setDelatedAuthors] =useState([]);
    const [tags, setTags] = useState([]);
    const [content, setContent] = useState('');
    const [tagValue,setTagValue]=useState("");

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
       
    }

    const removeTag = (tag) => {
        let arr = tags.filter(function(item) {
            return item !== tag
        })
        setTags(arr);
   
       
    }
 
    const changeTag = (e) =>{

          setTags([...tags,tagValue]);
    }
    const handleChangeTag=(e)=>{
        setTagValue(e.target.value);
    }

    const contentChange = (e) =>{
        setContent(e.target.value);
    }

    const saveChanges=() => {
        if(authors.length===0) alert("Dont forget about authors!")
        addPost();
        
    }

    async function addPost(){     
        axios({
            method: 'PUT',
            url: `${url}/api/post/edit`,
            data: {
                id: props.id,
                tags: tags,
                content: content,
                authors:authors
            }
          }).then(res=>{
              console.log(res);
              props.editStatus();
          })
    }

    const addAuthor=(author)=>{
        if(author!=null){
        if(authors.includes(author)) alert("Ten autor został już dodany")
        else {const list = authors.concat([author]);
        setAuthors(list);
        }
        }
    }


    return (
        <div className="EditPost" >
        <Container>
        <Row>
            <Col>
                <div className="EditHeader">
                    <GroupIcon />
                    <h5>Authors:</h5>
                    {authors&&authors.map((author) => {
                        return ( <a>{author.name} <RemoveCircleOutlineIcon onClick={removeAuthor.bind(this,author)}/></a>)
                    })} 
                    <PickerInput add={addAuthor}/>
                </div>
              
            </Col>
            <Col>
                    Tags: {
                        tags&&tags.map(tag=> {
                            return (
                                <a>{tag} <RemoveCircleOutlineIcon onClick={removeTag.bind(this,tag)}/>,</a>
                            )
                        })
                    }
                <input placeholder="Change tags" onChange={e=>handleChangeTag(e)} value={tagValue}></input><button onClick={changeTag}>add</button>
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
