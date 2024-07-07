import task from "../models/task.js"; // database schema
// deleting note requested from client side
async function deletefn(req, res) {
  // parsing id from request
  await task.deleteOne({ id: req.body.id }); // selecting note data by id
  var notes = await task.find({}); 
  res.json(notes);  // sending back updated data as response
}

// adding new note entry
async function addnewfn(req, res) {
  // parsing data from request
  const todo = new task({
    id: req.body.noteid,
    title: req.body.title,
    note: req.body.note,
  });
  todo.save();
  res.json(todo); // sending back updated data as response
}
// updating existing note data
async function updatefn(req, res){
  // parsing the data from request for selection and updatation
  const {title, content, id} = req.body
  await task.updateOne({id: id},{$set:{title: title, note: content}}) // selecting the note from id and updating the data
  var notes = await task.find({});
  res.json(notes); // sending back updated data as response
}

// sending the existing note data
async function retrivefn(req, res) {
  var notes = await task.find({}); 
  res.json(notes);
}

export { deletefn, retrivefn, addnewfn, updatefn};
