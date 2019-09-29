require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const Person = require('./models/person');

app.use(cors());
// app.use(express.static('build'));

// Persons

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
  Person.find({})
    .then(persons => {
      res.send(`Phonebook has info on ${persons.length} people`);
    })
    .catch(error => {
      console.log(error);
      res.status(404).end();
    });
});

//// Returns info on all persons
app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()));
  });
});

////// Returns info on a single person
app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id)
    .then(person => {
      res.json(person.toJSON());
    })
    .catch(error => {
      console.log(error);
      res.status(404).end();
    });
});

// POST requests
//// Generate an ID
// const generateId = () => {
//   const maxId = persons.length > 0 ? Math.max(...persons.map(p => p.id)) : 0;
//   return maxId + 1;
// };

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number missing' });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    display: true,
    date: new Date()
  });

  person.save().then(savedPerson => {
    res.json(savedPerson.toJSON());
  });
});

// //// Adds a single person
// app.post('/api/persons', (req, res) => {
//   const body = req.body;

//   // if name or number is missing, return an error
//   if (!body.name || !body.number) {
//     return res.status(400).json({
//       error: 'name and number must exist'
//     });
//   }

//   // if name already exists, return an error
//   const nameExists = persons.find(p => p.name === body.name);
//   if (nameExists) {
//     return res.status(400).json({
//       error: 'name must be unique'
//     });
//   }

//   // create a new person object with info from request
//   const person = {
//     name: body.name,
//     number: body.number,
//     display: true,
//     date: new Date(),
//     id: generateId()
//   };

//   // update the persons array and return the added user
//   persons = persons.concat(person);
//   res.json(person);
// });

// DELETE requests

//// Delete a single user
// app.delete('/api/persons/:id', (req, res) => {
//   const id = Number(req.params.id);
//   persons = persons.filter(p => p.id !== id);
//   res.status(204).end();
// });

// Dealing with unknown endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
