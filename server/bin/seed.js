const mongoose = require("mongoose");
const BabySister = require("../models/SisterMami");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const bcryptSalt = 10;

let users = [{
        username: "a1",
        password: bcrypt.hashSync("a1", bcrypt.genSaltSync(bcryptSalt)),
        role: "mami"
    },
    {
        username: "a2",
        password: bcrypt.hashSync("a2", bcrypt.genSaltSync(bcryptSalt)),
        role: "sister"
    }
]

const babySisters = [{
        username: "a1",
        password: bcrypt.hashSync("a1", bcrypt.genSaltSync(bcryptSalt)),
        role: "Mami",
        description: "b",
        coment: "c",
        geo: {
            coordinates: [40.350396, -3.688527]
        },

        // valoraciones
    },
    {
        username: "a2",
        password: bcrypt.hashSync("a2", bcrypt.genSaltSync(bcryptSalt)),
        role: "Sister",
        description: "b2",
        coment: "c2",
        geo: {
            coordinates: [40.351999, -3.696735]
        },

        // valoraciones
    },
    // {
    //     name: "mami 1",
    //     description: "b2",
    //     coment: "c2",
    //     geo: {
    //         coordinates: [40.351999, -3.56735]
    //     },
    //     done: false,
    //     role: "mami"

    //     // valoraciones
    // },
    // {
    //     name: "mami 2",
    //     description: "b2",
    //     coment: "c2",
    //     geo: {
    //         coordinates: [40.351999, -3.496735]
    //     },
    //     done: false,
    //     role: "mami"

    //     // valoraciones
    // },
];

mongoose
    .connect(`${process.env.BBDDLOCAL}`, {
        useNewUrlParser: true
    })
    .then(x => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)

        User
            .deleteMany()
            .then(() => {
                User
                    .insertMany(babySisters)
                    .then(usersCreated => {
                        console.log(`${usersCreated.length} users created with the following id:`);
                        console.log(usersCreated.map(u => u._id));

                        process.exit(0)
                    })
            })
    })
    .catch(err => console.error("Error connecting to mongo", err));