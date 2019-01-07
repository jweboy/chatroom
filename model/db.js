const mongoose = require('mongoose')

module.exports = function initMongodb() {
    // Init mongodb
    return mongoose.connect('mongodb://localhost/myapp', {
        useNewUrlParser: true,
    })
        // connection successful
        .then((db) => {
            console.log('mongodb connect successful.')
            return db;
        })
        // catch error
        .catch(err =>　{
            console.log('mongodb connect error: %s', err)
        })
}
