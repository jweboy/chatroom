const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: { type: String },
    message: { type: String },
    date: { type: Date },
}, { collection: 'chat' })

module.exports = mongoose.model("Chat", UserSchema)
