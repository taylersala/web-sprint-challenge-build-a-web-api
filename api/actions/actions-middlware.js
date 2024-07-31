// add middlewares here related to actions
const Action = require('./actions-model');

async function validateActionId(req, res, next) {
    const { id } = req.params;

    try {
        const action = await Action.get(id); 
        if (!action) {
            return res.status(404).json({ message: 'No such action' });
        }
        req.action = action;
        next(); 
    } catch (err) {
        next(err);
    }
}

function validateActionsBody(req, res, next) {
    const { name, description, completed } = req.body;
    if (!name || !description || completed === undefined) {
      return res.status(400).json({ message: 'Name, description, and completed status are required' });
    }
    next();
  }

module.exports = {
    validateActionId,
    validateActionsBody,
}