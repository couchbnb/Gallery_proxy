const axios =require ('axios');
const express = require('express');
var path = require('path')
const cors = require('cors')
const http = require('http');
const app = express()
const port = process.env.PORT || 3000;
const { createProxyMiddleware } = require('http-proxy-middleware')
const morgan = require('morgan');
// const routes = require('./routes')

app.use(express.json());
// // app.use('/listing/:id', express.json());

// app.use(cors());



  app.use(morgan('dev'));
  // app.use( express.static('../public'));
  app.use( express.static(path.join(__dirname, '../public')));;
  app.use('/static', express.static(path.join(__dirname, '../public')));;




const addresses = {
  target: '127.0.0.2',
  gallery: 'http://3.101.106.19/',
  reservations: 'http://ec2-3-135-212-193.us-east-2.compute.amazonaws.com/',
  morePlaces: 'http://54.183.142.121/'
};


// app.get('/data', createProxyMiddleware({
//   target: addresses.target,
//   changeOrigin: true,
//   router: function() { return addresses.gallery }

// })
// );


  app.get('/data', (req, res) => {
    // need to refactor here
    console.log("my request ")
    // var id = req.params.id
    const id =req.query.listing_id
    // const id = req.query.roomid;
    console.log(id, "id in data!!!!!!!!!!!!!!!!!!")
    console.log(req.params.id, "id?!?!?!!!!!!!!!!!")

    axios.get(`http://3.101.106.19/data/${id}`)
      .then((response) => {

       console.log("route was hit in proxy")
       res.json(response.data)
      })

      .catch((err) => {
        console.log( "we had an error on gallery ")
      })

    })

  //   createProxyMiddleware({
  //     target: addresses.target,
  //     changeOrigin: true,
  //     router: function() { return addresses.gallery }
  //   })

      app.get('/api/listing', ((req, res) => {
        console.log("listing booking", req.query.listing_id)
        console.log("this was hit!!!!!!!!!!!!!!!")
        axios.get(`http://ec2-3-135-212-193.us-east-2.compute.amazonaws.com/api/listing`)
          .then((response) => {
            console.log(response.data, "listing")
            res.json(response.data)

          })

          .catch((err) => {
            console.log( "listing " , err)
            res.send(err)
          })

        }))




         app.get(`/api/reservations`, (req, res ) =>{
          console.log("reservations", req.query.listing_id)
         axios.get('http://ec2-3-135-212-193.us-east-2.compute.amazonaws.com/api/reservations')
          .then((response) => {
            console.log( "reservation")
            res.json(response.data)
          })

          .catch((err) => {
            console.log( "we had an error on reservation " )
            res.send(err)
          })
      })

// route for morplaces to stay
      app.get('/place', (req, res) => {
        const id = req.query.roomid;
        console.log("id from more places to stay ", id)
        axios.get(`http://54.183.142.121/place?roomid=${id}`)
          .then((response) => {
            res.status(200).send(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      });







app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

