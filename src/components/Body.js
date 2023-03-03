

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Container } from '@mui/system';
import Stack from "@mui/material/Stack";
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import {UserContext} from '../pages/Mainlayer'
import {useContext,useEffect,useState} from "react";





// const g_to_m = {'g1':memberList1, 'g2': memberList2, 'g3': memberList3, 'g4':memberList4};
function GroupNameDialog (props){
    const { onClose, selectedValue, open } = props;
    const [groupname,setGroupname] = React.useState('')
    const handleClose = () => {
        onClose(selectedValue);
    };
    //console.log(selectedValue);
    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Group Members</DialogTitle>
            <MenuList dense>

                {selectedValue.map((name) => (
                    <MenuItem value={name}>
                        {name}
                    </MenuItem>
                ))}

            </MenuList>
        </Dialog>
    )
}
function Body() {

    const [GidList, setGidList] = useState([]);
    const [memberList, setmemberList] = useState([]);

    let email = useContext(UserContext)

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    const [groupDialogOpen, setGroupDialogOpen] = React.useState(false);

    const handleGroupClickOpen = (name,id) => {

          const url=`http://72.140.181.114:4000/getGroupbyid?id=${id}`;
          fetch(url).then(res=>res.json())
              .then((res)=>{
                  if (res.code===1) {

                      setmemberList(res.MemberList)
                      setGroupDialogOpen(true);
                  }
                  else{
                      window.alert('no group info')
                  }
              })

      };
    
    const handleGroupClickClose = () => {
        setGroupDialogOpen(false);
      };



    useEffect( ()=>{


        fetch("http://72.140.181.114:4000/getGroupId",{

            method:"POST",
            headers:{"Content-Type":"application/json"},
            mode: 'cors',
            body:JSON.stringify({email})

        }).then(res=>res.json())
            .then((res)=>{
                if (res.code===1) {
                    setGidList(res.GidList)
                }

                else if (res.code===0){
                    console.log('fail')
                }
            }).catch((error) => {
            console.error(error);
        })},[email])
    return   (
            <Grid container spacing={3} justifyContent="center" sx={{width: '100%'}}>
                <Grid item xs={3} >
                    <h1
                        style={{
                            color: "",
                        }}
                    >
                        My Group
                    </h1>
                    
                    <MenuList dense>
                    
                        {GidList.map((group) => (
                            <MenuItem value={group.gname}  onClick={() => handleGroupClickOpen(group.gname,group.gid)}>
                                {group.gname}
                            </MenuItem>
                        ))}

                    </MenuList>

                    <GroupNameDialog
                        selectedValue={memberList}
                        open={groupDialogOpen}
                        onClose={handleGroupClickClose}
                    />

                </Grid>

                <Grid item xs={8}>
                    <h1
                        style={{
                            color: "",
                        }}
                    >
                        DashBoard
                    </h1>

                    <Grid container spacing={3} justifyContent="center">
                        <Grid item xs={3}>
                            Balance:150
                        </Grid>
                        <Grid item xs={3}>
                            Owe:100
                        </Grid>
                        <Grid item xs={3}>
                            Owed:250
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>

    );
  }
  
  export default Body;