const express = require("express");
const User = require("./calendarEntryModel");
const app = express();

// Get entries route
app.get('/get-entries', async (req, res) => {
  try {
    const entries = await CalendarEntry.find();
    res.json({ entries });
  } catch (error) {
    console.error('Error fetching entries from MongoDB', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Save entry route
app.post('/save-entry', async (req, res) => {
  const { date, questionName, platform, link } = req.body;

  try {
    const newEntry = new CalendarEntry({
      date,
      questionName,
      platform,
      link,
    });

    await newEntry.save();
    res.status(201).json({ message: 'Calendar entry saved successfully' });
  } catch (error) {
    console.error('Error saving calendar entry', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports=app;
