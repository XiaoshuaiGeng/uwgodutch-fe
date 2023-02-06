import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';

import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import WalletOutlined from '@mui/icons-material/WalletOutlined';

import PropTypes from 'prop-types';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import TextField from '@mui/material/TextField';

function ExpenseDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Add Expense</DialogTitle>
        <div>
          <TextField
            required
            id="outlined-required"
            label = "expense type"
            defaultValue="Ski trip"
          />
          
          <TextField
            required
            id="outlined-password-input"
            label="amount"
            type="password"
            autoComplete="current-password"
          />
          <Button>Submit</Button>

        </div>

    </Dialog>
  );
}

GroupDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

function GroupDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Create Group</DialogTitle>
        <div>
          <TextField
            required
            id="outlined-required"
            label = "expense type"
            defaultValue="Ski trip"
          />
          
          <TextField
            required
            id="outlined-password-input"
            label="amount"
            type="password"
            autoComplete="current-password"
          />
          <Button>Submit</Button>

        </div>

    </Dialog>
  );
}

GroupDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

const settings = ['My Account', 'Create Group', 'Contact Support', 'Logout'];

function Header() {

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [expenseDialogOpen, setExpenseDialogOpen] = React.useState(false);
  const [groupDialogOpen, setGroupDialogOpen] = React.useState(false);

  const handleExpenseClickOpen = () => {
    setExpenseDialogOpen(true);
  };

  const handleExpenseClickClose = (value) => {
    setExpenseDialogOpen(false);
  };

  const handleGroupClickOpen = (value) => {
    setGroupDialogOpen(true);
  };

  const handleGroupClickClose = (value) => {
    setGroupDialogOpen(false);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <WalletOutlined />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            UWGoDutch
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button 
                onClick={handleExpenseClickOpen}
                key="Expense"
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Add Expense
              </Button>

              <ExpenseDialog
                open={expenseDialogOpen}
                onClose={handleExpenseClickClose}
              />

              <Button
                onClick={handleGroupClickOpen}
                key="Group"
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Create Group
              </Button>

              <GroupDialog
                open={groupDialogOpen}
                onClose={handleGroupClickClose}
              />

          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );

  
}
export default Header;