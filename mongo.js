const mongoose = require('mongoose');
require('dotenv').config();

const personName = process.argv[2];
const personNumber = process.argv[3];
const url = process.env.MONGODB_URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  display: Boolean,
  date: Date
});

const Person = mongoose.model('Person', personSchema);

const person = new Person({
  name: personName,
  number: personNumber,
  display: true,
  date: new Date()
});

if (process.argv.length < 3) {
  Person.find({}).then(res => {
    console.log('Phonebook:');
    res.forEach(p => {
      console.log(`Name: [${p.name}] Number: [${p.number}]`);
    });
    mongoose.connection.close();
  });
} else {
  person.save().then(res => {
    console.log(`saved ${res.name} to phonebook with number ${res.number}`);
    mongoose.connection.close();
  });
}
