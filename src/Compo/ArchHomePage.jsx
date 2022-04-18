import React from 'react'
import { Avatar, Box, Button, Card, CardContent, CardHeader, CardMedia, Stack, Typography } from '@mui/material'
// import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

export const ArchHomePage = ({ list }) => {

    let history = useNavigate()
    // useEffect(() => {
    //     console.log(list)
    //     // eslint-disable-next-line
    // }, [])


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
                bgcolor: stringToColor(name)
            },
            children: name.charAt(0),
        };
    }

    function openProject(e) {
        let id = e.currentTarget.dataset.key;
        history(`/project/apply/${id}`);
    }

    return (
        <div>
            <div className="hero">
                <Card sx={{ display: 'flex', my: 4, }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, width: '-webkit-fill-available' }}>
                        <CardContent sx={{ flex: '1 0 ' }}>
                            <Typography component="div" variant="h5" align='left'>
                                Find the best projects <br />
                                for your next project.
                            </Typography>
                            {/* <Typography variant="subtitle1" color="text.secondary" align='left' component="div">
                                Mac Miller
                            </Typography> */}
                        </CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, gap: 1 }}>
                            <Button variant='contained'>Find an architecture</Button>
                            <Button variant='outlined' onClick={() => history('/create/')}>Post a project</Button>

                        </Box>
                    </Box>
                    <CardMedia
                        component="img"
                        sx={{ width: 200 }}
                        image="https://mui.com/static/images/cards/live-from-space.jpg"
                        alt="Live from space album cover"
                    />
                </Card>


                <Typography variant='h5' sx={{ my: 2 }} align='center'>Some of best projects for you</Typography>

                <Stack direction='row' gap={2}>

                    {
                        list && list.map(list => (
                            <Box key={list.id}>
                                <Card sx={{ maxWidth: 345, cursor: 'pointer' }} onClick={openProject} data-key={list.id}>
                                    <CardHeader
                                        avatar={
                                            <Avatar src={list?.posted_by?.Profile_pic} alt="Username" {...stringAvatar(list?.posted_by?.Username ?? '')} />
                                        }

                                        title={list?.name}
                                        // subheader="September 14, 2016"
                                        subheader={list?.posted_by?.city}
                                    />
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image="https://mui.com/static/images/cards/paella.jpg"
                                        alt="Paella dish"
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            {list?.desc}
                                        </Typography>
                                    </CardContent>


                                </Card>
                            </Box>
                        ))
                    }

                </Stack>

            </div>
        </div>
    )
}
