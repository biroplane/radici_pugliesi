// import { register } from '@shopify/web-pixels-extension'
const DEFAULT_BRAND = 'Radici Pugliesi'
export function useAnalytics() {
  if (import.meta.client && !window)
    throw new Error('Windows not found')

  // console.log("%cWindow", "color:lightblue;font-size:1.4rem", window);
  // window.dataLayer = window.dataLayer || [];
  const setupItems = (product: any) => {
    return [
      {
        item_id: product.id, // "SKU_12345",
        item_name: product.title, // "Stan and Friends Tee",
        affiliation: 'Website',

        // discount: 2.22,
        // index: 0,
        item_brand: DEFAULT_BRAND,
        // item_category: "Apparel",
        // item_category2: "Adult",
        // item_category3: "Shirts",
        // item_category4: "Crew",
        // item_category5: "Short sleeve",
        // item_list_id: "related_products",
        // item_list_name: "Related Products",
        // item_variant: "green",
        // location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
        price: product.price,
        currency: product.price,
        quantity: 1,
      },
    ]
  }

  const setEcommerce = (prod: any) => ({
    currency: 'EUR',
    value: prod.price,
    items: prod.items ?? setupItems(prod),
  })

  const addToCart = (product: any) => {
    window.dataLayer?.push({
      event: 'add_to_cart',
      ecommerce: setEcommerce(product),
    })
  }

  const viewPage = (page: any) => {
    // register((api) => {
    //   // api.analytics.subscribe('page_viewed', () => {
    //   //   console.log('[🛍️ SHOPIFY] -> Page viewed', 'background-color:#96BF47; color:white; font-size:2rem', api)
    //   // })
    // })
    window.dataLayer?.push({
      event: 'view_page',
      page_title: page.title,
      page_location: page.location,
    })
  }
  const viewItem = (product: any) => {
    console.log('View item', setEcommerce(product))
    window.dataLayer?.push({
      event: 'view_item',
      ecommerce: setEcommerce(product),
    })
  }
  // const selectItem = (product:any) => {
  //   const _e = setEcommerce(product)
  //   _
  // };
  // const removeFromCart = () => {};
  const viewCart = (cart: any) => {
    console.log('View cart', cart)
    window.dataLayer?.push({
      event: 'view_cart',
      ecommerce: {
        currency: cart.cost.totalAmount.currencyCode,
        value: cart.cost.totalAmount.amount,
        items: cart.lines.nodes.map((line: any) => ({
          item_id: line.merchandise.product.id,
          item_name: line.merchandise.product.title,
          item_brand: DEFAULT_BRAND,
          price: line.merchandise.priceV2.amount,
          quantity: line.merchandise.quantity,
        })),
      },
    })
    console.log('Show me the cart!', window.dataLayer)
  }
  const beginCheckout = (cart: any) => {
    console.log(
      '%cBEGIN CHECKOUT ',
      'background-color:white;color:tomato;font-size:3rem',
      cart,
    )
    window.dataLayer?.push({
      event: 'begin_checkout',
      ecommerce: {
        currency: cart.cost.totalAmount.currencyCode,
        value: cart.cost.totalAmount.amount,
        items: cart.lines.nodes.map((line: any) => ({
          item_id: line.merchandise.product.id,
          item_name: line.merchandise.product.title,
          item_brand: DEFAULT_BRAND,
          price: line.merchandise.priceV2.amount,
          quantity: line.merchandise.quantity,
        })),
      },
    })
  }
  const purchase = (cart: any) => {
    window?.dataLayer?.push({
      event: 'purchase',
      ecommerce: cart,
    })
    console.log('PURCHASE', cart)
    //  window?.fbq("track", "Purchase", { value: 0.0, currency: "EUR" });
    // register(({ analytics }) => {
    //   analytics.subscribe("checkout_completed", (event) => {
    //     const checkout = event.data.checkout;

    //     const checkoutTotalPrice = checkout.totalPrice.amount;

    //     const allDiscountCodes = checkout.discountApplications.map(
    //       (discount) => {
    //         if (discount.type === "DISCOUNT_CODE") {
    //           return discount.title;
    //         } else {
    //           return "";
    //         }
    //       }
    //     );
    //     const firstItem = checkout.lineItems[0];

    //     const firstItemDiscountedValue =
    //       firstItem.discountAllocations[0].amount;

    //     const customItemPayload = {
    //       quantity: firstItem.quantity,
    //       title: firstItem.title,
    //       discount: firstItemDiscountedValue,
    //     };

    //     const paymentTransactions = event.data.checkout.transactions.map(
    //       (transaction) => {
    //         return {
    //           paymentGateway: transaction.gateway,
    //           amount: transaction.amount,
    //         };
    //       }
    //     );

    //     const payload = {
    //       event_name: event.name,
    //       event_data: {
    //         totalPrice: checkoutTotalPrice,
    //         discountCodesUsed: allDiscountCodes,
    //         firstItem: customItemPayload,
    //         paymentTransactions,
    //       },
    //     };

    //     console.log("PURCHASE ", payload);
    //   });
    // });
  }

  const submitForm = (url: string) => {
    window.dataLayer?.push({
      event: 'form_submit',
      url,
    })
  }

  return {
    addToCart,
    viewItem,
    viewPage,
    // selectItem,
    // removeFromCart,
    viewCart,
    beginCheckout,
    purchase,
    submitForm,
  }
}

