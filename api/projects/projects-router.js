// Write your "projects" router here!
const Project = require('./projects-model')
const Actions = require('../projects/projects-model')

const express = require('express');
const router = express.Router();

const { validateProjectId, validateProjectBody } = require('./projects-middleware');

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

router.post('/', validateProjectBody, (req, res, next) => {
    Project.insert(req.body)
    .then(newProject => {
        res.status(201).json(newProject)
    })
    .catch(next)
});

router.put('/:id', validateProjectId, validateProjectBody, (req, res, next) => {
    Project.update(req.params.id, req.body)
    .then(updatedUser => {
        res.json(updatedUser)
    })
    .catch(next)
});

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        const result = await Project.remove(req.params.id)
        res.json(result)
    }catch (err){
        next(err)
    }
    
});

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const result = await Project.getProjectActions(req.params.id)
        res.json(result)
    } catch (err) {
        next(err)
    }
});

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customMessage: 'something tragic inside projects router',
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router