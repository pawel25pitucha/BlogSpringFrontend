import React, { useState } from 'react'
import "../Styles/Home.css";
import {Container,Row,Col} from 'react-bootstrap';
import Navi from './Navi';
import Board from './Board';
function Home() {


    return (
        <div>
            <Container fluid>
                <Row>
                    <Col xs="1"  sm="1"  md="1"  lg="1"  xl="2"  id="col-1"></Col>
                    <Col xs="10" sm="10" md="10" lg="10" xl="8"  id="col-2">
                    <Container>
                        <Row>
                            <Col xs="0" sm="0" md="0" lg="0" xl="2">
                            
                            </Col>
                            <Col xs="12" sm="12" md="12" lg="12" xl="8">
                                <div className="scroll-container">
                                    <Board/>
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
            
        </div>
    )
}

export default Home;
