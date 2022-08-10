const router = require('express').Router();
const MyType = require('../models/MyType.js');

// Find All
router.get('/', (req, res) => {
  MyType.findAll()
    .then((mytypes) => {
      if (!mytypes.length) return res.status(404).send({ err: 'mytype not found' });
      res.send(`find successfully: ${mytypes}`);
    })
    .catch(err => res.status(500).send(err));
});

// Find One by userid
router.get('/:userid', (req, res) => {
  MyType.findOneByuserid(req.params.userid)
    .then((mytype) => {
      if (!mytype) return res.status(404).send({ err: 'mytype not found' });
      res.send(`findOne successfully: ${mytype}`);
    })
    .catch(err => res.status(500).send(err));
});

// Create new MyType document
router.post('/', (req, res) => {
  console.log(req.body)
  MyType.create(req.body)
    .then(mytype => res.send(mytype))
    .catch(err => res.status(500).send(err));
});

// Update by userid
router.put('/:userid', (req, res) => {
  MyType.updateByuserid(req.params.userid, req.body)

    .then(mytype => res.send(mytype))
    .catch(err => res.status(500).send(err));
    //.catch(err =>  console.log(err))
});

//Update by mongodb document
// router.put('/:userid', (req, res)  =>{
//   MyType.findOneByuserid(req.params.userid)
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


  // await db.mytypes.update
  //   (qurey,
  //   {userid:req.body.userid,
  //    genres: req.body.tag.genres,
  //    directors: req.body.tag.directors,
  //    movies: req.body.tag.movies,
  //    actors: req.body.tag.actors
  //   }, 
  //   {upsert: true})
  

// Delete by userid
router.delete('/:userid', (req, res) => {
  MyType.deleteByuserid(req.params.userid)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

module.exports = router;