import userFactory from '../models/users';

const migrate = async () => {
  await userFactory().sync()
    .then(() => {
      console.log('Migrate Users Table Successful!');
    })
    .catch((error) => {
      console.error('Migrate Users Table Failed!', error);
    })
}

export default migrate();