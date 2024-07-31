// Write your "actions" router here!
const express = require('express');
const Action = require('./actions-model');
const { validateActionId, validateActionsBody } = require('./actions-middlware');

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


 // problem is here
 router.post('/', validateActionsBody, (req, res, next) => {
    Action.insert(req.body)
      .then(newAction => {
        res.status(201).json(newAction);
      })
      .catch(next);
  });

router.put('/:id', validateActionsBody, (req, res, next) => {
    Action.update(req.params.id, req.body)
    .then(updatedUser => {
        res.json(updatedUser)
    })
    .catch(next)
});

router.delete('/:id', validateActionId, async (req, res, next) => {
    try {
        const result = await Action.remove(req.params.id)
        res.json(result)
    }catch (err){
        next(err)
    }
});


module.exports = router;