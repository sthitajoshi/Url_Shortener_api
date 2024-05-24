const express = require('express');
const { connectToMongoDB } = require('./routes/connect');
console.log({ connectToMongoDB }); // Log the imported module

const urlRoute = require('./routes/url');
const URL = require('./models/url');

const app = express();
const port = 8009;

connectToMongoDB("mongodb+srv://joshivikram836:BwxIDDChqQUzAXCB@cluster0.kdjaybc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(
  () => {
    console.log('MongoDB connected');

    // Start the server only after MongoDB connection is successful
    app.listen(port, () => {
      console.log(`Server started at port: ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });

app.use(express.json());

app.use('/url', urlRoute);

app.get('/:shortId', async (req, res) => {
  const shortId = req.params.shortId;

  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } }
    );

    if (!entry) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    return res.redirect(entry.redirectURL);
  } catch (error) {
    console.error('Failed to retrieve short URL:', error);
    return res.status(500).json({ error: 'Failed to retrieve short URL' });
  }
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});
