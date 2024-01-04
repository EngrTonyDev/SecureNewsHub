const express = require('express');
const app = express();
//configura las variables de entorno
require('dotenv').config();
// database connection
const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
const db = mongoose.connect(process.env.DB_ACCESS);


const {
  registerPost,
  // loginPost,
  confirmAccountGet,
  login2FAPost,
  verifyPhoneCode,
} = require("./controllers/authController");

const {
  userPatch,
  userPost,
  userGet,
  userDelete,
  userSession,
} = require("./controllers/userController.js");

const {
  rolPatch,
  rolPost,
  rolGet,
  rolDelete
} = require("./controllers/rolController.js");

const {
  categoryPatch,
  categoryPost,
  categoryGet,
  categoryDelete
} = require("./controllers/categoryController");


const {
  sourcePatch,
  sourcePost,
  sourceGet,
  sourceDelete
} = require("./controllers/sourcesController");

const {
  noticePatch,
  noticePost,
  noticeGet,
  noticeDelete
} = require("./controllers/newController");

const {
  tagsGet
} = require("./controllers/tagController");

// parser for the request body (required for the POST and PUT methods)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// check for cors
const cors = require("cors");
app.use(cors({
  domains: '*',
  methods: "*"
}));

app.post("/api/auth/register", registerPost);
app.get("/api/auth/confirm/:confirmationCode", confirmAccountGet);
// app.post("/api/auth/login", loginPost);
app.post("/api/auth/login2FA", login2FAPost);
app.post("/api/auth/verifyPhoneCode", verifyPhoneCode);

app.get("/api/users", userGet);
app.post("/api/users", userPost);
app.post("/api/users/login", userSession);
app.patch("/api/users", userPatch);
app.put("/api/users", userPatch);
app.delete("/api/users", userDelete);

app.get("/api/roles", rolGet);
app.post("/api/roles", rolPost);
app.patch("/api/roles", rolPatch);
app.put("/api/roles", rolPatch);
app.delete("/api/roles", rolDelete);

app.get("/api/categories", categoryGet);
app.post("/api/categories", categoryPost);
app.patch("/api/categories", categoryPatch);
app.put("/api/categories", categoryPatch);
app.delete("/api/categories", categoryDelete);

app.get("/api/tags", tagsGet);

app.get("/api/sources", sourceGet);
app.post("/api/sources", sourcePost);
app.patch("/api/sources", sourcePatch);
app.put("/api/sources", sourcePatch);
app.delete("/api/sources", sourceDelete);

app.get("/api/notices", noticeGet);
app.post("/api/notices", noticePost);
app.patch("/api/notices", noticePatch);
app.put("/api/notices", noticePatch);
app.delete("/api/notices", noticeDelete);


app.listen(4000, () => console.log(`Example app listening on port 4000!`))
