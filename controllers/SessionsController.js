const User = require('../models/user');
const passport = require('passport');
const viewPath = 'sessions';
exports.new = (req, res) => {
  res.render(`${viewPath}/new`, {
    pageTitle: 'Login'
  });
};

exports.create = (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        console.log("you failed here");
        if (err || !user) return res.status(401).json({
            status: 'failed',
            message: 'Not authorized',
            error: err
    });

    req.login(user, err => {
      if (err) return res.status(401).json({
        status: 'failed',
        message: 'Not authorized',
        error: err
      });

      return res.status(200).json({
        status: 'success',
        message: 'Logged in successfully',
        user: {
          _id: user.id,
          fullName: user.fullname,
          email: user.email
        }
      })
    })
  })(req, res, next);
};

exports.delete = (req, res) => {
  req.logout();
  req.flash('success', 'You were logged out successfully.');
  res.redirect('/');
};