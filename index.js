const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(cors());

// Persons
let persons = [
  {
    name: 'Ada Lovelace',
    number: '781-293-9999',
    display: true,
    date: '2019-09-26T03:01:23.557Z',
    id: 1
  },
  {
    name: 'Dan Abramov',
    number: '508-223-4451',
    display: true,
    date: '2019-09-26T03:01:23.557Z',
    id: 2
  },
  {
    name: 'Jeff Thomas',
    number: '781-294-4412',
    display: true,
    date: '2019-09-26T03:01:23.557Z',
    id: 3
  },
  {
    name: 'Arthur Hitchcock',
    number: '919-454-1112',
    display: true,
    date: '2019-09-26T03:01:23.557Z',
    id: 4
  },
  {
    name: 'John Smith',
    number: '242-882-3952',
    display: true,
    date: '2019-09-26T03:01:23.557Z',
    id: 5
  },
  {
    name: 'Phillip Jensen',
    number: '542-152-3345',
    display: true,
    date: '2019-09-26T03:01:23.557Z',
    id: 6
  },
  {
    name: 'Dan Goldberg',
    number: '782-345-6713',
    display: true,
    date: '2019-09-26T03:01:23.557Z',
    id: 7
  },
  {
    name: 'Arto Hellas',
    number: '452-339-3434',
    display: true,
    date: '2019-09-26T03:01:23.557Z',
    id: 8
  },
  {
    name: 'Bruce Wayne',
    number: '692-555-2700',
    display: true,
    date: '2019-09-26T03:01:23.557Z',
    id: 9
  },
  {
    name: 'Jeff Jefferson',
    number: '690-233-3333',
    display: true,
    date: '2019-09-26T03:01:23.557Z',
    id: 10
  }
];

// Middleware
app.use(bodyParser.json());

// create a new morgan token
morgan.token('got', function(req, res) {
  return `{"name":"${req.body.name}", "number":"${req.body.number}"}`;
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :got'));

// GET requests

//// Home page
app.get('/', (req, res) => {
  res.send('<h1>home page!</h1>');
});

//// Information page
app.get('/info', (req, res) => {
  res.send(`Phonebook has info for ${persons.length} people <br><br> ${new Date()}`);
});

//// Returns info on all persons
app.get('/api/persons', (req, res) => {
  res.json(persons);
});

////// Returns info on a single person
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

// POST requests
//// Generate an ID
const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map(p => p.id)) : 0;
  return maxId + 1;
};

//// Adds a single person
app.post('/api/persons', (req, res) => {
  const body = req.body;

  // if name or number is missing, return an error
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name and number must exist'
    });
  }

  // if name already exists, return an error
  const nameExists = persons.find(p => p.name === body.name);
  if (nameExists) {
    return res.status(400).json({
      error: 'name must be unique'
    });
  }

  // create a new person object with info from request
  const person = {
    name: body.name,
    number: body.number,
    display: true,
    date: new Date(),
    id: generateId()
  };

  // update the persons array and return the added user
  persons = persons.concat(person);
  res.json(person);
});

// DELETE requests

//// Delete a single user
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(p => p.id !== id);
  res.status(204).end();
});

// Dealing with unknown endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
