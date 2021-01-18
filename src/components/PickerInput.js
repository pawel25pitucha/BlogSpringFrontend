import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
export default function PickerInput(props) {
    const url="http://localhost:8080";
    const [authors,setAuthors]=useState([]);
    const[addedAuthors,setAddedAuthors]= useState([]);

useEffect(() => {
    axios({
        method: 'GET',
        url: `${url}/api/author/get-all`,
      }).then(res=>{
          setAuthors(res.data);
      })
}, [])
const handleChange=(e,value)=>{
        props.add(value);
}
  return (
      <div>
          {addedAuthors.map(author => {
              return(
                  <div key={author.id}>
                    <h3>{author.name}</h3>
                  </div>
              )
          })}
            <Autocomplete
                id="combo-box-demo"
                options={authors}
                getOptionLabel={(author) => author.name}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Wybierz autora" variant="outlined" />}
                onChange={handleChange}
            />

      </div>
  );
}


