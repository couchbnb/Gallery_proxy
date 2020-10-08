const axios =require ('axios');
const express = require('express');
var path = require('path')
const cors = require('cors')
const http = require('http');
const app = express()
const port = process.env.PORT || 3000;
const morgan = require('morgan');
// const routes = require('./routes')

app.use(express.json());
// // app.use('/listing/:id', express.json());




  app.use(cors());
  app.use(morgan('dev'));
  app.use( express.static('../public'));

  app.use('/static/:id', express.static('../public'));



  app.get('/data/:id', (req, res) => {
    // need to refactor here
    var id = req.params.id

    console.log(req.params.id, "id?!?!?!!!!!!!!!!!")

    axios.get(`http://localhost:3061/data/${id}`)
      .then((response) => {

       console.log(response.data)
       res.json(response.data)
      })

      .catch((err) => {
        console.log( "we had an error on gallery " , err)
      })

    })



      app.get('/api/listing', ((req, res) => {

        console.log("this was hit!!!!!!!!!!!!!!!")
        axios.get(`http://localhost:3005/api/listing`)
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

         axios.get('http://localhost:3005/api/reservations')
          .then((response) => {
            console.log( "reservation")
            res.json(response.data)
          })

          .catch((err) => {
            console.log( "we had an error on reservation " )
            res.send(err)
          })
      })


      app.get('/data', (req, res) => {
        const id = req.query.roomid;
        axios.get(`http://localhost:1128/data?roomid=${id}`)
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

