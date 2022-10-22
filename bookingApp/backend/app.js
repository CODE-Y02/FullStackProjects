const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./util/db");
const User = require("./models/user");

const app = express();
app.use(cors());

app.use(bodyParser.json()); // parse json

// user  --> get all users appointment
app.get("/user", (req, res) => {
  User.findAll()
    .then((users) => {
      //   console.log(users);
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

// user/:id  --> get user by id
app.get("/user/:id", (req, res) => {
  const id = req.params.id;
  User.findByPk(id)
    .then((user) => {
      //   console.log(user);
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

// user===>>>> add-user
app.post("/user", (req, res) => {
  //   console.log(req.body);
  User.create(req.body).then((newUser) => {
    // console.log(newUser);
    res.status(201).json(newUser);
  });
});

// user/id ===>>>> update user
app.put("/user/:id", (req, res) => {
  //   console.log(req.body);
  const id = req.params.id;
  User.findByPk(id)
    .then((user) => {
      //   console.log(user);

      user.name = req.body.name;
      user.email = req.body.email;
      user.phone = req.body.phone;

      return user.save();
    })
    .then((user) => {
      res.json(user).end();
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

// user/id ====> delete user
app.delete("/user/:id", (req, res) => {
  //   console.log(req.body);
  const id = req.params.id;
  User.findByPk(id)
    .then((user) => {
      //   console.log(user);

      return user.destroy();
    })
    .then(() => {
      res.status(200).end();
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

db.sync();

app.listen(3000);
