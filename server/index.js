// =============== Section 1: Importing Dependencies ===============
import express from "express"
import bodyParser from "body-parser"
import 'dotenv/config'
import mongoose from "mongoose"
import users from "./models.js"
import passport from "passport"
import session from "express-session"
import MongoStore from "connect-mongo";
import GoogleStrategy from "passport-google-oauth"
import morgan from "morgan"
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
// =============== Section 2: Initializing Express App ===============
const app = express()
const port = 3000
// =============== Section 3: Middlewares ===============

app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))

const MBSTORE = MongoStore.create({
  mongoUrl: process.env.MDB_CONNECT_STRING
});
// =============== Section 4: Session & Passport Initialization ===============
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MBSTORE,
    cookie: {
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    }
  })
);


app.use(passport.initialize());
app.use(passport.session());
passport.use(
  "google",
  new GoogleStrategy.OAuth2Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const response = await users.find({ email: profile.emails[0].value })
        if (response.length == 0) {
          const Newuser = {
            name: profile.name.givenName,
            email: profile.emails[0].value,
            picture: profile.photos[0].value,
            tasks: []
          }
          const user = await users.create(Newuser);
          return cb(null, user);
        } else if (response.length == 1) {
          return cb(null, response[0]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  )
);
passport.serializeUser((user, cb) => {
  cb(null, user.email);
});
passport.deserializeUser((userEmail, cb) => {
  async function gtu() {
    const response = await users.find({ email: userEmail }).exec();
    const user=response[0];
    cb(null, user);
  }
  gtu();
});
// =============== Section 5: Database Connection ===============
async function main() {
  try {
    await mongoose.connect(process.env.MDB_CONNECT_STRING);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
main();
// =============== Section 6: Routes ===============
app.get('/api', async (req, res) => {
  try {
    res.send("Server is running successfully");
  } catch (error) {
    res.status(500).send(error);
  }
})
app.get('/api/getdata', async (req, res) => {
  try {
    const response = await users.find({ email: req.user.email }).exec()
    res.send(response[0]);
  } catch (error) {
    res.status(500).send(error);
  }
})
app.get('/api/getitems', async (req, res) => {
  try {
    const response = await users.find({ email: req.user.email }).exec()
    res.send(response[0].tasks);
  } catch (error) {
    res.status(500).send(error);
  }
})
app.post('/api/updatedata', async (req, res) => {
  try {
    console.log(req.body.data)
    if (req.body.data == 'clear') {
      const arr = []
      const response = await users.updateOne({ email: req.user.email }, { tasks: arr })
      res.send(response.acknowledged)
    } else if (req.body.data.length > 0) {
      const arr = req.body.data
      const response = await users.updateOne({ email: req.user.email }, { tasks: arr })
      res.send(response.acknowledged)
    }
  } catch (error) {
    res.status(500).send(error);
  }
})
app.post('/api/additem', async (req, res) => {
  try {
    const response = await users.updateOne({ email: req.user.email }, { $push: { tasks: req.body.data } })
    res.send(response.acknowledged)
  } catch (error) {
    res.status(500).send(error);
  }
})
app.delete('/api/deleteitem/:id', async (req, res) => {
  try {
    const response = await users.updateOne({ email: req.user.email }, { $pull: { tasks: { _id: req.params.id } } })
    res.send(response.acknowledged)
  } catch (error) {
    res.status(500).send(error);
  }
})
app.put('/api/updateitem/:id', async (req, res) => {
  try {
    const user = await users.findOne({ email: req.user.email });
    const task = user.tasks.find(task => task._id.equals(req.params.id));
    if (task) {
      const doneValue = !task.done;
      const response = await users.updateOne({ email: req.user.email, 'tasks._id': req.params.id }, { $set: { 'tasks.$.done': doneValue } });
      res.send(response.acknowledged);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
})
app.get(
  "/api/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
app.get(
  "/api/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: '/error'
  }), function (req, res) {
    res.redirect("/");
  }
);
app.get("/api/auth/logout", (req, res) => {
  try {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get("/api/auth/check", (req, res) => {
  try {
    res.send({ isLogged: !!req.user });
  } catch (error) {
    res.status(500).send(error);
  }
}
);

// =============== Section 7: Loading Static Files ===============

// Get the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the "client/dist" directory
const staticPath = join(__dirname, './client/dist');
app.use(express.static(staticPath));

// Serve the index.html file for all other routes
app.get('*', function (_, res) {
  const indexPath = join(__dirname, './client/dist/index.html');
  res.sendFile(indexPath, function (err) {
    if (err) {
      console.error('Error serving index.html:', err);
      res.status(500).send(err);
    }
  });
});

// =============== Section 8: Starting the Server ===============
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})