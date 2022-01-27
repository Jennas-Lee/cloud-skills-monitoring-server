import CssBaseline from '@mui/material/CssBaseline';
import axios from 'axios';
import React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

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
          console.log(axios.defaults.headers.common['Authorization']);
        }}>테스트</button>
      </Box>
    </Container>
  );
}

export default Main;
