// Write your "projects" router here!
const Project = require('./projects-model')
const Actions = require('../projects/projects-model')

const express = require('express');
const router = express.Router();

const { validateProjectId } = require('./projects-middleware');

router.get('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            res.json(projects);
        })
        .catch(next);
});

router.get('/:id', validateProjectId, (req, res, next) => {
    res.json(req.project)
});

router.post('/', validateProjectId, (req, res, next) => {
    Project.insert( { name: req.name })
    .then(newProject => {
        res.status(201).json(newProject)
    })
    .catch(next)
});

router.put('/:id', validateProjectId, (req, res, next) => {
    next()
});

router.delete('/:id', validateProjectId, (req, res, next) => {
    next()
});

router.get('/:id/actions', validateProjectId, (req, res, next) => {
    next()
});

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customMessage: 'something tragic inside projects router',
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router