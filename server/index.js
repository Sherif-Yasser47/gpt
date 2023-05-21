const express = require('express');
const cors = require('cors');
let logger = require('morgan');

const userRoutes = require('./routes/userRoutes');
const gptRoutes = require('./routes/gptRoutes');

const app = express();

const port = process.env.PORT || 3001;
require('./db/dbConnect');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/gpt', gptRoutes);

app.use('/goal', (req, res) => {
    res.status(200).send('HI');
});

// catch 404 unsupported routes.
app.use('*', (req, res) => {
    res.status(404).send({ error: 'route is not supported' });
});


// error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.send({ error: err.message });
    // console.log(err);
});

app.listen(port, () => {
    console.log(`server up on port ${port}`);
});