// const Shopify = {
//   checkout: {
//     created_at: "2024-01-23T23:34:32+01:00",
//     currency: "EUR",
//     customer_id: 6974992089385,
//     customer_locale: "it-IT",
//     email: "g.vallarelli@gmail.com",
//     location_id: null,
//     order_id: 5735731822889,
//     payment_due: "29.80",
//     payment_url: "https://deposit.us.shopifycs.com/sessions",
//     phone: null,
//     presentment_currency: "EUR",
//     reservation_time: null,
//     reservation_time_left: 0,
//     requires_shipping: true,
//     source_name: "web",
//     source_identifier: null,
//     source_url: null,
//     subtotal_price: "22.90",
//     taxes_included: true,
//     tax_exempt: false,
//     tax_lines: [],
//     token: "b2991a24425bf3e8df7194eb688b5ead",
//     total_price: "29.80",
//     total_price_set: {
//       shop_money: {
//         amount: "29.8",
//         currency_code: "EUR",
//       },
//       presentment_money: {
//         amount: "29.8",
//         currency_code: "EUR",
//       },
//     },
//     total_tax: "0.00",
//     updated_at: "2024-01-23T23:34:35+01:00",
//     version: "edge",
//     line_items: [
//       {
//         id: "f6cf9b01d5576595f70d0e9e49ea78a9",
//         key: "f6cf9b01d5576595f70d0e9e49ea78a9",
//         product_id: 8155313832233,
//         variant_id: 44581909233961,
//         sku: null,
//         vendor: "doncactus",
//         title: "Amore a prima spina",
//         variant_title: "Amore-a-prima-spina",
//         image_url:
//           "https://cdn.shopify.com/s/files/1/0728/0607/2617/files/Amorespinanew.jpg?v=1704727852",
//         taxable: false,
//         requires_shipping: true,
//         gift_card: false,
//         price: "22.90",
//         compare_at_price: null,
//         line_price: "22.90",
//         properties: {},
//         quantity: 1,
//         grams: 1500,
//         fulfillment_service: "manual",
//         applied_discounts: [],
//         discount_allocations: [],
//         tax_lines: [],
//       },
//     ],
//     gift_cards: [],
//     shipping_rate: {
//       handle: "shopify-Spedizione%20Nazionale-6.90",
//       price: "6.90",
//       title: "Spedizione Nazionale",
//       tax_lines: [],
//     },
//     shipping_address: {
//       id: null,
//       first_name: "Gaetano",
//       last_name: "Vallarelli",
//       phone: "+393477979762",
//       company: null,
//       address1: "Via Piscina Nuova, 39",
//       address2: null,
//       city: "Terlizzi",
//       province: "Bari",
//       province_code: "BA",
//       country: "Italy",
//       country_code: "IT",
//       zip: "70038",
//     },
//     credit_card: {
//       first_name: "Gaetano",
//       last_name: "Vallarelli",
//       first_digits: "424242",
//       last_digits: "4242",
//       brand: "visa",
//       expiry_month: 12,
//       expiry_year: 2031,
//       customer_id: null,
//     },
//     billing_address: {
//       id: null,
//       first_name: "Gaetano",
//       last_name: "Vallarelli",
//       phone: "+393477979762",
//       company: null,
//       address1: "Via Piscina Nuova, 39",
//       address2: null,
//       city: "Terlizzi",
//       province: "Bari",
//       province_code: "BA",
//       country: "Italy",
//       country_code: "IT",
//       zip: "70038",
//     },
//     discount: null,
//   },
// };

// SETTINGS => checkout
/*
<script>
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W8K76MDD');
window.dataLayer?.push({
      event: "purchase",
      ecommerce: {
        transaction_id: Shopify.checkout.order_id,
        value: Shopify.checkout.total_price,
        currency: Shopify.checkout.currency,
        items: Shopify.checkout.line_items.map((line) => ({
          item_id: line.product_id,
          item_name: line.title,
          affiliation: "Website",
          item_brand: "Don Cactus",
          item_variant: line.variant_id,
          price: line.price,
          quantity: line.quantity,
        })),
      },
    });
setTimeout(()=>{window.location="https://doncactus.it/thankyou?order_id="+Shopify.checkout.order_id},2000)
</script>

 */

/*
SETTINGS => Eventi del cliente

(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W8K76MDD');

analytics.subscribe("checkout_completed", event => {
  window.dataLayer.push({
    event:"purchase",
    order_id: event.data.checkout.order.id,
    price: event.data.checkout.totalPrice.amount,
    currency: event.data.checkout.totalPrice.currencyCode,
    ecommerce:{
      price: event.data.checkout.totalPrice.amount,
      currency: event.data.checkout.totalPrice.currencyCode,
      transaction_id:event.data.checkout.order.id,
    }
  })
});

analytics.subscribe("checkout_started",event=>{
  window.dataLayer.push({
    event: "begin_checkout",
    ecommerce:{
      currency: event.data.checkout.currencyCode,
      value: event.data.checkout.totalPrice.amount,
      items: event.data.checkout.lineItems.map(line=>({
        item_id: line.id ,
        item_name: line.title,
        affiliation: "Website",
        item_variant: line.variant.id,
        price: line.variant.price.amount,
        quantity: line.quantity
      }))
    }
  })
})

 */
