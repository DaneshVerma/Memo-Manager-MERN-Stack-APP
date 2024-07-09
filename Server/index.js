import express from "express"; //  express library to establis server
import mongoose from "mongoose"; // for Mongodb database accesseblity
import bodyParser from "body-parser"; //middleware
import { deletefn, retrivefn, addnewfn, updatefn } from "./routes/routes.js"; // functional beahaviours of routes
import cors from "cors"; // middelware
import dotenv from "dotenv";
const app = express(); // creating express app
dotenv.config();
const port = 3000;

const corsOptions = {
  origin: "https://memos-manager.onrender.com/" || "http://localhost:5173", // Allow requests from your frontend's origin
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};

app.use(cors(corsOptions)); // middelware to accept resource request from diffrent domain.
app.use(bodyParser.urlencoded({ extended: true })); // to retrive data from api requests
app.use(express.json()); // data formatting to json

try {
  await mongoose.connect(process.env.DATABASE_URL); // connection to database
  console.log("connected to data Base")
} catch (error) {
  console.error(error.message); // Prints the error message
  console.error(error.stack);
}

// declaring different routes and functions
app.get("/", (req, res) => {
  res.send("<h1>Hi i am live</h1>").status(200);
});
app.post("/new", addnewfn);
app.get("/data", retrivefn);
app.put("/update", updatefn);
app.delete("/delete", deletefn);

app.listen(port, "0.0.0.0", () => {
  console.log(`server listing on : http://localhost:${port}/`);
});
