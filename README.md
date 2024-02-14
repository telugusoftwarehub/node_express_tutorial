# Connect MongoDB with Mongoose in ExpressJS
## Installation

Install express with npm

```bash
  npm install express
  npm install mongoose
```

# Code Example
import the express library into your application, making its functionality available.

import the Mongoose library into your application, making its functionality available.

```bash
const express = require('express');
const mongoose = require('mongoose');
const app = express();
```

## mongoose connect

The mongoose.connect() method is a function provided by the Mongoose library in Node.js, and it's used to establish a connection to a MongoDB database.

### Syntax:  mongoose.connect('your-mongodb-uri', options)

```bash
  mongoose.connect('<mongodb-uri>', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: '<database name>'
  }).then(() => console.log('Connected!'));
```

### Create a Collection Schema

```bash
  const userSchema = new mongoose.Schema({
      name: String, 
      email: String
  });
```

### Create a model for your schema

```bash
  const Task = mongoose.model("user", userSchema);
```

### Create a GET API using express 

```bash
  app.get('/users', async (request, response) => {
    const users = await Task.find({})
    response.send(users)
});

```

### Write Listiner
```bash
  app.listen(9090, () => {
    console.log("Port started")
  })
```