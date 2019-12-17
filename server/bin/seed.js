require("dotenv").config();

const mongoose = require("mongoose");
const BabySister = require("../models/SisterMami");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const bcryptSalt = 10;

let users = [
  {
    username: "maria",
    password: bcrypt.hashSync("maria", bcrypt.genSaltSync(bcryptSalt)),
    picture: "",
    role: "Mami",
    donde: "",
    description:
      "soy mamá de dos niños necesito niñera , que sea responsable y este preparada para cuidar a bebés de entre 1 y 3 años",
    comment: "",
    geo: {
      coordinates: [40.393798, -3.700263]
    }
  },
  {
    username: "kata",
    password: bcrypt.hashSync("kata", bcrypt.genSaltSync(bcryptSalt)),
    picture: "",
    role: "Sister",
    done: "",
    description:
      "responsable y buena mano con los niños acepto de todas las edades ",
    comment: "",
    geo: {
      coordinates: [40.388895, -3.696283]
    }
  }
];

const babySisters = [
  {
    username: "maria",
    password: bcrypt.hashSync("maria", bcrypt.genSaltSync(bcryptSalt)),
    role: "Mami",
    description:
      "soy mamá de dos niños necesito niñera , que sea responsable y este preparada para cuidar a bebés de entre 1 y 3 años",
    geo: {
      coordinates: [40.393798, -3.600263]
    }
  },
  {
    username: "kata",
    password: bcrypt.hashSync("kata", bcrypt.genSaltSync(bcryptSalt)),
    role: "Sister",
    description:
      "responsable y buena mano con los niños acepto de todas las edades ",
    geo: {
      coordinates: [40.388895, -3.996283]
    }
  },

  {
    username: "estefania",
    password: bcrypt.hashSync("estefania", bcrypt.genSaltSync(bcryptSalt)),
    role: "Mami",
    description: "Busco niñera que sepa cocinar ",
    geo: {
      coordinates: [40.394836, -3.7015607]
    }
  },
  {
    username: "carolina",
    password: bcrypt.hashSync("carolina", bcrypt.genSaltSync(bcryptSalt)),
    role: "Sister",
    description: "me gustan mucho los niños ",
    geo: {
      coordinates: [40.390489, -3.6949837]
    }
  }
];

mongoose
  .connect(`${process.env.BBDDATLAS}`, {
    useNewUrlParser: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );

    User.deleteMany().then(() => {
      User.insertMany(babySisters).then(usersCreated => {
        console.log(
          `${usersCreated.length} users created with the following id:`
        );
        console.log(usersCreated.map(u => u._id));

        process.exit(0);
      });
    });
  })
  .catch(err => console.error("Error connecting to mongo", err));
