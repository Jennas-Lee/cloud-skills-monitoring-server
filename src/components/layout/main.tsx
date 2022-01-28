import React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';

import axios from 'axios';

const Main = () => {
  return (
    <Container maxWidth="md">
      <CssBaseline/>
      <Box
        sx={{
          p: 5
        }}
      >
        <Typography
          variant="h3"
          component="div"
          sx={{ textAlign: "center" }}>
          2022년 지방기능경기대회
        </Typography>
        <Typography
          mt={2}
          variant="h5"
          component="p"
          sx={{ textAlign: "center" }}>
          2022-04-05 ~ 2022-04-08
        </Typography>
        <button onClick={() => {
          axios({
            method: 'POST',
            url: process.env.REACT_APP_API_HOST + '/api/auth/refresh',
          })
            .then((response) => {
              // console.log(axios.defaults.withCredentials);
            })
            .catch((error) => {
              if (error.response.status === 400) {
                console.log(400);
              } else {
                alert('오류가 발생했습니다.');
                console.error(error);
              }
            });
        }}>테스트</button>
      </Box>
    </Container>
  );
}

export default Main;
