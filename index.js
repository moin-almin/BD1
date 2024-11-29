let express = require('express');
let cors = require('cors');


let app = express();
app.use(cors());
const port = 3000;

// Server-side values
let taxRate = 5; // 5%
let discountPercentage = 10; // 10%
let loyaltyRate = 2; // 2 points per $1

function calculateCartTotal(newItemPrice,cartTotal) {
  return cartTotal += newItemPrice;
}

function calculateMembershipDiscount(cartTotal, isMember) {
  if (isMember) {
    return (cartTotal - ((discountPercentage / 100) * cartTotal));
  } else {
    return cartTotal;
  }
}

function calculateTax(cartTotal) {
  return ((taxRate / 100) * cartTotal);
}

function calculateDeliveryTime(shippingMethod, distance) {
  if (shippingMethod === "standard") {
    return distance / 50;
  } else if (shippingMethod === 'express') {
    return distance / 100;
  }
}

function calculateShippingCost(weight, distance) {
  return weight * distance * 0.1;
}

function calculateLoyaltyPoints(purchaseAmount) {
  return purchaseAmount * loyaltyRate;
}

app.get("/cart-total", (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateCartTotal(newItemPrice,cartTotal).toString());
})

app.get("/membership-discount", (req,res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember  = req.query.isMember === "true";
  res.send((calculateMembershipDiscount(cartTotal, isMember)).toString());
})

app.get("/calculate-tax", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateTax(cartTotal).toString());
})

app.get("/estimate-delivery", (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance =  parseFloat(req.query.distance);
  res.send(calculateDeliveryTime(shippingMethod, distance).toString());
})

app.get("/shipping-cost", (req, res) => {
  let weight  = parseFloat(req.query.weight);
  let distance =  parseFloat(req.query.distance);
  res.send(calculateShippingCost(weight, distance).toString());
})

app.get("/loyalty-points", (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(calculateLoyaltyPoints(purchaseAmount).toString());
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
