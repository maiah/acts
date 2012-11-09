var express = require('express');
var app = express();

app.use(express.static(__dirname + '/'));

app.get('/api/todos', function(req, res){
  var result = {
        0: { text: 'Call nay Helen for Pearl SSS', done: false },
        1: { text: 'Call NSO for marriage cert', done: false },
        2: { text: 'Print Pearl Grandfather photo', done: false},
        3: { text: 'Check computer for DBD Coop.', done: false},
        4: { text: 'Check laptop for James', done: false},
        5: { text: 'Check laptop for me', done: false}
      };
  res.json(result);
});

app.listen(7000);
console.log('Listening on port 7000');
