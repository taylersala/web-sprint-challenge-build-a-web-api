

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

function validateProjectBody(req, res, next) {
    const { name, description, completed } = req.body;
    if (!name || !description || completed === undefined) {
      return res.status(400).json({ message: 'Name, description, and completed status are required' });
    }
    next();
  }

module.exports = { validateProjectId, validateProjectBody };
