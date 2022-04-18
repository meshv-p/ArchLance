import { Avatar, Button, Card, CardActionArea, CardContent, CardMedia, Chip, Container, CssBaseline, Dialog, DialogContent, DialogTitle, IconButton, Paper, Rating, Stack, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CallIcon from '@mui/icons-material/Call';
import { Box } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import UserContext from '../Context/UserContext';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export const Profile = () => {

    const context = useContext(UserContext);
    const [modelOpen, setModelOpen] = useState(false)
    let { theme, userRole, url } = context;
    const [currentUser, setCurrentUser] = useState()
    // let l = useLocation()
    let history = useNavigate()
    let { userId } = useParams()
    useEffect(() => {
        // console.log(l);
        if ((userRole ? userRole : JSON.parse(localStorage.getItem('profile'))?.user?.user_role) === 'C') {
            fetch(`${url}/api/getarchi/${userId}/`, {
                headers:
                {
                    'Authorization': `Token ${JSON.parse(localStorage.getItem('token'))?.token}`
                }
            }).then(res => res.json()).then(data => setCurrentUser(data))
            fetch(`${url}/api/getArchiproject/`, {
                headers:
                {
                    'Authorization': `Token ${JSON.parse(localStorage.getItem('token')).token}`
                }
            }).then(res => res.json()).then(data => console.log(data))
        }
        else {
            fetch(`${url}/api/getclients/${userId}/`, {
                headers:
                {
                    'Authorization': `Token ${JSON.parse(localStorage.getItem('token'))?.token}`
                }
            }).then(res => res.json()).then(data => setCurrentUser(data))
        }
        // (currentUser !== null) && console.log(currentUser?.Reviews)
        // setCurrentUser()
        //eslint-disable-next-line
    }, [])

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
                bgcolor: stringToColor(name), width: 150, height: 150, cursor: 'pointer'
            },
            children: name.charAt(0),
        };
    }

    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Container sx={{ mt: 3 }}>
                    <Paper>
                        <Typography sx={{ p: 2 }}>
                            <Button variant="outlined" onClick={() => history('/')} color="inherit" startIcon={<ArrowBackIosNewIcon />}>
                                Go back
                            </Button>
                        </Typography>
                        <Stack direction='row' gap={12} sx={{ p: 3, justifyContent: 'space-around', flexDirection: { xs: 'column', md: 'row' } }}>
                            <div className="pic">
                                {/* <Avatar src={JSON.parse(localStorage.getItem('profile')).Profile_pic}  />   */}
                                <Avatar
                                    onClick={() => setModelOpen(true)}
                                    src={currentUser?.Profile_pic} alt="Username" {...stringAvatar(currentUser?.Username ?? "")} />
                            </div>

                            {/* user profile pic model */}
                            <Dialog open={modelOpen} onClose={() => setModelOpen(false)} maxWidth='md'>
                                <DialogTitle>
                                    <Stack direction='row' justifyContent='space-between' alignItems='center'>

                                        {/* <Typography > */}
                                        Profile pic
                                        {/* </Typography> */}

                                        <IconButton onClick={() => setModelOpen(false)}>
                                            <CloseIcon />
                                        </IconButton>

                                    </Stack>
                                </DialogTitle>
                                <DialogContent>
                                    <img src={currentUser?.Profile_pic} alt={currentUser?.Username} width='auto' style={{ borderRadius: 8, width: '1200px', height: 'auto' }} />
                                </DialogContent>
                            </Dialog>


                            <div className="userSection">
                                {/* <div className="username"></div> */}
                                <Typography variant="h5" >{currentUser?.Username}</Typography>
                                <Typography variant="caption" color="text.secondary">

                                    <div className="username">{currentUser?.city}</div>
                                </Typography>
                                {
                                    currentUser?.user?.user_role === 'A' &&

                                    <Box sx={{ my: 3 }}>
                                        <Typography variant='subtitle1'>Address</Typography>
                                        <Typography variant='caption' color='text.secondary'>{currentUser?.Address}</Typography>
                                    </Box>
                                }
                            </div>
                            <div className="aboutSection">
                                {
                                    currentUser?.user?.user_role === 'A' &&
                                    <div className="reviews">
                                        <Typography>Reviews</Typography>
                                        <Rating name="half-rating" defaultValue={currentUser ? currentUser.Reviews : 1} precision={0.5} />
                                    </div>
                                }
                                <div className="contactSection">
                                    <Typography>Contact</Typography>
                                    <Stack direction='row'>
                                        <IconButton>
                                            <EmailIcon color='primary' />
                                        </IconButton>
                                        <IconButton>
                                            <LinkedInIcon color='primary' />
                                        </IconButton>
                                        <IconButton>
                                            <CallIcon color='primary' />
                                        </IconButton>
                                    </Stack>
                                </div>
                            </div>
                        </Stack>

                        {/* <Button variant="contained" >Projects</Button> */}
                        <Stack alignContent='center'>

                            <Chip label="Projects" color="primary" sx={{ alignSelf: 'center' }} />
                        </Stack>
                        <Stack sx={{ my: 2, p: 2 }}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image="http://mui.com/static/images/cards/contemplative-reptile.jpg"
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Lizard
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Lizards are a widespread group of squamate reptiles, with over 6,000
                                            species, ranging across all continents except Antarctica
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>


                        </Stack>
                    </Paper>
                </Container>
            </ThemeProvider>
        </div >
    )
}
