import mongoose from "mongoose"; 
// declaring the schema for mongoDB to store note data
const TaskSchema = new mongoose.Schema({
  id: String,
  title: String,
  note: String,
});

const task = mongoose.model("task", TaskSchema); 

export default task;
