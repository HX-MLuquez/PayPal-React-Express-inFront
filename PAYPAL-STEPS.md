# Integrar PayPal en una aplicación de React

# Steps

## 1

1. Accede a la página de registro de PayPal Developer: https://developer.paypal.com/.

- Haz clic en el botón "Sign Up" en la esquina superior derecha de la pantalla.

- Completa el formulario de registro con tu información personal, incluyendo tu nombre, dirección de correo electrónico y contraseña. Asegúrate de que la dirección de correo electrónico sea válida, ya que recibirás un correo electrónico de confirmación.

- Haz clic en "Sign Up" para enviar el formulario.

- A continuación, deberás completar un formulario de información adicional, incluyendo detalles sobre tu negocio y tus necesidades de pago en línea.

- Una vez que hayas enviado el formulario, recibirás un correo electrónico de confirmación en la dirección de correo electrónico que proporcionaste.

- Abre el correo electrónico y sigue las instrucciones para verificar tu cuenta de desarrollador de PayPal.

- Una vez que hayas verificado tu cuenta, inicia sesión en PayPal Developer para acceder a tu panel de control.

  - PayPal Developer

- Desde tu panel de control, podrás acceder a las herramientas y recursos de PayPal Developer, incluyendo la API de PayPal y la documentación de integración.

- Ir a API Credentials y seleccionar Create App donde se obtienen:
  - Client ID
  - Secret

# FRONT - REACT APP

## 2

Opción para implementar y controlar PayPal desde el Front principalmente

2. Para instalar el SDK de PayPal, sigue los siguientes pasos:

- Ejecuta el siguiente comando en la terminal para instalar el paquete npm del SDK de PayPal:

```bash
npm install @paypal/react-paypal-js
```

Asegurar de tener una versión compatible del SDK de PayPal instalada:

```bash
npm list @paypal/react-paypal-js
```

Veremos la versión actual del SDK de PayPal que está instalada.

- Envolver el component que ejecutará el pago con PayPalScriptProvider

```js
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Paypal from "./Paypal";
//... ...
<div>
  <PayPalScriptProvider>
    <Paypal
      userId={userId}
      total={total}
      cartCode={cartCode}
      cartProducts={cartProducts}
    />
  </PayPalScriptProvider>
</div>;
```

- Creamos el Component Paypal.jsx
- Importar PayPalButtons en tu archivo React donde deseas utilizar el botón de pago de PayPal. Puedes hacerlo utilizando la siguiente sintaxis:

Paypal.jsx

```javascript
import { PayPalButtons } from "@paypal/react-paypal-js";
```

Esto importa el componente PayPalButtons del SDK (librería de PayPal) para poder utilizar en el proyecto React.

Una vez instalado y configurado el SDK de PayPal

- Utilizar el componente PayPalButtons para agregar un botón de pago de PayPal a tu aplicación. Para hacerlo, simplemente incluye el componente PayPalButton en el renderizado de tu componente React y proporciona las opciones de configuración necesarias, como el ID de cliente, la moneda y el monto a cobrar al usuario.

```js
<PayPalButtons
  options={options}
  createOrder={createOrder}
  onApprove={onApprove}
/>;
{
  isPaid ? <h2 style={{ color: "green" }}>Pago procesado con éxito!</h2> : null;
}
```

Esto crea un botón de pago de PayPal en la aplicación que los usuarios pueden utilizar para realizar transacciones de pago en línea.

Tener en cuenta que debes asegurarte de seguir las políticas y requisitos de integración de PayPal al utilizar su SDK y botón de pago en línea. Además, debes asegurarte de que tu entorno de pruebas esté configurado correctamente para evitar transacciones reales mientras realizas pruebas.

- Obtener el Client ID y el Secret de PayPal: Una vez que hayas creado tu aplicación, debes obtener un Client ID de PayPal. El Client ID es un identificador único que vincula tu aplicación con tu cuenta de PayPal. Puedes obtener un Client ID desde la página de detalles de tu aplicación en la plataforma de desarrollador de PayPal.

