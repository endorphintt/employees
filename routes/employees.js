const express = require('express');
const { add, all, remove, employee, edit } = require('../controllers/employees.js');
const router = express.Router();
const { auth } = require('../middleware/auth.js');

router.get('/', auth, all)

router.get('/:id', auth, employee)

router.post('/add', auth, add)

router.post('/remove/:id', auth, remove)

router.put('/edit/:id', auth, edit)

module.exports = router