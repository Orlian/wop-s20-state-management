'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const users = [
  {
    user_id: 1,
    name: 'Foo Bar',
    email: 'foo@bar.fi',
    password: 'foobar',
  },
  {
    user_id: 2,
    name: 'Bar Foo',
    email: 'bar@foo.fi',
    password: 'barfoo',
  },
];

const getUser = (id) => {
  const user = users.filter((usr) => {
    if (usr.user_id === id) {
      return usr;
    }
  });
  return user[0];
};

const getUserLogin = (email) => {
  const user = users.filter((usr) => {
    if (usr.email === email) {
      return usr;
    }
  });
  return user[0];
};

//Serialize: store user id in session
passport.serializeUser((user, done) => {
  console.log('serialize', user.user_id);
  done(null, user.user_id);
});

//deserialize: get user id from session and get all user data too
passport.deserializeUser(async (id, done) => {
  const user = await getUser(id);
  console.log('deserialize', user);
  done(null, user);
});

passport.use(new LocalStrategy((username, password, done) => {
      const user = getUserLogin(username);
      if (user === undefined || user.password !== password) {
        return done(null, false, {message: 'Incorrect password or username'});
      } else {
        return done(null, user);
      }
    },
));

module.exports = passport;