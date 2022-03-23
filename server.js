const express = require('express');
const { hostname } = require('os');
// allows us to use 3001 on localhost and 80 on Heroku
const PORT = process.env.PORT || 3001
const app = express()
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// allows us to load files referenced in html 
app.use(express.static('public'));

// parse incoming JSON data
app.use(express.json());

// use the router files 
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// starts the server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`)
    console.log(`Server hostname: http://${hostname()}:${PORT}`)
})