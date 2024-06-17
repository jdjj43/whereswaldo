const express = require('express');
const app = express();
const routes = require('./routes/router');
const connectDB = require('./config/database');
const cors = require('cors');

connectDB();

app.use(cors({
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
}));
app.use(express.json());
app.use('/api', routes);

app.listen(3000, () => {
  console.log('Server up!');
})