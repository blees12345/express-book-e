//=============================================================================
// Basic Config
//=============================================================================
const express = require('express');
// instantiate express
const app = express();
// in deployment, port will be set for us with process.env.PORT
// in development, app will run on localhost:8000
app.set('port', process.env.PORT || 8000);

//=============================================================================
// Middleware
//=============================================================================
// Middleware -- functions that run before processing a request and sending a response
// `express.json` parses application/json request data and
//  adds it to the request object as request.body
app.use(express.json());
// `express.urlencoded` parses x-ww-form-urlencoded request data and
//  adds it to the request object as request.body
app.use(express.urlencoded({ extended: true }));

//=============================================================================
// ROUTES
//=============================================================================
app.get('/', (req, res) => {
	res.redirect('/api/bookmarks');
});
// app.get('/', (req, res) => {
// 	res.json({greeting:'hello world'});
// });
/* START CONTROLLERS HERE */
const bookmarksController = require('./controllers/bookmarksController');
app.use('/api/bookmarks', bookmarksController)
/* END CONTROLLERS HERE */

//=============================================================================
// START SERVER
//=============================================================================
app.listen(app.get('port'), () => {
	console.log(`✅ PORT: ${app.get('port')} 🌟`);
});
