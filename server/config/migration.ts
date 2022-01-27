import tokenFactory from '../models/tokens';
import userFactory from '../models/users';

const migrate = async () => {
  await tokenFactory().sync()
    .then(() => {
      console.log('Migrate Tokens Table Successful!');
    })
    .catch((error) => {
      console.error('Migrate Tokens Table Failed!', error);
    })

  await userFactory().sync()
    .then(() => {
      console.log('Migrate Users Table Successful!');
    })
    .catch((error) => {
      console.error('Migrate Users Table Failed!', error);
    })
}

export default migrate();