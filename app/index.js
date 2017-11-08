import app from './app';
import antiSleep from './herokuSleep';
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
        next(res)
    });
}
antiSleep();
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    console.log('123')
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