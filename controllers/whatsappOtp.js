// import express from 'express';
const secrets = require('secrets.js');
const qrcode = require('qrcode');
const redis = require('redis');
const cache = redis.createClient(6379, '127.0.0.1');

exports.sendOtp = (req, res) => {
  console.log(req.body.phoneNumber);
  const phoneNumber = req.body.phoneNumber;
  // Generate a random 6-digit OTP
  const otp = secrets.random(3);

  // Save the OTP in a cache (e.g. Redis) with a short expiration time

  cache.on('error', (err) => {
    console.log(`Error connecting to cache: ${err}`);
  });

  // Wait for the cache to be ready before trying to use it
  cache.on('ready', () => {
    // Use the cache object to store and retrieve data
    cache.set(phoneNumber, otp, 'EX', 600, (err) => {
      if (err) {
        console.log(`Error storing OTP in cache: ${err}`);
      } else {
        console.log(`OTP stored in cache`);
      }
    });
  }); // expires in 10 minutes

  // Generate a QR code for the WhatsApp "send message" link
  qrcode
    .toDataURL(`https://wa.me/${phoneNumber}?text=Your%20OTP%20is%20${otp}`)
    .then((qrCodeUrl) => {
      // Return the QR code URL to the client
      console.log('HELLOOOOOO');
      res.json({ qrCodeUrl });
    })
    .catch((err) => {
      console.log(`Error generating QR code: ${err}`);
    });
};

// app.post('/verify-otp',

exports.verifyOtp = (req, res) => {
  const { phoneNumber, otp } = req.body;

  // Look up the user's pending OTP
  if (!cache.connected) {
    throw new Error('Error: Redis client is not connected');
  }
  const expectedOtp = cache.get(phoneNumber);
  console.log(expectedOtp);
  if (otp === expectedOtp) {
    // OTP is correct, so create the user account
    res.sendStatus(200)
    // createUser(phoneNumber)
    //   .then(() => res.sendStatus(200))
    //   .catch((err) => res.status(500).send(err));
  } else {
    // OTP is incorrect, so throw an error
    res.status(401).send('Invalid OTP');
  }
};
