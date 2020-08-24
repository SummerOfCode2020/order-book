
function reconcileOrder(existingBook, incomingOrder) {
  let updatedBook = []
  let newOrders = []

  // If the existingOrderBook is empty, add incomingOrder
  if (!existingBook.length) {
    let updatedBook = existingBook.concat({ ...incomingOrder })

    return updatedBook
  }

  // loop through the existingBook objects
  for (let i = 0; i < existingBook.length; i++) {
    // set variables to simplify reading
    const bookType = existingBook[i].type
    const bookPrice = existingBook[i].price
    const orderType = incomingOrder.type
    let orderPrice = incomingOrder.price
    let bookQuantity = existingBook[i].quantity
    let orderQuantity = incomingOrder.quantity

    // if buy and sell match (same price and quantity)
    if (bookType !== orderType &&
      bookPrice === orderPrice &&
      bookQuantity === orderQuantity) {
      // if all are true set incoming price to true
      incomingOrder.price = true
      // if buy and sell work, but quantities are different
    } else if (bookType !== orderType &&
      bookPrice === orderPrice &&
      bookQuantity !== orderQuantity) {
      // if existing book quantity is greater than incoming order quantity
      if (bookQuantity > orderQuantity) {
        //book quantity is equal to book quantity minus order quantity
        existingBook[i].quantity -= orderQuantity
        // set order quantity to false
        incomingOrder.quantity = false
        newOrders.push(existingBook[i])
      } else {
        //if existing book quantity is less than incoming order quantity
        incomingOrder.quantity -= bookQuantity
      }
    } else {
      // for other conditions push existingBook to the updatedBook
      updatedBook.push(existingBook[i])
    }
  }

  // and incoming order quantity is not 0 (also see above)
  // if the price of the incomingOrder is not true (see above)
  // push incoming order to updatedBook
  if (incomingOrder.quantity !== false &&
    incomingOrder.price !== true) {
    updatedBook.push(incomingOrder)
  }

  return updatedBook.concat(newOrders)
}

module.exports = reconcileOrder


