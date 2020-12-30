import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Container,Row,Col} from 'react-bootstrap'
import Navi from './Navi';
import '../Styles/Authors.css'
import AuthorStats from './AuthorStats';
const url='https://blog-api-spring.herokuapp.com';
const authorsPerPage = 50;
let arrayForHoldingPosts = [];
function Authors() {
    const [authors, setAuthors] = useState([]);
    const [authorsToShow, setAuthorsToShow] = useState([]);
    const [search , setSearch ] = useState('');
    const [next, setNext] = useState(50);
    useEffect(() => {
        laodAuthors();
    }, [])

    //load stats with authors
    const laodAuthors = async () => {
        await axios.get(`${url}/authors/get`)
        .then(res => {
           res.data.map( author=>{
               authors.push(author);
           })
           loopWithSlice(0,authorsPerPage);
        });
    }
    const searchAuthor= async (e) =>{
        if(e.key==='Enter'){
            await axios.get(`${url}/authors/getByName${search}`)
            .then(res => {
                if(res.data!=='') setAuthorsToShow([res.data]);
                else alert('No results');
            })
        }
        if(e.target.value === '') {
            laodAuthors();
        }    
       
    }

    const loopWithSlice = (start, end) => {
        let slicedPosts = authors.slice(start, end);
        arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedPosts];
        setAuthorsToShow(arrayForHoldingPosts);
      };

      const handleShowMoreAuthors = () => {
        loopWithSlice(next, next + authorsPerPage);
        setNext(next + authorsPerPage);
      };

 

    return (

            <Container fluid>
                <Row>
                    <Col xs="1"  sm="1"  md="1"  lg="1"  xl="2"  id="col-1"></Col>
                    <Col xs="10" sm="10" md="10" lg="10" xl="8"  id="col-2">
                    <Container>
                        <Row>
                            <Col xs="0" sm="0" md="0" lg="0" xl="2">
           
                            </Col>
                            <Col  xs="12" sm="12" md="12" lg="12" xl="8">
                   
                                <div className="Authorscroll-container">
                                <Navi/>
                                <input onKeyUp={e=>searchAuthor(e)} onChange={(e)=>setSearch(e.target.value)} value={search} placeholder="Find Author" ></input>
                                    {
                                        authorsToShow.map(author => {
                                             return (
                                                    <AuthorStats id={author.id} name={author.name}/>
                                             )  
                                        })
                                    }
                                 <button onClick={handleShowMoreAuthors}>Load more</button>

                                </div>
                            </Col>
                            <Col xs="0"  sm="0"  md ="0" lg="0"  xl="2"></Col>
                        </Row>
                    </Container>
                    </Col>
                    <Col xs="1"  sm="1"  md="1"  lg="1"  xl="2" id="col-3">
    
                    </Col>
                </Row>
            </Container>
            

    )
}



export default Authors
