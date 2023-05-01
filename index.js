const express = require("express");
const { connnection } = require("./config/db");
require("dotenv").config();
const cors = require("cors");
const { userRouter } = require("./routes/userRoutes");
const { postRouter } = require("./routes/postRoutes");
const { checker } = require("./middlewares/checker");

const app = express();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome Home");
});

app.use("/users", userRouter); //get

app.use(checker); //middleware
app.use("/posts", postRouter);

app.listen(process.env.PORT_NUMBER, async () => {
  try {
    await connnection;
    console.log("connected with db");
  } catch (error) {
    console.log({ msg: error.message });
  }
  console.log(`server is running at port ${process.env.PORT_NUMBER}`);
});
