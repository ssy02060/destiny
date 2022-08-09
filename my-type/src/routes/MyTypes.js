const router = require('express').Router();
const MyType = require('../models/MyType.js');

// Find All
router.get('/mytype', (req, res) => {
  MyType.findAll()
    .then((mytypes) => {
      if (!mytypes.length) return res.status(404).send({ err: 'MyType not found' });
      res.send(`find successfully: ${mytypes}`);
    })
    .catch(err => res.status(500).send(err));
});

// Find One by userid
router.get('/mytype/:userid', (req, res) => {
  MyType.findOneByuserid(req.params.userid)
    .then((mytype) => {
      if (!mytype) return res.status(404).send({ err: 'MyType not found' });
      res.send(`findOne successfully: ${mytype}`);
    })
    .catch(err => res.status(500).send(err));
});

// Create new MyType document
router.post('/mytype', (req, res) => {
  MyType.create(req.body)
    .then(mytype => res.send(mytype))
    .catch(err => res.status(500).send(err));
});

// Update by userid
router.put('/mytype/:userid', (req, res) => {
  MyType.updateByuserid(req.params.userid, req.body)
    .then(mytype => res.send(mytype))
    .catch(err => res.status(500).send(err));
});

// Delete by userid
router.delete('/mytype/:userid', (req, res) => {
  MyType.deleteByuserid(req.params.userid)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

module.exports = router;