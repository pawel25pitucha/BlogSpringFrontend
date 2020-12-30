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
const url='https://blog-api-spring.herokuapp.com';
function Post(props) {
    const [commentsVisibility,setCommentVisibility] = useState(false);
    const [authors , setAuthors]= useState([]);
    const [comments, setComments]= useState([]);
    const [editStatus, setEditStatus]=useState(false);
    const [modalVisibility, setModalVisibility] = useState(false);
    const showComments = () =>{
        setCommentVisibility(!commentsVisibility);
    }

    async function loadComments(){
        const result = await axios.get(`${url}/post${props.id}/comments`);
        if(result.data!=null) setComments(result.data);
   }
    async function loadAuthors(){
        const result = await axios.get(`${url}/post${props.id}/authors`);
        if(result.data!=null) setAuthors(result.data);
       
   }

    useEffect(() => {
      loadAuthors();
      loadComments();
    }, [])


    const editPost = () => {
        setEditStatus(!editStatus);
    }
    const editDone = () => {
        console.log("edit done");
        window.location.reload();
    }
   

    const renderComments= () => {
        if(commentsVisibility){
            return (
                comments&&<div className="scroll-container-comments">
                    <CreateComment reload={loadComments} postId={props.id}/>
                    {comments.map(comment=> <div key={comment.id}><Comment reload={loadComments} id={comment.id} postId={props.id}/> </div>)}          
                 </div> 
            )
        }else {
            return ''
        }
    }

    const deletePost= async ()=>{
       await axios.delete(`${url}/post${props.id}/delete`)
        .then(res => {
            console.log(res);
            setModalVisibility(false);
            window.location.reload();
        } )
    }




    return (
        
<div>
            {(editStatus&&authors) ?  (
                <EditPost editStatus={editDone} id={props.id} content={props.content}  authors={authors} tags={props.tag === 'undefined' ? '' : props.tag} />
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
                        {props.tag === 'undefined' ? '' : `Tags: ${props.tag}`}
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
                        <div className="Operations">
                            <EditIcon onClick={editPost}/>
                            <DeleteIcon onClick={() => setModalVisibility(true)}/>
                        </div>
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
