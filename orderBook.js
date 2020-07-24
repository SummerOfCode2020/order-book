

function reconcileOrder(existingBook, incomingOrder) {
  let key = 'a'
  let i = -1

  const buyEqualOrder = order => order.type === 'buy' &&
    order.price >= incomingOrder.price

  const sellOrder = order => order.type === 'sell' && order.quantity >= incomingOrder.quantity &&
    order.price <= incomingOrder.price

  if (existingBook.length) {
    if (incomingOrder.type === 'buy') {
      i = existingBook.findIndex(sellOrder)
    }
    if (incomingOrder.type === 'sell') {
      i = existingBook.findIndex(buyEqualOrder)
    }
  }
  if (i >= 0 && incomingOrder.quantity <= existingBook[i].quantity) { key = 'b' }
  //if (i >= 0 && incomingOrder.quantity < existingBook[i].quantity) { key = 'b' }


  switch (key) {
    // adds an order to the book when the book is empty and thus cannot fulfill the order
    // adds an order to the book when the book has no orders of the corresponding type (i.e. a sell with 
    // no buys)
    // adds an order to the book when the book has a corresponding order type but it does not match'
    case 'a': existingBook.push(incomingOrder)

      return existingBook
    // fulfills an order and removes the matching order when the book contains a matching order of the 
    // same quantity
    // fulfills an order and reduces the matching order when the book contains a matching order of 
    // a larger quantity
    case 'b': existingBook[i].quantity -= incomingOrder.quantity
      if (existingBook[i].quantity > 0) {
        existingBook.push(existingBook.splice((i), 1)[0])
      }
      existingBook = existingBook.filter(orders => orders.quantity > 0)

      return existingBook
    // partially fulfills an order, removes the matching order and adds the remainder of the order 
    // to the book when the book contains a matching order of a smaller quantity
    case 'c': incomingOrder.quantity = incomingOrder.quantity - existingBook[i].quantity
      existingBook.push(incomingOrder)
      existingBook = existingBook.filter(orders => orders.quantity > 0)

      return existingBook

    default:
      break
  }
}
// console.log(reconcileOrder(existingBook, incomingOrder))
module.exports = reconcileOrder
