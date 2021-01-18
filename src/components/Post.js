import React, { useEffect, useState } from 'react'
import '../Styles/Post.css'
import GroupIcon from '@material-ui/icons/Group';
import ChatIcon from '@material-ui/icons/Chat';
import Comment from './Comment';
import CreateComment from './CreateComment';
import EditIcon from '@material-ui/icons/Edit';
import { Col,Row,Container } from 'react-bootstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios'
import EditPost from './EditPost';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from 'react-redux';
const url='http://localhost:8080';
function Post(props) {
    const [commentsVisibility,setCommentVisibility] = useState(false);
    const [authors , setAuthors]= useState([]);
    const [checked,setChecked]= useState(false);
    const [comments, setComments]= useState([]);
    const [editStatus, setEditStatus]=useState(false);
    const [modalVisibility, setModalVisibility] = useState(false);
    const isLogged = useSelector(state => state);
    const showComments = () =>{
        setCommentVisibility(!commentsVisibility);
    }

    function loadComments(){
        axios.get(`${url}/api/comment/get/post${props.id}`)
        .then(res=> {
            setComments(res.data);
        })
      
   }
  

    useEffect(() => {
      setAuthors(props.authors);
      check(props.authors);
      loadComments();
    }, [])


    const editPost = () => {
        setEditStatus(!editStatus);
    }
    const editDone = () => {
        console.log("edit done");
        editPost();
        props.loadPosts();
    }
   
    function check(authors) {
        if(typeof props.user==='undefined'){
            setChecked(false);
        }else{
            if(props.user.name === 'administrator'){
                setChecked(true);
            }else{
                authors.map(author => {
                console.log(author.name + " ] " + props.user.name);
                if( author.name=== props.user.name){
                    console.log("zgadza sie");
                    setChecked(true);
                } 
                })
        }
        }
       }

    const renderComments= () => {
        if(commentsVisibility){
            return (
                comments&&<div className="scroll-container-comments">
                    <CreateComment post={{id: props.id,authors:authors,tags:props.tag,content:props.content}} reload={loadComments} postId={props.id}/>
                    {comments.map(comment=> <div key={comment.id}><Comment reload={loadComments} post={{id: props.id,authors:authors,tags:props.tag,content:props.content}} user={props.user} content={comment.content} authorId={comment.authorId} id={comment.id} postId={props.id} post={{id: props.id,authors:authors,tags:props.tag,content:props.content}}/> </div>)}          
                 </div> 
            )
        }else {
            return ''
        }
    }

    const deletePost= async ()=>{
       await axios.delete(`${url}/api/post/delete${props.id}`)
        .then(res => {
            console.log(res);
            setModalVisibility(false);
            props.loadPosts();
        } )
    }




    return (
        
<div>
            {(editStatus&&authors) ?  (
                <EditPost editStatus={editDone} id={props.id} content={props.content}  authors={authors} tags={props.tag} />
            ) : (
                <div>
                <div className="Post" >
                <Container>
                <Row>
                    <Col>
                        <div className="Header">
                            <GroupIcon />
                            <h5>Authors:</h5>
                            {authors.map(author => <a key={author.id}>{' '}{author.name},</a>)}
                        </div>
                    </Col>
                    <Col>
                        {props.tag.map(tag=> {
                            return (
                                <a>{tag},</a>
                            )
                        })}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="Content">
                           {props.content}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="Comments-container">
                                <div>
                                    <ChatIcon />
                                    <a>{comments.length} {' '} comments</a>
                                </div>
                                <button onClick={showComments}>Comments</button>
                        </div>
                    </Col>
                    <Col xs="2"  sm="2"  md="2"  lg="2"  xl="2">
                        {checked==true ?
                        <div className="Operations">
                            <EditIcon onClick={editPost}/>
                            <DeleteIcon onClick={() => setModalVisibility(true)}/>
                        </div>
                        :''
                        }   
                    </Col>
                </Row>
            </Container>
           
            { renderComments()}


            <div>
                <Modal
                    show={modalVisibility}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header >
                        <Modal.Title id="contained-modal-title-vcenter">
                            I am going to delete this post! 
                    </Modal.Title>
                    <button onClick={() => setModalVisibility(false)}>x</button>
                    </Modal.Header>
                    <Modal.Body>
                        
                        <h4>Are u okey with that?</h4>
                        
                    </Modal.Body>
                    <Modal.Footer>
                       <button onClick={deletePost}>Delete</button>
                    </Modal.Footer>
                </Modal>
                
            </div>
            
            </div>
 
            </div>
            )
             

            }
  
  </div>       
    )
}

export default Post
