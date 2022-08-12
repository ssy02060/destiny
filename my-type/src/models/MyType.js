const mongoose = require('mongoose');

// Define Schemes
const mytypeSchema = new mongoose.Schema({
  userId: {type: String, required : true, unique :true},
  tag: { 
    genres: {type: [String] },
    directors: {type: [String]},
    movies: {type: [String] },
    actors: {type: [String] }
  } ,
},
 {
   timestamps: true
 },
 { collection : "My-collection-name2"}
);


// Create new MyType document
mytypeSchema.statics.create = function (payload) {
  // this === Model
  const myType = new this(payload);
  console.log("##############")
  console.log(myType)
  console.log("##############")
  // return Promise
  return myType.save();
};

// Find All
mytypeSchema.statics.findAll = function () {
  // return promise
  // V4부터 exec() 필요없음
  return this.find({});
};

// Find One by userId
mytypeSchema.statics.findOneByuserId = function (userId) {
  return this.findOne({ userId });
};

// Update by userId
mytypeSchema.statics.updateByuserId = function (userId, payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate({ userId }, payload, { new: true });
};

// Delete by userId
mytypeSchema.statics.deleteByuserId = function (userId) {
  return this.remove({ userId });
};

// Create Model & Export
module.exports = mongoose.model('new', mytypeSchema);


