import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import axios from 'axios';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

type dataObjectType = {
  [index: string]: string;
  email: string;
  password: string;
}

const defaultData: dataObjectType = {
  "email": "",
  "password": ""
}

const SignIn = () => {
  const [data, setData] = useState<dataObjectType>(defaultData);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!loading) {
      setLoading(true);

      axios({
        method: 'POST',
        url: process.env.REACT_APP_API_HOST + '/api/auth/signin',
        data: {
          email: data.get('email'),
          password: data.get('password'),
        },
      })
        .then((response) => {
          console.log(response.headers.authorization);
          axios.defaults.headers.common['Authorization'] = response.headers.authorization;
          navigate('/');
        })
        .catch((error) => {
          if (error.response.status === 400) {
            setData(error.response.data);
          } else {
            alert('오류가 발생했습니다.');
            console.error(error);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const onFocusHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    let update_data = data;

    update_data[event.target.name] = defaultData[event.target.name];
    setData({ ...update_data });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            error={data.email !== defaultData.email}
            helperText={data.email}
            onChange={onFocusHandler}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={data.password !== defaultData.password}
            helperText={data.password}
            onChange={onFocusHandler}
          />
          <Box sx={{ position: 'relative' }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              SIGN UP
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  color: green[500],
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-8px',
                  marginLeft: '-12px',
                }}
              />
            )}
          </Box>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                to="/signup"
                component={RouterLink}
                variant="body2"
                aria-current="page"
              >
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;
