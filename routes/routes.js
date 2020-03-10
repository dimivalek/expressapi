//contains all the route handlings
const express = require('express');
const router = express.Router();
const { selectall, selectparams, insertparams }  = require('./queries.js');

router.get('/api/notes/selectallnotes', (req, res) => { selectall(req, res); });

router.get('api/notes/selectnotes/:name?/:date?', (req, res) => { selectparams(req, res); });

router.get('/api/notes/insertnote/:note&:name&:date', (req, res) => { insertparams(req, res); });

module.exports = router;