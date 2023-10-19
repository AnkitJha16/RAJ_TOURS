
## A Tour and Travel agency API 

This Api is designed for the travel and Tourism industry in mind.Companies can take this api as inspiration and reuse this api as a boilerplate in adddition to their custom functionalities and requirements.

# Major current features include :

1. Creating and Manging Tours (for Admins and Lead Guides only)
2. Fetching Tours (All Roles)
3. Creating and Managing Users (for Admins only)
4. Basic user authentication using JWT\
   a) signup\
   b) Login\
   c) Forgot password - Reset password via link send to users email.
6. Adding Review to Tours (All users except admins, guides and lead Guides)
7. Tour Booking (for Admins and Lead Guides only)
8. Geocoding of tour start locations in case someone need to visualize those in maps.

# Future enhancement coming Soon:
1. implementing payment gateway and booking of tours by a normal user after successfull payment
2. restriction :\
   a) User can only review a tour which he/she has booked.\
   b) User can only book tours till subscription count is less or equal to maxGroupSize or else tour is SOLD OUT and user cannot book.\
4. routes showing (for Admins only)\
   a) bookings done by on a particular tour\
   b) booking done by a particular user\
5. Automated sending of confirmation mails at each booking\
6. Implementation ofg advanced authentication methods like refresh token and 2-factor authentication.\

# API Link : (https://raj-tours.onrender.com)

# API DOC : (https://documenter.getpostman.com/view/2s9YR9ZDKo?version=latest)

## Tech Stack

**Server:** Node, Express

**Database:** MongoDb

