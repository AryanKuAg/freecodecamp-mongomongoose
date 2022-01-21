var mongoose = require("mongoose");
// import { mongoose } from "mongoose";
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to the database all are happy now"))
  .catch((e) => console.log("This is the error by connecting to the database"));

let Person;
const personSchema = mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  favoriteFoods: { type: [String] },
});

Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name: "Aryan",
    age: 18,
    favoriteFoods: ["Dhosa", "Maggi", "Pizza", "cold drink"],
  });
  person
    .save()
    .then((data) => {
      console.log("Person name is saved now");
      done(null, data);
    })
    .catch((e) => {
      console.log("This is the error while saving person document");
      done(e);
    });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, data) {
    if (err) done(err);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, data) {
    if (err) done(err);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne(
    { favoriteFoods: { $in: food.split(",") } },
    function (err, data) {
      if (err) done(err);
      done(null, data);
    }
  );
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, data) {
    if (err) done(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.update({ _id: personId }, { $push: { friends: foodToAdd } }, done);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
