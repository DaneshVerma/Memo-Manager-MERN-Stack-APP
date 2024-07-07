import express from "express"; //  express library to establis server
import mongoose from "mongoose"; // for Mongodb database accesseblity
import bodyParser from "body-parser"; //middleware
import { deletefn, retrivefn, addnewfn, updatefn } from "./routes/routes.js"; // functional beahaviours of routes
import cors from "cors"; // middelware
import dotenv from "dotenv";
const app = express(); // creating express app
dotenv.config()
const port = process.env.PORT || 3000;  

app.use(cors()); // middelware to accept resource request from diffrent domain. 
app.use(bodyParser.urlencoded({ extended: true })); // to retrive data from api requests
app.use(express.json()); // data formatting to json
await mongoose.connect(process.env.DB_URl); // connection to database

// declaring different routes and functions 
app.post("/new", addnewfn);
app.get("/data", retrivefn);
app.put("/update", updatefn);
app.delete("/delete", deletefn);

app.listen(port, () => {
  console.log(`server listing on : http://localhost:${port}/`);
});
