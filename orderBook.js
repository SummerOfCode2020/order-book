
function reconcileOrder(existingBook, incomingOrder) {
  // default switch case key
  let key = 'a'
  // matching order index variable
  let i = -1
  // callback function for findIndex method which sets conditions for matching orders in existing book
  const buyEqualOrder = order => order.type === 'buy' &&
    order.price >= incomingOrder.price

  const sellOrder = order => order.type === 'sell' && order.quantity >= incomingOrder.quantity &&
    order.price <= incomingOrder.price
  // Finds matching order index in existing book

  if (existingBook.length) {
    if (incomingOrder.type === 'buy') {
      i = existingBook.findIndex(sellOrder)
    }
    if (incomingOrder.type === 'sell') {
      i = existingBook.findIndex(buyEqualOrder)
    }
  }
  // switches handling of orders in special scenarios
  if (i >= 0 && incomingOrder.quantity <= existingBook[i].quantity) { key = 'b' }
  if (i >= 0 && incomingOrder.quantity > existingBook[i].quantity) { key = 'c' }

  switch (key) {
    // adds an order to the book when the book is empty, or no matching order
    case 'a': existingBook.push(incomingOrder)

      return existingBook
    // fulfills an order and removes matching order with same quantity, or reduces when larger quantity
    case 'b': existingBook[i].quantity -= incomingOrder.quantity
      if (existingBook[i].quantity > 0) {
        existingBook.push(existingBook.splice((i), 1)[0])
      }
      existingBook = existingBook.filter(orders => orders.quantity > 0)

      return existingBook
    // all the rest of the special cases (uses recursion to fullfill order with to existing orders)
    case 'c': incomingOrder.quantity = incomingOrder.quantity - existingBook[i].quantity
      existingBook[i].quantity = 0
      existingBook = existingBook.filter(orders => orders.quantity > 0)
      if (existingBook.findIndex(buyEqualOrder) >= 0) {
        existingBook = reconcileOrder(existingBook, incomingOrder)
      }
      else {
        existingBook.push(incomingOrder)
      }

      return existingBook
  }
}
// console.log(reconcileOrder(existingBook, incomingOrder))
module.exports = reconcileOrder
