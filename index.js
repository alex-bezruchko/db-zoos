const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const server = express();

server.use(express.json());
server.use(helmet());

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/lambda.sqlite3',
  },
  useNullAsDefault: true, // needed for sqlite
}
const db = knex(knexConfig);

// endpoints here

server.get('/api/zoos', async (req, res) => {

  try {
    const animals = await db('zoos');

    if (animals) {
      res.status(200).json(animals);
    }
    else {
      res.status(404).json('This page is not available.')
    }
  }
  catch (e) {
    res.status(500).json(e)
  }
 
})

server.post('/api/zoos', async (req,res) => {

  const newAnimal = req.body;
  try {
    const added = await db('zoos').insert(newAnimal);
    if (added) {
        res.status(201).json('Animal was added successfully.')
    }
    else {
      res.json('Name and Description are required.')
    }
  }
  catch (e) {
    res.status(500).json(e);
  }
})

server.get('/api/zoos/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const animal = await db('zoos').where({id}).first();
    if (animal) {
      res.status(200).json(animal);
    }
    else {
      res.status(404).json('This id is not available.');
    }
  }
  catch (e) {
    res.status(500).json(e);
  }
  // cons
})

server.put('/api/zoos/:id', async (req, res) => {
  const id = req.params.id;
  const updatedAnimal = req.body;
  try {
    if (updatedAnimal.name.length > 0) {
      const updated = await db('zoos').where({id}).update(updatedAnimal);
      if (updated) {
        res.status(200).json('Animal was successfully updated.');
      }
      else {
        res.status(404).json('This id is not available.');
      }
    }
    else {
      res.json('Name is required.');
    }
  }
  catch (e) {
    res.status(500).json(e);
  }
})

server.delete('/api/zoos/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const deleted = await db('zoos').where({id}).del()

    if (deleted) {
      res.status(200).json('Animal was successfully was deleted.');
    }
    else {
      res.status(404).json('This id is not available.');
    }
  }
  catch (e) {
    res.status(500).json(e);
  }
})
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
