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

const findEditThenSave = async (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findOne({ _id: personId }, function (err, person) {
    person.favoriteFoods.push(foodToAdd);

    person.save(function (err) {
      if (err) {
        console.error("ERROR!");
      } else {
        done(null, person);
        console.log("success");
      }
    });
  });
  // let personData = await Person.findById(personId).exec();
  // personData.favoriteFoods.push(foodToAdd);
  // // console.log(personData);
  // // all good above but down has some issue.
  // await personData.save();
  // Person.findOne({ Id: personId })
  //   .update(personData, function (err, data) {
  //     if (err) {
  //       done(err);
  //       console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeerror");
  //     } else {
  //       done(null, data);
  //       console.log("successsuccesssuccesssuccesssuccesssuccess");
  //     }
  //   })
  //   .exec();
};

const findAndUpdate = async (personName, done) => {
  const ageToSet = 20;
  const query = { name: personName };
  const update = { age: ageToSet };
  const option = { new: true };

  try {
    await Person.findOneAndUpdate(query, update, option);
    done(null /*, data*/);
    console.log("wah ji wah");
  } catch (e) {
    console.log("error hai jii");
  }
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
