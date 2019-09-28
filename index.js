const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// middleware
app.use(cors());
app.use(bodyParser.json());

let persons = [
  {
    name: 'Ada Lovelace',
    number: '781-293-9999',
    display: true,
    id: 1
  },
  {
    name: 'Dan Abramov',
    number: '508-223-4451',
    display: true,
    id: 2
  },
  {
    name: 'Jeff Thomas',
    number: '781-294-4412',
    display: true,
    id: 3
  },
  {
    name: 'Arthur Hitchcock',
    number: '919-454-1112',
    display: true,
    id: 4
  },
  {
    name: 'John Smith',
    number: '242-882-3952',
    display: true,
    id: 5
  },
  {
    name: 'Phillip Jensen',
    number: '542-152-3345',
    display: true,
    id: 6
  },
  {
    name: 'Dan Goldberg',
    number: '782-345-6713',
    display: true,
    id: 7
  },
  {
    name: 'Arto Hellas',
    number: '452-339-3434',
    display: true,
    id: 8
  },
  {
    name: 'Bruce Wayne',
    number: '692-555-2700',
    display: true,
    id: 9
  }
];

// GET requests
app.get('/', (req, res) => {
  res.send('<h1>Hello</h1>');
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

// DELETE requests
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(p => p.id !== id);

  res.status(204).end();
});

// POST request
const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map(p => p.id)) : 0;
  return maxId + 1;
};

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: `name or number missing`
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    display: true,
    id: generateId()
  };

  persons = persons.concat(person);

  res.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
