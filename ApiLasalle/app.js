const express = require('express')
const axios = require('axios');
const app = express()
const port = 3000

app.use(express.json())

app.post('/api/donate', async (req, res) => {
console.log(req)
const options = {
  method: 'POST',
  url: 'https://sandbox.api.pagseguro.com/checkouts',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer 8de04cdb-5acb-4d94-ac6d-d49bf3d0f5d3b3d83530402289d3f2f87623336e3f9c61cd-f1b3-4b07-b2da-ab6d81acc8ed',
    'Content-type': 'application/json'
  },
  data: {
    reference_id: 'Doaçao Sempre Criança',
    expiration_date: '2025-08-14T19:09:10-03:00',
    customer_modifiable: true,
    items: [
      {
        reference_id: 'Doaçao Sempre Criança',
        name: 'Doaçao',
        quantity: 1,
        unit_amount: req.body.valor
      }
    ],
    redirect_url: 'https://pagseguro.uol.com.br'
  }
};

let responseData = {};

await axios
  .request(options)
  .then(function (response) {

    responseData = response.data
  })
  .catch(function (error) {
    console.error(error);
  });

  return res.json(responseData)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})