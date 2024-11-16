const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://uzair:Uzairanjum46@clustermyproject.s9d7e.mongodb.net/", {
            dbName: 'react' // specify the database name if required
        });
        console.log(`Connected to the database ${mongoose.connection.host}`.bgCyan.white);
    } catch (error) {
        console.log(`Error in connection DB ${error}`.bgRed.white);
    }
};

module.exports = connectDB;
