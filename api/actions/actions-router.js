// Write your "actions" router here!
const express = require('express');
const Action = require('./actions-model');
const { validateActionId } = require('./actions-middlware');

const router = express.Router();

router.get('/', (req, res, next) => {
    Action.get()
        .then(actions => {
            res.json(actions);
        })
        .catch(next)
});

router.get('/:id', validateActionId, (req, res, next) => {
    res.json(req.action)
});

router.post('/', (req, res, next) => {

});

router.put('/:id', (req, res, next) => {

});

router.delete('/:id', (req, res, next) => {

});


module.exports = router;