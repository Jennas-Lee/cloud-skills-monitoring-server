import axios from 'axios';

export const refresh = () => {
  axios({
    method: 'POST',
    url: process.env.REACT_APP_API_HOST + '/api/auth/refresh',
  })
    .then((response) => {

    })
    .catch((error) => {
      if (error.response.status === 400) {
        console.log('loggedin failed 400');
      } else {
        alert('오류가 발생했습니다.');
        console.error(error);
      }
    })
    .finally(() => {
      console.log('loggedin failed 400');
    });
}