const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Mode: {
        type: String,
        default: "TBD"
    },
    Image: {
        type: String,
        default: "TBD"
    },
    lastDate: {
        type: Date,
    },
    teamSize: {
        type: Number,
        default: 0
    },
    URI: {
        type: String,
        default: ""
    }
});

// Virtual for formatting the date without time
eventSchema.virtual('formattedLastDate').get(function() {
    return this.lastDate ? this.lastDate.toISOString().split('T')[0] : '';
});

// Ensure virtuals are included when the document is converted to JSON
eventSchema.set('toJSON', { virtuals: true });
eventSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model("eventModel", eventSchema);