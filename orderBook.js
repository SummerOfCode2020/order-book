function reconcileOrder(existingBook, incomingOrder) {
  let updatedBook = []
  let newOrders = []

  if (!existingBook.length) {
    let updatedBook = existingBook.concat({ ...incomingOrder })

    return updatedBook
  }

  for (let i = 0; i < existingBook.length; i++) {
    const bookType = existingBook[i].type
    const bookPrice = existingBook[i].price
    const orderType = incomingOrder.type
    let orderPrice = incomingOrder.price
    let bookQuantity = existingBook[i].quantity
    let orderQuantity = incomingOrder.quantity

    if (bookType !== orderType &&
        bookPrice === orderPrice &&
        bookQuantity === orderQuantity) {
      incomingOrder.price = true
    } else if (bookType !== orderType &&
        bookPrice === orderPrice &&
        bookQuantity !== orderQuantity) {
      if (bookQuantity > orderQuantity) {
        existingBook[i].quantity -= orderQuantity
        incomingOrder.quantity = false
        newOrders.push(existingBook[i])
      } else {
        incomingOrder.quantity -= bookQuantity
      }
    } else {
      updatedBook.push(existingBook[i])
    }
  }
  if (incomingOrder.quantity !== false &&
      incomingOrder.price !== true) {
    updatedBook.push(incomingOrder)
  }

  return updatedBook.concat(newOrders)
}

module.exports = reconcileOrder

