function reconcileOrder(existingBook, incomingOrder) {
  let updatedBook = []
  let changedOrders = []

  // checks to see if the existingOrderBook is empty; if so, add incomingOrder
  if (!existingBook.length) {
    updatedBook.push(incomingOrder)

    return updatedBook
  }

  // loop through the existingBook and check for conditions
  for (let i = 0; i < existingBook.length; i++) {
    // exact match condition (buy for a sell):
    if (existingBook[i].type !== incomingOrder.type &&
      existingBook[i].price === incomingOrder.price &&
      existingBook[i].quantity === incomingOrder.quantity) {
      incomingOrder.price = -1
      // transaction type match, but quantities are different
    } else if (existingBook[i].type !== incomingOrder.type &&
      existingBook[i].price === incomingOrder.price &&
      existingBook[i].quantity !== incomingOrder.quantity) {
      // two paths to follow depending on quantity differences:
      if (existingBook[i].quantity > incomingOrder.quantity) {
        existingBook[i].quantity = existingBook[i].quantity - incomingOrder.quantity
        incomingOrder.quantity = 0
        changedOrders.push(existingBook[i])
      } else {
        incomingOrder.quantity = incomingOrder.quantity - existingBook[i].quantity
      }
    } else {
      updatedBook.push(existingBook[i])
    }
  }
  if (incomingOrder.price !== -1 && incomingOrder.quantity !== 0) {
    updatedBook.push(incomingOrder)
  }

  return updatedBook.concat(changedOrders)
}

module.exports = {
  reconcileOrder
}

/*     (order) => {
      if (order.type === incomingOrder.type) {
        updatedBook.push(incomingOrder)
      }
      else {
        if (order.price !== incomingOrder.price) {
          updatedBook.push(incomingOrder)
        }

      } */

// })
