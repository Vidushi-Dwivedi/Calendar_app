// calendarEntryModel.js

const mongoose = require('mongoose');

const calendarEntrySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  questionName: { type: String, required: true },
  platform: { type: String, required: true },
  link: { type: String },
});

const CalendarEntry = mongoose.model('CalendarEntry', calendarEntrySchema);

module.exports = CalendarEntry;
