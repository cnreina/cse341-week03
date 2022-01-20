/*	INCLUDES */
const APP_CWD           = process.cwd();
const User              = require(APP_CWD + '/models/userSchema');

exports.getLogin = (req, res, next) => {
  res.render('authViews/loginView', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  const userUUID = req.params.useruuid;
  User.findOne({uuid: userUUID}).then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save(err => {
        console.log(err);
        res.redirect('/');
      });
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
