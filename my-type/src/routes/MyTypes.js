const router = require('express').Router();
const MyType = require('../models/MyType.js');

// Find All
router.get('/', (req, res) => {
  MyType.findAll()
    .then((mytypes) => {
      if (!mytypes.length) return res.status(404).send({ err: 'mytype not found' });
      res.status(200).send(`${mytypes}`);
    })
    .catch(err => res.status(500).send(err));
});

// Find One by userId
router.get('/:userId', (req, res) => {
  console.log(req.params.ususerIderid)
  MyType.findOneByuserId(req.params.userId)
    .then((mytype) => {
      if (!mytype) return res.status(404).send({ err: 'mytype not found' });
      res.status(200).send(`${mytype}`);
    })
    .catch(err => res.status(500).send(err));
});

// Create new MyType document
router.post('/', (req, res) => {
  console.log("-------------------")
  console.log(req.body)
  console.log("-------------------")
  MyType.create(req.body)
    .then(mytype => res.status(200).send(mytype))
    .catch(err => res.status(500).send(err));
});

// Update by userId
router.put('/:userId', (req, res) => {
  console.log(req.body.userId)
  MyType.updateByuserId(req.params.userId, req.body)
    .then(mytype => res.status(200).send(mytype))
    .catch(err => res.status(500).send(err));
    //.catch(err =>  console.log(err))
});

//Update by mongodb document
// router.put('/:userId', (req, res)  =>{
//   MyType.findOneByuserId(req.params.userId)
//     .then((mytype) => {
//       if (!mytype) return res.status(404).send({ err: 'mytype not found' });
//       res.send(`findOne successfully: ${mytype}`);
//       return db.mytypes.update
//         (qurey,
//         {tag :
//         {genres : req.body.tag.genres,
//         directors: req.body.tag.directors,
//         movies: req.body.tag.movies,
//         actors: req.body.tag.actors}
//         })
//       })
//     .catch(err => res.status(500).send(err));
// });

// Delete by userId
router.delete('/:userId', (req, res) => {
  MyType.deleteByuserId(req.params.userId)
    .then(() => res.status(200).send('successfully deleted'))
    .catch(err => res.status(500).send(err));
});

module.exports = router;