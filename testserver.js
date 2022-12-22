const express = require('express');
const app = express();

const port = 3000;

const {merkleTreeProofGenerator} = require('./index')

app.get('/', merkleTreeProofGenerator);

app.listen(port, () => {
   console.log(`Server is up at ${port}`);
});