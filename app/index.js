import app from './app';

const PORT = process.env.PORT || 5000;


if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json(
            {
                message: err.message,
                error: {}
            }
        );
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json(
        {
            message: err.message,
            error: {}
        }
     );
});

app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
});