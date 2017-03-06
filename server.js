const express = require('express');
const app = express();
const bp = require('body-parser');

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}
console.log('hello')

app.use(bp.urlencoded({
  extended: true
}));
app.use(bp.json());

app.get('/test', (req, res) => {
  console.log('hit');
  res.send({test:'success'});
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});