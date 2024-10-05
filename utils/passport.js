const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const objAccount = require('../models/customer/customer.service');
const objUser = require('../models/admin/user/user.service');
const jwtCustomerOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('customer'),
  secretOrKey : process.env.CUSTOMER_KEY,
};

const jwtCustomerLogin = new JwtStrategy(jwtCustomerOptions, function(payload, done) {
  objAccount.getCustomerById(payload.sub.customer_id, function(err, customer) {
    if(err) { return done(err, false); }
    if(customer) {
      done(null, customer);
    } else {
      done(null, false);
    }
  });
});

passport.use("jwt-customer", jwtCustomerLogin);

const jwtUserOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('user'),
  secretOrKey : process.env.USER_KEY
};

const jwtUserLogin = new JwtStrategy(jwtUserOptions, function(payload, done) {
  console.log("------user passport ")

  objUser.getUserById(payload.user_id, function(err, user) {
    if(err) { return done(err, false); }

    if(user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use('jwt-user', jwtUserLogin);
