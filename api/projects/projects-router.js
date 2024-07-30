// Write your "projects" router here!
const Project = require('./projects-model')
const Actions = require('../projects/projects-model')

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    Project.get() 
        .then(projects => {
            res.json(projects);
        })
        .catch(next);
});

router.get('/:id', (req, res, next) => {

});

router.post('/', (req, res, next) => {

});

router.put('/:id', (req, res, next) => {

});

router.delete('/:id', (req, res, next) => {

});

router.get('/:id/actions', (req, res, next) => {

});

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customMessage: 'something tragic inside projects router',
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router