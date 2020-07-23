const existingBook = [{ type: 'buy', quantity: 10, price: 6150 }, { type: 'sell', quantity: 12, price: 5950 }]
const incomingOrder = { type: 'sell', quantity: 15, price: 6150 }
reconcileOrder = (existingBook, incomingOrder) => {
  const buyOrder = (order) => order.type === 'buy' && order.price <= incomingOrder.price;

  const sellOrder = (order) => order.type === 'sell' && order.quantity >= incomingOrder.quantity && order.price <= incomingOrder.price;

  if (incomingOrder.type === 'buy') {
    let i = existingBook.findIndex(sellOrder)
    if (i >= 0) {
      existingBook[i].quantity -= incomingOrder.quantity
      if (existingBook[i].quantity > 0) {
        existingBook.push(existingBook.splice((i), 1)[0])
      }
      existingBook = existingBook.filter(orders => orders.quantity > 0)
    }
    else { existingBook.push(incomingOrder) }
  }
  if (incomingOrder.type === 'sell') {

    let i = existingBook.findIndex(buyOrder)

    if (i >= 0) {
      existingBook[i].quantity -= incomingOrder.quantity
      if (incomingOrder.quantity > existingBook[i].quantity) {
        incomingOrder.quantity = incomingOrder.quantity - existingBook[i].quantity
        existingBook.push(incomingOrder)
      }
      if (existingBook[i].quantity > 0) {
        existingBook.push(existingBook.splice((i), 1)[0])
      }

      existingBook = existingBook.filter(orders => orders.quantity > 0)
    }
    else {
      existingBook.push(incomingOrder)
    }
  }
  return existingBook
}
console.log(reconcileOrder(existingBook, incomingOrder))
module.exports = reconcileOrder
