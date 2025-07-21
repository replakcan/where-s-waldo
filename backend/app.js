require("dotenv").config();
const express = require("express");
const cors = require("cors");
const indexRouter = require("./routes/indexRouter");
const usersRouter = require("./routes/usersRouter");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/targets", indexRouter);
app.use("/api/users", usersRouter);

app.use((err, req, res, next) => {
  console.log(err);

  res.status(err.statusCode || 500).send(err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`express is running on port ${PORT}`));
