const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const { ObjectId } = require('bson');

mongoose.connect('mongodb+srv://sai:123@node7expresscluster24.boivo8f.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    dbName: "todoList"
}).then(() => console.log('connected!')).catch((err) => console.log('Error: ', err))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const todoSchema = {
    status: String,
    task: String
}

const Task = mongoose.model("todotasks", todoSchema);

//Create
app.post('/createTask', async (request, response) => {
    if(request.body.status === "" || request.body.task === "") {
        const result = {
            status: "Failed",
            statusCode: 101,
            msg: "Required Validation Failed",
            errorMsg: "Status & Task should not be empty!"
        }

        response.send(result)
    
    } else {
        const task = new Task({
            status: request.body.status,
            task: request.body.task
        })
    
        task.save().then((err) => {
            const result = {
                status: "Success",
                statusCode: 100,
                msg: "Document Inserted!"
            }
    
            response.send(result)
        })
    }
})

//Read
app.get('/tasks', async (request, response) => {
    const data = await Task.find({});
    console.log(data)
    response.send(data)
})

//Update
app.patch('/updateTask', async (request, response) => {
    const { id, status } = request.body;

    try {
        const task = await Task.findOne({_id: new ObjectId(id)});

        if(task) {
          
            if(status) task.status = status;
            
            await task.save().then((err) => {
                const result = {
                    status: "Success",
                    statusCode: 102,
                    msg: "Document Updated!"
                }
        
                response.status(200).json(result)
            })

            
        } else {
            response.status(404).json({
                message: "Task not found"
            })
        }
    } catch(error) {
        console.log(error);
    }
})

//Delete
app.delete('/deleteTask', async (request, response) => {
    const { id } = request.body;

    try {
        const task = await Task.findByIdAndDelete(new ObjectId(id))

        response.status(200).json({message: "Task deleted successfully!"})
    } catch(error) {
        console.log(error);
    }
})

app.listen(9999, () => console.log("Server Started!"))