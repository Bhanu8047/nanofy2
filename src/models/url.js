const mongoose = require('mongoose')
const { nanoid } = require('nanoid')

const urlSchema = mongoose.Schema({
    url: {
        type: String,
        required: [true, 'Must have a url.'],
        trim: true
    },
    slug: {
        type: String,
        trim: true,
        maxLength: [10, 'Must be less than or equal to 10.'],
        minLength: [5, 'Must be greater than or equal to 5.'],
        lowercase: true,
        unique: true
    }
}, {
    timestamps: true
})

urlSchema.pre('save', async function(next) {
    const url = this
    if(!url.slug) {
        url.slug = nanoid(5)
    } 
    next()
})

module.exports = mongoose.model('Url', urlSchema)