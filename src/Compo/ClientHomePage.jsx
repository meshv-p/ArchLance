import { Avatar, Box, Button, Card, CardContent, CardMedia, IconButton, Stack, Typography } from '@mui/material'

import React from 'react'
import { useNavigate } from 'react-router-dom';

export const ClientHomePage = ({ list }) => {
    // console.log(list, typeof list, list ?? [0])

    let history = useNavigate()
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
                bgcolor: stringToColor(name), width: 150, height: 150, my: 2
                , fontSize: '29px'
            },
            children: name.charAt(0),
        };
    }

    function openArchitecturePage(e) {
        console.log(e.currentTarget.dataset.key)
        let id = e.currentTarget.dataset.key;
        history(`/user/${id}`, { name: 'meshv' })
    }
    return (
        <div>

            <div className="hero">
                <Card sx={{ display: 'flex', my: 4, }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, width: '-webkit-fill-available' }}>
                        <CardContent sx={{ flex: '1 0 ' }}>
                            <Typography component="div" variant="h5" align='left'>
                                Find the best Architecture <br />
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

            </div>



            <Typography variant='h5' sx={{ my: 2 }} align='center'>Some of best Architecture for you</Typography>


            <Stack direction='row' sx={{ overflowX: 'auto', border: `1px solid rgb(30 30 30)`, borderRadius: 1 }}>



                {
                    list && list?.map(list => (
                        <IconButton sx={{ width: '20%', cursor: 'pointer' }} data-key={list.id} key={list.id} onClick={openArchitecturePage}>
                            <Stack
                                alignItems='center'
                            >
                                {/* <Avatar src='https://mui.com/static/images/avatar/1.jpg' sx={{ width: 82, height: 82, my: 2 }} /> */}
                                {/* <Avatar src={list.Profile_pic} sx={{ width: 150, height: 150, my: 2 }} /> */}
                                <Avatar src={list?.Profile_pic} alt="Username" sx={{ width: 150, height: 150, my: 2 }} {...stringAvatar(list?.Username ?? '')} />
                                <Typography>{list.Name || list.Username}</Typography>
                                <Typography variant='caption' color='text.secondary'>{list.city || ''}</Typography>
                            </Stack>
                        </IconButton>
                    ))
                }


                {/* <Box sx={{ width: '20%' }}>
                    <Stack
                        alignItems='center'
                    >
                        <Avatar src='https://mui.com/static/images/avatar/3.jpg' sx={{ width: 150, height: 150, my: 2 }} />
                        <Typography>Aman hey</Typography>
                        <Typography variant='caption' color='text.secondary'>Nadiad</Typography>
                    </Stack>
                </Box> */}
            </Stack>
        </div>
    )
}
