
import ListItem from '@mui/material/ListItem';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import * as React from 'react';
import { useState, useEffect, useContext,createContext } from "react";
import {UserContext} from '../pages/Mainlayer'




const groupNumbers = [2,3,4,5,6,7,8,9,10];

export function Groups({number,OnInputsChange}){


  const [inputs, setInputs] = useState(Array.from({ length: number }, () => ({ name: '', email: '' })));


  const handleInputChange = (event, index) => {
        const updatedInputs = [...inputs];
        if (event.target.id === 'name') {
            updatedInputs[index].name = event.target.value;
        } else if (event.target.id === 'email') {
            updatedInputs[index].email = event.target.value;
        }
        setInputs(updatedInputs);
        OnInputsChange(updatedInputs)
    };

    useEffect(() => {
        setInputs(Array.from({ length: number }, () => ({ name: '', email: '' })));
    }, [number]);


  return(

      inputs.map((input, index) => (
          <ListItem key={index}>
              <Avatar sx={{ mr: 2 }}>{index + 1}</Avatar>
              <TextField
                  id="name"
                  label="Name"
                  value={input.name}
                  variant="outlined"
                  sx={{ mb: 2, ml: 0 }}
                  onChange={(event) => handleInputChange(event, index)}
              />
              <TextField
                  id="email"
                  label="Email"
                  value={input.email}
                  variant="outlined"
                  sx={{ mb: 2, ml: 2 }}
                  onChange={(event) => handleInputChange(event, index)}
              />
          </ListItem>
      ))
  );

}

function GroupDialog(props) {
  const { onClose, selectedValue, open } = props;
  const useremail = useContext(UserContext);
  let count = 0;
  const [groupname,setGroupname] = useState('')

  const [Inputs,setInputs]=useState(null)
  const handleClose = () => {
    onClose(selectedValue);
  };
  const [type, setType] = React.useState(10);
  const handleInputs=(newinputs)=>{
      setInputs(newinputs);
  }
  const handleSubmit=()=>{
      let newDate = new Date()
      let separator='-'
      let date = newDate.getDate();
      let month = newDate.getMonth() + 1;
      let year = newDate.getFullYear();
      let groupdate =`${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
      let group = {useremail,groupname,groupdate,Inputs}
      fetch("http://72.140.181.114:4000/addGroup",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          mode: 'cors',
          body:JSON.stringify(group)

      }).then(res=>res.json())
          .then((res)=>{
              if (res.code===1) {
                  alert("add group successfully")
                  handleClose()
                  count+=1;
              }
                  // navto(res.data,res.accessToken)}
                  // else if(res.code===0){
                  //
                  //     alert("User not found with the given email/phone")
              // }
              else if (res.code===0){
                  alert("please check member info")
              }
          })
  }
  return (
    <Dialog onClose={handleClose} open={open}>
         <DialogTitle>Create Group</DialogTitle>

         <Divider/>

        <List>
          <ListItem>
            <TextField id="outlined-basic" label="Group Name" value={groupname} onChange = {(e)=>setGroupname(e.target.value)} variant="outlined" sx ={{mb: 2, ml: 0}}/>
          </ListItem>
          <ListItem>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Amount</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="number"
                  onChange={(e)=>setType(e.target.value)}
                >
                  {groupNumbers.map((expenseType) => (
                    <MenuItem value={expenseType}>
                      {expenseType}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
          </ListItem>
          
          <ListItem>
            Add Members
          </ListItem>

            <Groups number = {type} OnInputsChange={handleInputs}/>

          <ListItem>
            <Button variant="contained" sx = {{mr:25, ml:25}} onClick={handleSubmit} >Submit</Button>
          </ListItem>

        </List>
        
    </Dialog>
  );
}

export default GroupDialog;