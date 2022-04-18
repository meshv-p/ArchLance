import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import UserContext from '../Context/UserContext';
import { Avatar, AvatarGroup, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Container, CssBaseline, Divider, IconButton, Stack, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export const ApplyProject = () => {
    let { projectId } = useParams()
    const context = useContext(UserContext);
    let { theme, url } = context;
    const [project, setProject] = useState()
    let history = useNavigate()

    useEffect(() => {
        fetch(`${url}/api/getproject/${projectId}/`, {
            headers:
            {
                'Authorization': `Token ${JSON.parse(localStorage.getItem('token')).token}`
            }
        }).then(res => res.json()).then(data => setProject(data))
        // console.log(project)
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
                                <Button variant="outlined" onClick={() => history('/')} color="inherit" startIcon={<ArrowBackIosNewIcon />}>
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
                                        {project?.posted_by?.Username}
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








                            </CardContent>
                            <CardActions sx={{ p: 2 }}>
                                {/* <Stack> */}

                                <Button variant='contained' >Apply</Button>
                                <Typography sx={{ p: 1 }} variant='caption'>
                                    {
                                        (project?.apply_for)?.length > 0 ?
                                            `${(project?.apply_for)?.length} Archi. have applied for this.` : "Be the first applier for this project."
                                    }


                                </Typography>

                                {
                                    (project?.apply_for)?.length > 0 &&
                                    <AvatarGroup total={(project?.apply_for)?.length ?? 0}>
                                        {
                                            (project?.apply_for).map(user => (
                                                <Avatar alt={user.Username} src={user.Profile_pic} key={user.id} />

                                            ))
                                        }
                                        {/* <Avatar alt="Travis Howard" src="https://mui.com/static/images/avatar/2.jpg" />
                                    <Avatar alt="Agnes Walker" src="https://mui.com/static/images/avatar/4.jpg" />
                                    <Avatar alt="Trevor Henderson" src="https://mui.com/static/images/avatar/5.jpg" /> */}
                                    </AvatarGroup>
                                }


                                {/* </Stack> */}
                            </CardActions>



                        </Card>
                    }

                </Container>
            </ThemeProvider>




        </div>
    )
}
