require('dotenv').config();
require('./model/mongo/db');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const MovieController=require('./controller/Movie')
const CommentController=require('./controller/Comment')
const cors = require('cors');
app.use(cors());
app.use(express.static('public'));

/** Movie */
app.get('/movies',MovieController.list );
app.get('/movies/:id',MovieController.getById );
/** Comments */
app.get('/comments',CommentController.list );
app.get('/comments/:id',CommentController.getById );

app.use('*', (req, res) => {
  res.status(404).json({
    message: '404 Not Found',
  });
});
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  console.log({ err });
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
});
app.listen(PORT, () => {
  console.log(`Server app listening at http://localhost:${PORT}`);
});