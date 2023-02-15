

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

function Body() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

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
                        <MenuItem>
                            <ListItemText inset>Ski</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemText inset>Dinner</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemText inset>Meeting</ListItemText>
                        </MenuItem>
                    </MenuList>
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