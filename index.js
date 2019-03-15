const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());

const db = [];

// endpoints here

server.post('/api/zoos', async (req,res) => {

  const newAnimal = req.body;
  try {
    const added = db.insert(newAnimal);
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
