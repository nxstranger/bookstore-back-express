const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();


const corsOptions = {
    origin: `http://localhost:${process.env.FRONTEND_CORS_ALLOWED_PORT}`
};
app.use(cors(corsOptions));


const dbORM = require("../sequelize/models/index");
dbORM.sequelize.sync()
  .then(() => console.log("db sync success"))
  .catch(err => console.log(err))

app.use(bodyParser.json())

// catching err if not json data
app.use(function (error, req, res, next) {
    if (error instanceof SyntaxError) {
        res.status(400).json({message:"not json format"});
    } else {
        next();
    }
});
app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//     res.json({ message: "Test message"});
// });

require("./routers/user.router")(app);

const PORT = (process.env.NODE_ENV === "production") ? process.env.SERVER_PORT : 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
