//contains all the route handlings
const express = require('express');
const router = express.Router();
const { selectall, selectparams, insertparams, signin, signup } = require('./queries.js');

router.post('/api/signup', (req, res) => { signup(req, res); });

router.post('/api/signin', (req, res) => { signin(req, res); });

router.get('/api/notes/selectallnotes', (req, res) => { selectall(req, res); });

router.get('api/notes/selectnotes/:name?/:date?', (req, res) => { selectparams(req, res); });

router.get('/api/notes/insertnote/:note&:name&:date', (req, res) => { insertparams(req, res); });

module.exports = router;