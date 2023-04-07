const appRouter = require('../routes/eventsRouter');
const errorMiddleware = require('../middleware/errorMiddleware');

module.exports = function (app) {
    app.use('/api', appRouter);

    // Handle errors
    app.use(errorMiddleware);
}