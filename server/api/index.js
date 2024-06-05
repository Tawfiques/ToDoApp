// =============== Section 1: Importing Dependencies ===============
import express from "express"
import bodyParser from "body-parser"
import 'dotenv/config'
import mongoose from "mongoose"
import cors from "cors"
import users from "../models.js"
import passport from "passport"
import session from "express-session"
import GoogleStrategy from "passport-google-oauth"
import morgan from "morgan"



// =============== Section 2: Initializing Express App ===============
const app = express()
const port = 3000


// =============== Section 3: Middlewares ===============
app.use(cors({
  origin: process.env.BASE_URL,
  credentials: true, // Allow credentials
  optionsSuccessStatus: 200
}));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
function authMiddleware(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized User' });
  }
}


// =============== Section 4: Session & Passport Initialization ===============
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
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
      callbackURL: `${process.env.CALLBACK_URL}/auth/google/Todoapp`,
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

app.get('/', async (req, res) => {
  try {
    const result=await users.find({name:"Tawfique"}).exec()
    res.send(result)
  } catch (error) {
    res.status(500).send(error);
  }
})

app.get('/getdata', authMiddleware, async (req, res) => {
  try {
    const response = await users.find({ email: req.user.email }).exec()
    res.send(response[0]);
  } catch (error) {
    res.status(500).send(error);
  }
})

app.get('/getitems', authMiddleware, async (req, res) => {
  try {
    const response = await users.find({ email: req.user.email }).exec()
    res.send(response[0].tasks);
  } catch (error) {
    res.status(500).send(error);
  }
})

app.post('/updatedata', authMiddleware, async (req, res) => {
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

app.post('/additem', authMiddleware, async (req, res) => {
  try {
    const response = await users.updateOne({ email: req.user.email }, { $push: { tasks: req.body.data } })
    res.send(response.acknowledged)
  } catch (error) {
    res.status(500).send(error);
  }
})

app.delete('/deleteitem/:id', authMiddleware, async (req, res) => {
  try {
    const response = await users.updateOne({ email: req.user.email }, { $pull: { tasks: { _id: req.params.id } } })
    res.send(response.acknowledged)
  } catch (error) {
    res.status(500).send(error);
  }
})

app.put('/updateitem/:id', authMiddleware, async (req, res) => {
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
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/Todoapp",
  passport.authenticate("google", {
    failureRedirect: process.env.CALLBACK_URL
  })
  ,
  function (req, res) {
    req.session.user = req.user;
    res.redirect(process.env.BASE_URL);
  }
);

app.get("/auth/logout", (req, res) => {
  try {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect(process.env.BASE_URL);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/auth/check", (req, res) => {
  try {
    res.send({ isLogged: !!req.user });
  } catch (error) {
    res.status(500).send(error);
  }
}
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

// =============== Section 7: Starting the Server ===============
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
