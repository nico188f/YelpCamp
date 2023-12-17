const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");
const axios = require("axios");
const fs = require("fs");

// let cities;

// fs.readFile("./cities.json", (err, data) => {
//     if (err) {
//         console.error(err);

//         throw err;
//     }
//     cities = JSON.parse(data);
//     console.dir(cities);
// });

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const numOfCampgrounds = 300;

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < numOfCampgrounds; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            author: "65328070428ce615f173920e",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description:
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis commodi debitis earum quaerat, quia numquam maxime quos atque dolorem totam architecto nam iusto perferendis illo, fuga necessitatibus facilis molestiae delectus.",
            price: Math.floor(Math.random() * 20) + 10,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ],
            },
            images: [
                {
                    url: "https://res.cloudinary.com/dvemlk9tg/image/upload/v1698586729/YelpCamp/cfsacob74loga8z8uba3.png",
                    filename: "YelpCamp/cfsacob74loga8z8uba3",
                },
                {
                    url: "https://res.cloudinary.com/dvemlk9tg/image/upload/v1698586730/YelpCamp/mgfcfx1hmuyn2sq5st97.png",
                    filename: "YelpCamp/mgfcfx1hmuyn2sq5st97",
                },
                {
                    url: "https://res.cloudinary.com/dvemlk9tg/image/upload/v1698586731/YelpCamp/lefrcus7frs07fcvuuln.png",
                    filename: "YelpCamp/lefrcus7frs07fcvuuln",
                },
            ],
        });
        await camp.save();
        console.log(`${i + 1}/${numOfCampgrounds}`);
    }
};

// call unsplash and return small image
async function seedImg() {
    try {
        const resp = await axios.get("https://api.unsplash.com/photos/random", {
            params: {
                client_id: "MCLNStKz0Th54Xe2-szKHVGOe6-JoXpV7zSxpEGEgPU",
                collections: 1114848,
            },
        });
        return resp.data.urls.small;
    } catch (err) {
        console.error(err);
    }
}

seedDB();
