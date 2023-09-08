const express = require('express')
const app = express()
require('dotenv').config()

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });


app.use('/', (req, res) => {
    try {
        res.send('Launching index.js')
        const indexScript = require('./index.js');
        indexScript.main();     
    } catch (err) {
        console.log(err)
        res.status(500).send('Error running index.js');
    }
})


