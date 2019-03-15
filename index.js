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
  useNullAsDefault: true // needed for sqlite
}

const db = knex(knexConfig);

// endpoints here

server.post('/api/zoos', async (req,res) => {

  const newAnimal = req.body;
  try {
    const added = await db.insert(newAnimal);
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

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
