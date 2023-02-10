const express = require('express');
const morgan = require('morgan');
const session = require('express-session');

const app = express();

app.use(session({
    secret: 'session secret',
    resave: false,
    saveUninitialized: true,
}))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan('dev'));

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    let message = err.message || "Internal Server Error";

    if (statusCode === 500) message = "Internal Server Error";

    res.status(statusCode).json({ message })
});

const PORT = 8010;

app.listen(PORT, () => console.info(`server listening on port ${PORT} ...`))