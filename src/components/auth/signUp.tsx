import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import axios from 'axios';

type dataObjectType = {
  [index: string]: string
  name: string
  company: string
  email: string
  password: string
  confirm_password: string
}

const SignUp = () => {
  const [data, setData] = useState({
    "name": "",
    "company": "",
    "email": "",
    "password": "",
    "confirm_password": ""
  });

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    axios({
      method: 'POST',
      url: process.env.REACT_APP_API_HOST + '/api/auth/signup',
      data: {
        name: data.get('name'),
        company: data.get('company'),
        email: data.get('email'),
        password: data.get('password'),
        confirm_password: data.get('confirm-password'),
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          setData(error.response.data);
        } else {
          alert('오류가 발생했습니다.');
          console.error(error);
        }
      });
  };

  const onFocusHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(event.target.name);
    let update_data = data;

    // update_data[event.target.name] = "";
    console.log(update_data[event.target.name.toString()]);

    setData(update_data);
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={onSubmitHandler} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                error={data.name !== ""}
                helperText={data.name}
                onChange={onFocusHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="company"
                label="Company"
                name="company"
                autoComplete="company"
                error={data.company !== ""}
                // helperText="회사 상호명을 정확하게 입력해주시기 바랍니다."
                helperText={data.company}
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
                error={data.email !== ""}
                // helperText="반드시 회사 이메일을 사용해주시기 바랍니다."
                helperText={data.email}
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
                autoComplete="password"
                error={data.password !== ""}
                // helperText="문자와 숫자, 특수문자를 포함한 8~20자로 입력해주시기 바랍니다."
                helperText={data.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirm-password"
                label="Confirm Password"
                type="password"
                id="confirm-password"
                autoComplete="confirm-password"
                error={data.confirm_password !== ""}
                helperText={data.confirm_password !== ""}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                to="/signin"
                component={RouterLink}
                variant="body2"
                aria-current="page"
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;