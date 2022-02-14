import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { compare } from 'bcrypt';

import userFactory from '../models/users';

const User = userFactory();

const localPassportConfig = {
  usernameField: 'email',
  passwordField: 'password'
}

const localPassportVerify = async (email: string, password: string, done: any) => {
  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      done(null, false, { reason: '1' });
      return;
    } else {
      const comparePassword = await compare(password, user.password);

      if (comparePassword) {
        done(null, user);
        return;
      } else {
        done(null, false, { reason: '2' });
      }
    }
  } catch (e) {
    console.error(e);
    done(e);
  }
}

export const localPassportReady = () => {
  passport.use('local', new LocalStrategy(localPassportConfig, localPassportVerify));
}

