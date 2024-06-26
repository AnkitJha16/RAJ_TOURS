// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const factory = require('./handlerFactory');

// const APIFeatures = require('../utils/apiFeatures');
// const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');

// const factory = require('./handlerFactory');

// exports.getCheckoutSession = catchAsync(async (req, res, next) => {
//   // 1) Get currently boooked tour
//   const tour = await Tour.findById(req.params.tourId);

//   // 2) Create checckout session
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     success_url: `${req.protocol}://${req.get('host')}/`,
//     cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
//     customer_email: req.user.email,
//     client_reference_id: req.params.tourId,
//     currency: 'inr',
//     mode: 'payment',
//     line_items: [
//       {
//         price_data: {
//           product_data: {
//             name: `${tour.name} Tour`,
//             description: tour.summary,
//             images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
//           },
//           currency: 'inr',
//           unit_amount: tour.price * 100,
//         },
//         quantity: 1,
//       },
//     ],
//   });

//   // 3) Send session as response to client
//   res.status(200).json({
//     status: 'success',
//     session,
//   });
// });

// exports.createBookingCheckout = catchAsync(async (req, res, next) => {
//   // This is only Temporary , because it's UNSECURE : everyone can make bookings without paying
//   const { tour, user, price } = req.query;

//   if (!tour && !user && !price) return next();
//   await Booking.create({ tour, user, price });

//   next();
// });

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
