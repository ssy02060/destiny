const mongoose = require('mongoose');

// Define Schemes
const mytypeSchema = new mongoose.Schema({
  userid: { type: Number, required: true},
  tag: { 
    genres: {type: String},
    directors: {type: String},
    movies: {type: String},
    actors: {type: String}
  },
},
{
  timestamps: true
});


// Create new MyType document
mytypeSchema.statics.create = function (payload) {
  // this === Model
  const myType = new this(payload);
  console.log(myType)
  // return Promise
  return myType.save();
};

// Find All
mytypeSchema.statics.findAll = function () {
  // return promise
  // V4부터 exec() 필요없음
  return this.find({});
};

// Find One by userid
mytypeSchema.statics.findOneByuserid = function (userid) {
  return this.findOne({ userid });
};

// Update by userid
mytypeSchema.statics.updateByuserid = function (userid, payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate({ userid }, payload, { new: true });
};

// Delete by userid
mytypeSchema.statics.deleteByuserid = function (userid) {
  return this.remove({ userid });
};

// Create Model & Export
module.exports = mongoose.model('MyType', mytypeSchema);


