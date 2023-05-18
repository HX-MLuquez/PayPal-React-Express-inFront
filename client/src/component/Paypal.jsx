import React, { useEffect, useState } from "react";
import axios from "axios";

//----------------------------------- code PAYPAL ----------------------------------
// AdlXlGE1MvbMXzsWC_bTfdlgL5Yb104KWoc-zv53teX6UM2UQANZ1s-EJ0WuS-JuFFtB8io1dtWG_u9h
import { PayPalButtons } from "@paypal/react-paypal-js";
const initOptions = {
  "client-id":
    "AdlXlGE1MvbMXzsWC_bTfdlgL5Yb104KWoc-zv53teX6UM2UQANZ1s-EJ0WuS-JuFFtB8io1dtWG_u9h",
  currency: "USD",
};
//----------------------------------------------------------------------------------

export default function Paypal({ userId, total, cartCode, cartProducts }) {
  //---------------------------
  // *** PAYPAL INTEGRATION
  const [options, setOptions] = useState(initOptions);
  const [check, setCheck] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const createOrder = (data, actions) => {
    const amounts = {}; // {1: 2, 3, 4}
    cartCode.map((p) => {
      amounts[p.productId] = p.amount;
    });
    // console.log(amounts)
    const descripcion = cartProducts.map((e) => e.title).toString();
    // Moto3 Tablet4
    const products = cartProducts.map((product) => {
      product.amount = amounts[product.id];
      return product;
    }); // [{title:, amount}]
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: total,
            breakdown: {
              // este breakdown prop la aplicamos al utilizar items
              item_total: {
                currency_code: "USD",
                value: total,
              },
            },
          },
          descripcion: descripcion,
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
    console.log("---actions---> ", actions);
    axios
      .post(`http://localhost:8001/electronic/cart/buy`, {
        userId: userId,
        cartCode: cartCode,
        total: total,
      })
      .then((products) => {
        console.log(products);
      }); // reset update products   clean cart   crea o guarda la data en nuestra db
    // const urlAprov = actions.order.capture()
    return actions.order.capture().then(function (detail) {
      console.log("---detail---> ", detail);
      setIsPaid(true);
    });
  };

  return (
    <div>
      {!check ? (
        <button onClick={() => setCheck(true)}>
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

/*
# TEST desde la APP con un client que nos brinda PayPal

- Para probar pagos cual cliente
https://developer.paypal.com/dashboard/accounts

- Select: Business
sb-0og43q26021217@business.example.com

- Ir a view/edit
- select copy pass: 1r@uA=Lf

Para testear como llegan esos pagos vamos a:
https://www.sandbox.paypal.com que es similar a la oficial de paypal e ingresamos con los datos de user de test
*/

/*

El Detalle se puede ver al tocar sobre el valor Total en la esquina superior derecha
Tu carrito

1 APPLE IPHONE 13 PRO 512GB GREEN
$24,00
1 APPLE AIRPODS GENERACION 3 GEN
$46,00
Subtotal
$70,00
Total:
$70,00
*/
