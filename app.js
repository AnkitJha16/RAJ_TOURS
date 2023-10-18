const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const cors = require("cors");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
// const xss = require('xss')

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const bookingRouter = require("./routes/bookingRoutes");

const app = express();

app.enable("trust proxy");
// 1) GLOBAL MIDDLEWARES

app.use(cors());
// the above works only for simple requests (GET and POST)
// Access-Control-Allow-Origin *
// in case the api is in a different domain and frontend is in different domain then we can allow cors to that particular site
// app.use(
//   cors({
//     origin: 'https://www.natours.com', // ( front end part)
//   }),
// );
app.options("*", cors());
// app.options('/api/v1/tours/:id', cors());   for custom only access

// Set Security HTTP Headers
app.use(helmet());

// Development Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 300,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP , please try again in an hour!",
});
app.use("/api", limiter);

// Body parser , reading data from body into req.body
app.use(
  express.json({
    limit: "10kb",
  })
);

// data Sanitization against NOSQL query injection
app.use(mongoSanitize());

// data sanitization against XSS

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);

// compressing responses
app.use(compression());

// Serving Static files
app.use(express.static(`${__dirname}/public`));

//Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// 3) ROUTES
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/bookings", bookingRouter);
// this is placed at last so that all the routes are passed and not found above.
// if it will placed above then everytime fail will be response even if the route is correct and defined.

app.all("*", (req, res, next) => {
  // Type 1
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server !`,
  // });
  // next()
  //
  // Type 2
  // const err = new Error(`Can't find ${req.originalUrl} on this server !`);
  // err.status = 'fail';
  // err.statusCode = 404;
  // next(err);
  //
  // Type 3
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// app.use((err, req, res, next) => {
//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || 'error';

//   res.status(err.statusCode).json({
//     status: err.status,
//     message: err.message,
//   });
// });

app.use(globalErrorHandler);

module.exports = app;
