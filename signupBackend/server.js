const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes/route');
const cors = require('cors');

dotenv.config();
mongoose.connect(process.env.DATA_BASE_ACCESS, () =>
  console.log('Database connected')
);
const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cors());
routes(app);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'public') });
});

// app.use(express.static(path.join(__dirname, '../frontEnd/build')));

// app.get('*', function (_, res) {
//   res.sendFile(
//     path.join(__dirname, '../frontEnd/build/index.html'),
//     function (err) {
//       if (err) {
//         res.status(500).send(err);
//       }
//     }
//   );
// });

app.listen(PORT, () => console.log('Server is listening......'));

module.exports = app;
