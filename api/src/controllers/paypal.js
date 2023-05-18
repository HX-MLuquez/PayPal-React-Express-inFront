const paypal = require('paypal-rest-sdk');

paypal.configure({
  mode: 'sandbox', // usar 'live' para producción
  client_id: 'AdlXlGE1MvbMXzsWC_bTfdlgL5Yb104KWoc-zv53teX6UM2UQANZ1s-EJ0WuS-JuFFtB8io1dtWG_u9h',
  client_secret: 'YOUR_CLIENT_SECRET'
});

const payPalPost = (req, res) => {
 
}

module.exports={
    payPalPost
}

