import React, { useState, useContext, useEffect } from 'react'
import { AppBar, Avatar, Badge, Button, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import { Box } from '@mui/system';
import ClickAwayListener from '@mui/material/ClickAwayListener';
// import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../Context/UserContext';
import '../style/navbar.css'


export const Navbar = () => {
    const context = useContext(UserContext);
    let { theme, toggleTheme, profile, url, setUserRole } = context;
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('profile')) !== undefined ? JSON.parse(localStorage.getItem('profile')) : '')
    const [open, setOpen] = useState(false)
    const [result, setResult] = useState()
    const [searchValue, setSearchValue] = useState('')
    let history = useNavigate()

    useEffect(() => {
        // console.log(currentUser)
        // if (profile) {
        // console.log(profile)
        // }
        localStorage.getItem('profile') &&
            // {
            setCurrentUser(JSON.parse(localStorage?.getItem('profile')));
        localStorage.getItem('profile') &&
            setUserRole(currentUser?.user?.user_role)
        // }

        // console.log(loggedinUser.profile.user)

        //eslint-disable-next-line
    }, [profile])

    function handleSearch(e) {
        setSearchValue(e.target.value)
        fetch(`${url}/api/get/home/?search=${e.target.value}`, {
            headers:
            {
                'Authorization': `Token ${JSON.parse(localStorage.getItem('token')).token}`
            }
        }).then(res => res.json()).then(data => setResult(data))
    }


    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }));
    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }));

    const darkTheme = createTheme({
        palette: {
            mode: theme ? 'light' : 'dark',
            primary: {
                main: '#1976d2',
            },
        },
    });


    function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        // console.log(color);
        /* eslint-enable no-bitwise */
        return color;
    }
    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: name.charAt(0),
        };
    }

    return (
        <div>
            <ThemeProvider theme={darkTheme}>

                <ClickAwayListener onClickAway={() => setOpen(false)}>
                    <AppBar position='static'>

                        {/* <LoadingBar
                        color='#f11946'
                        progress={progress}
                    // onLoaderFinished={() => setProgress(0)}
                    /> */}
                        <Toolbar>
                            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Typography>ArchLance</Typography>
                            </Link>

                            <Search >
                                {/* <TextField
                                    onChange={handleSearch}
                                    onClick={e => setOpen(true)}
                                    value={searchValue} /> */}
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    onChange={handleSearch}
                                    onClick={e => setOpen(true)}
                                    value={searchValue}
                                    autoFocus={open}

                                />
                            </Search>

                            <div className="searchItem">
                                <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', display: open ? 'block' : 'none' }}>

                                    <List>
                                        {
                                            result && result.map(data => (
                                                <ListItem key={data.id}>
                                                    <ListItemButton onClick={() => { history(`/user/${data.id}`); setOpen(false) }}>
                                                        <ListItemAvatar>
                                                            <Avatar src={data?.Profile_pic} alt="Username" {...stringAvatar(currentUser?.Username)} />

                                                            {/* <Avatar>
                                                                <InboxIcon />
                                                            </Avatar> */}
                                                        </ListItemAvatar>
                                                        <ListItemText primary={data.Username || data.name} secondary={data.city} />
                                                    </ListItemButton>
                                                </ListItem>
                                            ))
                                        }

                                        {/* <ListItem >
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <DraftsIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Drafts" />
                                            </ListItemButton>
                                        </ListItem> */}
                                    </List>
                                </Box>
                            </div>

                            <Box sx={{ flexGrow: 1 }} />

                            <Box>
                                <IconButton
                                    sx={{ display: { xs: 'none', md: 'inline-flex' } }}
                                    onClick={toggleTheme}
                                    size="large"
                                    aria-label="Change theme"
                                    color="inherit"
                                >

                                    <Brightness4Icon />

                                </IconButton>
                                <IconButton
                                    sx={{ display: { xs: 'none', md: 'inline-flex' } }}

                                    size="large"
                                    aria-label="show 17 new notifications"
                                    color="inherit"
                                >
                                    <Badge badgeContent={17} color="error">
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>

                                {/* user information after login */}
                                {
                                    currentUser ?
                                        <>
                                            <Button variant='text'
                                                color='inherit'
                                                size='large'
                                                onClick={(e) => setAnchorElUser(e.currentTarget)}

                                                startIcon={
                                                    <Avatar src={currentUser?.Profile_pic} alt="Username" {...stringAvatar(currentUser?.Username)} />

                                                }>
                                                <Typography sx={{ ml: 1, display: { xs: 'none', md: 'block' } }}>{currentUser?.Username}</Typography>

                                            </Button>
                                            {/* <IconButton
                                            size="large"
                                            aria-label="Profile"
                                            aria-haspopup="true"
                                            color="inherit"
                                            onClick={(e) => setAnchorElUser(e.currentTarget)}
                                        >
                                            {/* <Avatar  {...stringAvatar(currentUser?.username)}>

                                                {/* {currentUser?.Profile_pic ? currentUser.Profile_pic : currentUser?.username.charAt(0)} 
                                            </Avatar> 
                                            <Avatar src={currentUser?.Profile_pic} alt="Username" {...stringAvatar(currentUser?.username)} />

                                            <Typography sx={{ ml: 1, display: { xs: 'none', md: 'block' } }}>{currentUser?.username}</Typography>
                                        </IconButton> */}
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
                                                onClose={() => setAnchorElUser(null)}
                                            >
                                                <MenuItem onClick={() => { setAnchorElUser(null); }}>
                                                    <Link to={{
                                                        pathname: `/p/${currentUser?.user?.id}`,
                                                        state: currentUser

                                                    }}  >
                                                        <Typography sx={{ color: 'white' }}>Profile</Typography>
                                                    </Link>
                                                </MenuItem>
                                                <MenuItem>
                                                    <Link to='/create'>
                                                        <Typography sx={{ color: 'white' }}>Create project</Typography>
                                                    </Link>
                                                </MenuItem>
                                                <MenuItem onClick={() => { localStorage.removeItem('profile'); localStorage.removeItem('token'); setCurrentUser(null); setAnchorElUser(null) }}>
                                                    <Typography>Logout</Typography>
                                                </MenuItem>


                                            </Menu>
                                        </>
                                        :
                                        <>

                                            <Button color="inherit" variant="text" sx={{ mx: 1 }} onClick={() => history('/signup')} >Sign Up</Button>
                                            <Button color="inherit" variant='outlined' onClick={() => history('/login')}>Login</Button>

                                        </>



                                }
                            </Box>
                        </Toolbar>

                    </AppBar>
                </ClickAwayListener>
            </ThemeProvider>
        </div >
    )
}
