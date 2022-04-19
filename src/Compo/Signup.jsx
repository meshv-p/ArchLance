import React, { useContext, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import blogContext from '../Context/BlogContext';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../Context/UserContext';
import { FormControl, FormLabel, Radio, RadioGroup, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

export const Signup = () => {

    const [signupDetails, setSignupDetails] = useState({
        username: "",
        password: "",
        email: "",
        name: "",
        number: "",
        user_role: "A"
    })

    const [open, setOpen] = useState(false)
    const [blogError, setBlogError] = useState("")
    const context = useContext(UserContext)
    let { theme, url } = context;
    const darkTheme = createTheme({
        palette: {
            mode: theme ? 'light' : 'dark',
            primary: {
                main: '#1976d2',
            },
        },
    });
    let history = useNavigate()


    const handleSubmit = async () => {
        console.log(signupDetails)
        let res = await fetch(`${url}/api/create/user/`, {
            method: "POST",
            body: JSON.stringify(signupDetails),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        // .then(data => data.json()).then(d => console.log(d))

        let status = await res.json()
        if (res.status === 201) {
            setOpen(true)
            setBlogError({ type: "success", msg: "User Created..." })
            setSignupDetails({
                username: "", password: "", email: "", name: "", number: "", user_role: ""
            })
            history('/login')
        }
        else {

            setBlogError({ type: "error", msg: "some error occured..." })
            setOpen(true)
        }

    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                            <Alert onClose={handleClose} severity={blogError?.type} sx={{ width: '100%' }}>
                                {blogError?.msg}
                            </Alert>
                        </Snackbar>

                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="name"
                                        required
                                        fullWidth
                                        id="Name"
                                        label="Name"
                                        autoFocus
                                        value={signupDetails.name}
                                        onChange={(e) => setSignupDetails({ ...signupDetails, [e.target.name]: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        name="username"
                                        autoComplete="family-name"
                                        value={signupDetails.username}
                                        onChange={(e) => setSignupDetails({ ...signupDetails, [e.target.name]: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        value={signupDetails.email}
                                        onChange={(e) => setSignupDetails({ ...signupDetails, [e.target.name]: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        value={signupDetails.password}
                                        onChange={(e) => setSignupDetails({ ...signupDetails, [e.target.name]: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="number"
                                        label="Number"
                                        type="number"
                                        id="number"
                                        autoComplete="number"
                                        value={signupDetails.number}
                                        onChange={(e) => setSignupDetails({ ...signupDetails, [e.target.name]: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Role</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="user_role"
                                            defaultValue={signupDetails.user_role}
                                            onChange={(e) => setSignupDetails({ ...signupDetails, [e.target.name]: e.target.value })}

                                        >
                                            <FormControlLabel value="A" control={<Radio />} label="Architecture" />
                                            <FormControlLabel value="C" control={<Radio />} label="Client" />

                                        </RadioGroup>
                                    </FormControl>
                                </Grid>






                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                                        label="I want to receive inspiration, marketing promotions and updates via email."
                                    />
                                </Grid>








                            </Grid>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmit}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link to="/login" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    )
}
