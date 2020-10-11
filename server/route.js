const express = require('express');
const router = express.Router();
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require('axios');

// serves index as static
router.use('/', express.static(path.join(__dirname, '../public')));


const addresses = {
  target: '127.0.0.1',
  gallery: 'http://3.101.106.19/',
  reservations: 'http://ec2-3-135-212-193.us-east-2.compute.amazonaws.com/',
  morePlaces: 'http://54.183.142.121/'
};


// ----- GALLERY ------


router.use('/listing',
  createProxyMiddleware({
    target: addresses.target,
    changeOrigin: true,
    router: function() { return addresses.gallery }
  })
);

router.use('/data',
  createProxyMiddleware({
    target: addresses.target,
    changeOrigin: true,
    router: function() { return addresses.gallery }
  })
);


// ----- reservations ------

router.use('/api/listing/',
  createProxyMiddleware({
    target: addresses.target,
    changeOrigin: true,
    router: function() { return addresses.reservations }
  })
)

router.use('/api/reservations/',
  createProxyMiddleware({
    target: addresses.target,
    changeOrigin: true,
    router: function() { return addresses.reservations }
  })
)



// ----- MORE PLACES TO STAY -----


router.get('/place', (req, res) => {
  const id = req.query.roomid;
  axios.get(`${addresses.morePlaces}place?roomid=${id}`)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      console.log(err);
    })
});


module.exports = router;