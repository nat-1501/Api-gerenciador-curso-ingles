const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

// Middleware

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;

  const user = users.find((user) => user.username === username);

        if (!user) {
        return response.status(400).json({ error: "usuario não encontrado"});
      }
        request.user = user;
        return next ();

}

app.post('/users', (request, response) => {
      const { name, username } = request.body;

      const usersAlreadyExists = users.some(
        (user) => user.username === username
      );

      if (usersAlreadyExists) {
        return response.status(400).json({ error: "Usuario já existe!"})
      } 

      const user = { 
        name, 
        username, 
        id: uuidv4(), // precisa ser um uuid
        todos: []
      }
      users.push(user);

      return response.status(201).json(user);
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;