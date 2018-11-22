const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher1');

let repoSchema = mongoose.Schema({
   username:String,
   repos: Object
});

let Repo = mongoose.model('Repo', repoSchema);

// data represent object contain the schema
let save = (data) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  let repo = new Repo(data);
  repo.save(function(err){
    if(err){
      console.log(err);
    } else {
      console.log("Data Saved!");
    }
   
  });
}

let getData = function(username, callback){
  Repo.findOne({username: username}, function(err, data){
    callback(data);
  })
}

module.exports.save = save;
module.exports.getData = getData;