```javascript
import React, { useState } from "react";
import axios from "axios";

//----------------------------------- code PAYPAL ----------------------------------

import { PayPalButtons } from "@paypal/react-paypal-js";

const initialOptions = {
  "client-id":
    "AdlXlGE1MvbMXzsWC_bTfdlgL5Yb104KWoc-zv53teX6UM2UQANZ1s-EJ0WuS-JuFFtB8io1dtWG_u9h",
  currency: "USD",
  // Otros parámetros opcionales
};
const secret_key =
  "EJreDO5j5ZPyAgCHIBEFdC9EaMmn84Q1HdDQm5DNyXL27KvUIj7yX7VDo5J82RdcPzWJT0XaRgukQCC9";
//----------------------------------------------------------------------------------

export default function Paypal({ userId, total, cartCode, cartProducts }) {
  //-------------------------------------------*************-------------------------------------------
  //------------------------------------------- code PAYPAL -------------------------------------------
  const [options, setOptions] = useState(initialOptions);

  const [isPaid, setIsPaid] = useState(false); // bandera para cartel aviso estado de transacción
  //---------------------------------------------------------------------------------------------------

  //---------------------------
  // *** PAYPAL INTEGRATION

  const createOrder = (data, actions) => {
    const amounts = {};
    cartCode.map((p) => {
      amounts[p.productId] = p.amount;
    });
    // console.log(amounts)
    const descripcion = cartProducts.map((e) => e.title).toString();
    const products = cartProducts.map((product) => {
      product.amount = amounts[product.id];
      return product;
    });
    // console.log(products)
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: total, // Asegúrate de que `total` esté definido correctamente
            breakdown: {
              // este breakdown prop la aplicamos al utilizar items
              item_total: {
                currency_code: "USD",
                value: total,
              },
            },
          },
          description: descripcion, // Agrega una descripción adecuada
          items: products.map((p) => {
            return {
              name: p.title,
              quantity: p.amount,
              unit_amount: { currency_code: "USD", value: p.price },
            };
          }),
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    // se ejecuta automáticamente al ser aprobada la compra
    console.log("---actions---> ", actions);
    // IMPORTANT: para que se cargue en nuestra db y se reset el carrito
    axios
      .post(`http://localhost:8001/electronic/cart/buy`, {
        userId: userId,
        cartCode: cartCode,
        total: total,
      })
      .then((products) => {
        console.log(products);
      });
    return actions.order.capture().then(function (details) {
      console.log("details -> ", details);
      setIsPaid(true);
    });
  };

  return (
    <div>
      {!check ? (
        <button onClick={()=> setCheck(true)}>
          <img
            src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/checkout-logo-medium.png"
            alt="paypal pay"
          ></img>
        </button>
      ) : (
        <PayPalButtons
          options={options}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      )}
      {isPaid ? (
        <h2 style={{ color: "green" }}>Pago procesado con éxito!</h2>
      ) : null}
    </div>
  );
}
```

- Asegúrate de reemplazar "YOUR_CLIENT_ID" con tu propio Client ID de PayPal. También puedes proporcionar otros parámetros opcionales, como el tipo de botón y la apariencia del botón.

---

# BACK - NODE integration PayPal

## 2

```javascript
const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", // Cambia a 'live' en producción
  client_id:
    "AdlXlGE1MvbMXzsWC_bTfdlgL5Yb104KWoc-zv53teX6UM2UQANZ1s-EJ0WuS-JuFFtB8io1dtWG_u9h",
  client_secret:
    "EJreDO5j5ZPyAgCHIBEFdC9EaMmn84Q1HdDQm5DNyXL27KvUIj7yX7VDo5J82RdcPzWJT0XaRgukQCC9",
});

