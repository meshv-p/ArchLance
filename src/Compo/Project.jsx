import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import UserContext from '../Context/UserContext';
import { Avatar, Button, Card, CardContent, CardHeader, CardMedia, Container, CssBaseline, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import InboxIcon from '@mui/icons-material/MoveToInbox';

export const Project = () => {
    let { projectId } = useParams()
    const context = useContext(UserContext);
    let { theme, url } = context;
    const [project, setProject] = useState()
    let history = useNavigate()



    useEffect(() => {
        fetch(`${url}/api/postproject/${projectId}/`, {
            headers:
            {
                'Authorization': `Token ${JSON.parse(localStorage.getItem('token')).token}`
            }
        }).then(res => res.json()).then(data => setProject(data))
        console.log(projectId)



        // eslint-disable-next-line
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
                bgcolor: stringToColor(name),
            },
            children: name.charAt(0),
        };
    }

    const itemData = [
        {
            img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
            title: 'Breakfast',
            rows: 2,
            cols: 2,
        },
        {
            img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
            title: 'Burger',
        },
        {
            img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
            title: 'Camera',
        },
        {
            img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
            title: 'Coffee',
            cols: 2,
        },
        {
            img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
            title: 'Hats',
            cols: 2,
        },
        {
            img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
            title: 'Honey',
            author: '@arwinneil',
            rows: 2,
            cols: 2,
        },
        {
            img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
            title: 'Basketball',
        },
        {
            img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
            title: 'Fern',
        },
        {
            img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
            title: 'Mushrooms',
            rows: 2,
            cols: 2,
        },
        {
            img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
            title: 'Tomato basil',
        },
        {
            img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
            title: 'Sea star',
        },
        {
            img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
            title: 'Bike',
            cols: 2,
        },
    ];
    function srcset(image, size, rows = 1, cols = 1) {
        return {
            src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
            srcSet: `${image}?w=${size * cols}&h=${size * rows
                }&fit=crop&auto=format&dpr=2 2x`,
        };
    }

    function openClientProfile(e) {
        let id = e.currentTarget.dataset.key;
        history(`/user/${id}`)
    }

    function openArchiProfile(e) {
        let id = e.currentTarget.dataset.key;
        history(`/user/${id}`)
    }

    return (
        <div>
            <ThemeProvider theme={darkTheme}>

                <CssBaseline />
                <Container sx={{ py: 2 }}>
                    {/* {
        isLoading && <Spinner />
    } */}
                    {
                        project &&
                        // <Card sx={{ background: '#bbdefb' || '#e3f2fd' }}>
                        <Card >
                            <Typography sx={{ m: 1 }}>
                                <Button variant="outlined" onClick={() => history(-1)} color="inherit" startIcon={<ArrowBackIosNewIcon />}>
                                    Go back
                                </Button>
                            </Typography>
                            <CardHeader data-key={project?.posted_by?.id}
                                onClick={openClientProfile}
                                avatar={
                                    <Avatar src={project?.posted_by?.Profile_pic} alt="Username" {...stringAvatar(project?.posted_by?.username ? project.user[0].username : 'Admin')} />
                                }
                                title={
                                    <Link
                                        // to={`/user/${project.user[0]?.user}`}
                                        to={`/user/project.user[0]?.user`}
                                    >
                                        {/* user */}
                                        {project?.posted_by.Username}
                                    </Link>
                                }
                                subheader={new Date(project?.createdAt).toLocaleString()}
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                            />
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                height="440"
                                src={`https://source.unsplash.com/random/?${project.name}` || `https://source.unsplash.com/random/house`}
                                loading='lazy'
                                decoding='async'
                            />
                            <CardContent >
                                {/* <ImageList
                                    sx={{ width: 500, height: 450 }}
                                    variant="quilted"
                                    cols={4}
                                    rowHeight={121}
                                >
                                    {itemData.map((item) => (
                                        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                                            <img
                                                {...srcset(item.img, 121, item.rows, item.cols)}
                                                alt={item.title}
                                                loading="lazy"
                                            />
                                        </ImageListItem>
                                    ))}
                                </ImageList> */}
                                <Typography variant='h4'>
                                    {/* title */}
                                    {project.name}
                                    {/* <Typography>#tag</Typography> */}

                                    {/* {project.title} */}
                                </Typography>
                                <Typography variant='body2' sx={{ my: 2 }} color="text.secondary">
                                    {/* dees */}
                                    {project.desc}
                                </Typography>

                                <Divider sx={{ mt: 2 }} />

                                {/* Apply archi list */}



                                <List
                                    sx={{ width: '100%', bgcolor: 'background.paper' }}
                                    component="nav"
                                    aria-labelledby="nested-list-subheader"

                                >
                                    {
                                        project && JSON.parse(localStorage.getItem('profile')).user.user_role === 'C' && (project?.apply_for).map((user) => (

                                            <ListItem key={user.id}>
                                                <ListItemIcon>
                                                    <Avatar src={user?.Profile_pic} alt="Username" {...stringAvatar(user?.Username ?? 'U')} />
                                                </ListItemIcon>
                                                <ListItemText primary={user.Username} />
                                                <Stack direction='row' gap={2}>
                                                    <Button variant='outlined' data-key={user.id} onClick={openArchiProfile}>Reviews</Button>
                                                    <Button variant='contained' >Approve</Button>

                                                </Stack>
                                            </ListItem>
                                        ))
                                    }

                                </List>





                            </CardContent>



                        </Card>
                    }

                </Container>
            </ThemeProvider>




        </div>
    )
}
