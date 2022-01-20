/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/

/* Heroku with mongoDB
  Every Heroku app has its own Heroku-hosted Git repo.
  Deploy new versions by pushing code changes to this repo.
  Local Git repo needs to know the URL of the Heroku-hosted repo.

  Heroku's architecture requires the use of config vars.
  Express calls .listen(PORT), which makes use of the Heroku config var.
  Using || to initialize PORT's value to the first defined variable.
  When app is run on Heroku, process.env.PORT is defined and passed to .listen().
  Running locally, the config var is undefined and the localhost port is passed to .listen().

  Basic Commands:
  sudo npm install -g heroku
  heroku plugins:install heroku-repo
  heroku login
  heroku git:remote -a cse341nodejsapp
  git push heroku master:main
  heroku ps:scale web=1

  heroku logs --tail
  heroku repo:reset --app appname

  https://devcenter.heroku.com/articles/preparing-a-codebase-for-heroku-deployment
  https://devcenter.heroku.com/articles/heroku-cli#download-and-install
  https://devcenter.heroku.com/articles/git#tracking-your-app-in-git
  https://devcenter.heroku.com/articles/deploying-nodejs

*/

// includes
const express         = require('express');
const session         = require('express-session');
const bodyParser      = require('body-parser');
const mongoose        = require('mongoose');
const MongoDBStore    = require('connect-mongodb-session')(session);
const path            = require('path');
const fs              = require('fs');
const cors            = require('cors');

const APP_CWD         = process.cwd();
const PORT            = process.env.PORT || 3000;
const HEROKU_APP_URL  = "https://cse341nodejsapp.herokuapp.com/";
const CORS_OPTIONS    = { origin: HEROKU_APP_URL, optionsSuccessStatus: 200 };
const FILE_PATH       = APP_CWD + '/data/mongodbstring.txt';
let   MONGODB_URI     = '';
let   sessionStore    = '';
const MONGODB_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  family: 4
};

// routes
const errorRoutes     = require(APP_CWD + '/routes/errorRoutes');
const itemRoutes      = require(APP_CWD + '/routes/itemRoutes');
const adminRoutes     = require(APP_CWD + '/routes/adminRoutes');
const userRoutes      = require(APP_CWD + '/routes/userRoutes');
const authRoutes      = require(APP_CWD + '/routes/authRoutes');

// app
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: false,
  store: sessionStore})
);

app.use(authRoutes);
app.use(adminRoutes);
app.use(itemRoutes);
app.use(userRoutes);
app.use(errorRoutes);
app.use(cors(CORS_OPTIONS));

// mongoDB connection
fs.readFile(FILE_PATH, (err, fileContent) => {
  if (err) {
    console.log(err);
  } else {
    MONGODB_URI = process.env.MONGODB_URL || fileContent.toString();
    sessionStore = new MongoDBStore({
      uri: MONGODB_URI,
      collection: 'sessions'
    });
    
    // START SERVER
    mongoose.connect(MONGODB_URI, MONGODB_OPTIONS).then(result => {
      app.listen(PORT);
    })
    .catch(err => {
      console.log(err);
    });
  }
});