const createPayment = (req, res) => {
  const { userId, total, cartCode, cartProducts } = req.body;
  const amounts = {};
  cartCode.map((p) => {
    amounts[p.productId] = p.amount;
  });
  // console.log(amounts)
  const descripcion = cartProducts.map((e) => e.title).toString();
  const products = cartProducts.map((product) => {
    product.amount = amounts[product.id];
    return product;
  });
  const payment = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:8001/electronic/paypal/payment-completed",
      cancel_url: "http://localhost:8001/electronic/paypal/payment-canceled",
    },
    transactions: [
      {
        amount: {
          total: total,
          currency: "USD",
        },
        description: descripcion,
        items: products.map((p) => {
            return {
              name: p.title,
              quantity: p.amount,
              unit_amount: { currency_code: "USD", value: p.price },
            };
          }),
        },
    ],
  };

  paypal.payment.create(payment, (error, paymentData) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
    } else {
      const { links } = paymentData;
      const approvalUrl = links.find(
        (link) => link.rel === "approval_url"
      ).href;
      // console.log("handle url aproved ", approvalUrl);
      res.json({ approvalUrl });
    }
  });
};

// Ruta para ejecutar un pago
const executePayment = (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const executePayment = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: "10.00",
        },
      },
    ],
  };

  paypal.payment.execute(paymentId, executePayment, (error, paymentData) => {
    if (error) {
      console.error(error);
      res.redirect("http://localhost:8001/electronic/paypal/payment-canceled");
    } else {
      // Pago completado exitosamente
      res.redirect("http://localhost:8001/electronic/paypal/payment-completed");
    }
  });
};

module.exports = {
  createPayment,
  executePayment,
};

```

- En el caso de implementar PayPal en el BACK, desde el FRONT ejecutamos solo un post:

```js
post("/create-payment");
```

Enviando los datos por body.

- Luego PayPal se encarga de ejecutar el get:

```js
get("/execute-payment");
```

Enviando por query el token de autenticación de usuario

# IMPORTANTE CONNECT FRONT -> BACK

En realidad, una petición a /api/paypal/webhook (o execute-payment) en el servidor de Express no se realiza desde el front-end de la aplicación. La petición es enviada por PayPal al servidor de Express a través de una notificación o webhook, que es una solicitud HTTP POST que contiene información sobre el estado del pago.

Por lo tanto, la petición a /api/paypal/webhook no se realiza desde el front-end, sino que es enviada por PayPal al servidor de Express como una notificación en respuesta a una transacción de pago.

---

## DOC OFICIAL

PayPal ofrece documentación oficial en su sitio web para ayudar a los desarrolladores a instalar y utilizar PayPal en sus aplicaciones y sitios web. Para acceder a la documentación oficial de PayPal, puedes seguir estos pasos:

1. Visita el sitio web de PayPal Developer: https://developer.paypal.com/

2. En el menú principal, busca y haz clic en la opción "Docs".

3. En la página de documentación, encontrarás diferentes categorías y guías relacionadas con los productos y servicios de PayPal. Busca la sección que se refiera a la integración de PayPal en tu aplicación o sitio web.

---

## DOC PayPal example single-page-app

https://developer.paypal.com/docs/multiparty/checkout/standard/customize/single-page-app/

## DOC VALIDATE

```js
fetch("/my-api/validate", {
  method: "post",
  headers: {
    "content-type": "application/json",
  },
})
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    // If there is a validation error, reject, otherwise resolve
    if (data.validationError) {
      document.querySelector("#error").classList.remove("hidden");
      return actions.reject();
    } else {
      return actions.resolve();
    }
  });
```

## DOC Handle funding failures

To handle this error, restart the payment in the onApprove function so the buyer can select a different payment option:

```js
paypal.Buttons({
  onApprove: function (data, actions) {
    return fetch('/my-server/capture-paypal-transaction', {
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        orderID: data.orderID
      })
    }).then(function(res) {
      return res.json();
    }).then(function(captureData) {
      if (captureData.error === 'INSTRUMENT_DECLINED'); // Your server response structure and key names are what you choose
        return actions.restart();
      }
    });
  }
}).render('#paypal-button-container');
```

---

# TEST desde la APP con un client que nos brinda PayPal

- Para probar cual cliente
  https://developer.paypal.com/dashboard/accounts

- Select: Business
  sb-0og43q26021217@business.example.com

- Ir a view/edit
- select copy pass: 1r@uA=Lf

Nos deslogeamos de PayPal e ingresamos con este user (client)
Así simulamos ser un cliente real!!!
