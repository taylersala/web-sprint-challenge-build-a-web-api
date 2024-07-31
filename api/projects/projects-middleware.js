

const Project = require('./projects-model');

async function validateProjectId(req, res, next) {
    const { id } = req.params;
    
    try {
        const project = await Project.get(id); 
        if (!project) {
            return res.status(404).json({ message: 'No such project' });
        }
        req.project = project;
        next(); 
    } catch (err) {
        next(err);
    }
}

module.exports = { validateProjectId };
