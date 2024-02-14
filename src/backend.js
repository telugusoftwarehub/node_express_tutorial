const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('<mongodb-uri>', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "todoList"
}).then(() => console.log('Connected!'));

const useSchema = new mongoose.Schema({
    name: String,
    email: String
});

const Users = mongoose.model("user", taskSchema);

app.get('/allTasks', async (request, response) => {
    const data = await Users.find({})
    response.send(data);
});

app.listen(9090, () => {
    console.log("Port started")
})