import React, { useState } from 'react'
import {Navbar , Nav ,InputGroup,FormControl} from 'react-bootstrap'
import '../Styles/Nav.css'
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from 'react-router-dom';


function Navi(props) {

    const [searchValue, setSearchValue]= useState('');


    const handleSubmit = (e) =>{
        if(e.key==='Enter'){
           props.search(searchValue);
        }
    }


    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }
    return (
        <div className="Navi">
              <Navbar className="Navbar" bg="light" variant="light" >
                    <Navbar.Brand>
                        <Link to="/home">
                        <HomeIcon fontSize="large"/>
                        <span>Posts</span>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Brand>
                        <Link to ="/authors">
                        <PersonIcon fontSize="large" />
                        <span>Authors</span>
                        </Link>
                    </Navbar.Brand>
                
                    
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default">Search</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                aria-label="Large"
                                aria-describedby="inputGroup-sizing-default"
                                placeholder="Search posts by #tag"
                                onKeyUp={e => handleSubmit(e)}
                                 onChange={(e)=>handleChange(e)} 
                                 value={searchValue} 
                            />
                        </InputGroup>
             
                </Navbar>
        </div>
    )
}

export default Navi
