const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SponserSchema = new Schema({
    id: {type: String, required: true},
    parentId: {type: String, required: true},
});

module.exports = mongoose.model('Sponser', SponserSchema);
