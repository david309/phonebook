require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const Person = require('./models/person');

// Middleware
app.use(cors());
app.use(express.static('build'));
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
      res.status(404).json({ error: '404 not found' });
    });
});

// adds a person to the database
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

// DELETE requests

//// Delete a single user
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end();
    })
    .catch(error => {
      console.log(error);
      res.status(404).end();
    });
});

// PUT request

// app.put('/api/notes/:id', (request, response, next) => {
//   const body = request.body;

//   const note = {
//     content: body.content,
//     important: body.important
//   };

//   Note.findByIdAndUpdate(request.params.id, note, { new: true })
//     .then(updatedNote => {
//       response.json(updatedNote.toJSON());
//     })
//     .catch(error => next(error));
// });

app.put('/api/persons/:id', (req, res) => {
  const body = req.body;

  const person = {
    name: body.name,
    number: body.number,
    display: true
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON());
    })
    .catch(error => {
      console.log(error);
      res.status(404).end();
    });
});

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
