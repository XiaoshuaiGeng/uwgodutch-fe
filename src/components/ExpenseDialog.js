import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { OutlinedInput,Checkbox, ListItemText } from '@mui/material';
import React, {useState, useEffect, useContext, useRef} from "react";
import {UserContext} from '../pages/Mainlayer'
import axios from 'axios';

let group_names = [];
let group_gids = {};

function SelectType({typename,types,feedGroup}) {

    const [type, setType] = useState('');

    const handleChange = (event) => {
        setType(event.target.value);
        feedGroup(group_gids[event.target.value])
        
    };

    return (
        <Box sx={{ minWidth: 160 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{typename}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="expense type"
                    onChange={handleChange}
                >
                    {types.map((expenseType) => (
                        <MenuItem value={expenseType}>
                            {expenseType}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

//Select Payer(One or Multiple) from group member list
// Param: 
function SelectPayer({groupMembers, payerName, setPayerName}){
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            },
        },
    };

    const handleChange = (event) => {
        const {
        target: { value },
        } = event;
        setPayerName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
        
    };
    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Payers</InputLabel>
                <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={payerName}
                onChange={handleChange}
                input={<OutlinedInput label="Payers" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
                >
                {groupMembers.map((name) => (
                    <MenuItem key={name} value={name}>
                    <Checkbox checked={payerName.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
        </div>
    )
}

function ExpenseDialog(props) {
    const { onClose, selectedValue, open } = props;
    const [expensename,setExpensename]=useState("")
    const [expensedate,setExpensedate]=useState("")
    
    const [group,setGroup] = useState('')
    const [amount,setAmount]= useState('')
    const [groupMembers, setGroupMembers] = useState([])
    const [borrowers, setBorrowers] = useState([])


    const [payerName, setPayerName] = useState([]);
    const email = useContext(UserContext);

    const handleClose = () => {
        onClose(selectedValue);
    };
    const getGroup=(group)=>{
        setGroup(group)
    }
    const handleListItemClick = (value) => {
        onClose(value);
    };
    const handleSubmit=()=>{
        let newDate = new Date()
        let separator='-'
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let expensedate =`${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
        let expense = {expensename,expensedate,group,amount}
        fetch(`${process.env.REACT_APP_HOSTNAME}/addExpense`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            mode: 'cors',
            body:JSON.stringify(expense)

        }).then(res=>res.json())
            .then((res)=>{
                if (res.code===1) {
                    alert("add expense successfully")
                    handleClose()

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

    useEffect( ()=>{
        fetch(`${process.env.REACT_APP_HOSTNAME}/getGroupId`,{
        
        method:"POST",
        headers:{"Content-Type":"application/json"},
        mode: 'cors',
        body:JSON.stringify({email})

    }).then(res=>res.json())
        .then((res)=>{
            if (res.code===1) {
                for (let i = 0; i < res.GidList.length; i++) {
                    
                    let group_info = res.GidList[i];
                    group_names.push(group_info.gname);
                    group_gids[group_info.gname] = group_info.gid;
                }
                // console.log(group_names)
                // console.log(group_gids)

            }
                // navto(res.data,res.accessToken)}
                // else if(res.code===0){
                //
                //     alert("User not found with the given email/phone")
            // }
            else if (res.code===0){
                console.log('fail')
            }
        }).catch((error) => {
                console.error(error);
            })},[email])

        useEffect(()=> {
            
            const getGroupMembers = async () => {
                // console.log(group)
                const response = await axios.get(`${process.env.REACT_APP_HOSTNAME}/getGroupbyid`,
                {
                    params: {
                        id: group
                    }
                })
                // console.log(response)
                setGroupMembers(response.data.MemberList)
            }
            if(group !== ''){
                setPayerName([])
                getGroupMembers().catch(console.error)

            }
        }, [group])
    return (
      <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth='md' >
        <DialogTitle>Add Expense</DialogTitle>
          <List sx={{ pt: 0 }}>
              <ListItem>
                  <TextField id="outlined-basic" label="Expense Name" value={expensename} onChange = {(e)=>setExpensename(e.target.value)} variant="outlined" sx ={{mb: 0, ml: 0}}/>
              </ListItem>
              <ListItem>
                  <TextField id="outlined-basic" label="Expense Date" value={expensedate} onChange = {(e)=>setExpensedate(e.target.value)} variant="outlined" sx ={{mb: 0, ml: 0}}/>
              </ListItem>
            <ListItem >
              <SelectType typename = 'Group' types = {group_names} feedGroup={getGroup}/>
            </ListItem >
            <ListItem >
              <TextField
                required
                id="outlined-password-input"
                label="amount"
                autoComplete="current-password"
                value={amount} onChange = {(e)=>setAmount(e.target.value)}
              />
            </ListItem>
            <ListItem >
              <SelectPayer groupMembers={groupMembers} payerName={payerName} setPayerName={setPayerName} />
            </ListItem>
            <ListItem >
              <Button variant="contained" onClick={() => handleSubmit()} sx = {{mr:10, ml:10}}>Submit</Button>
            </ListItem>
          </List>
      </Dialog>
    );
  }

  export default ExpenseDialog