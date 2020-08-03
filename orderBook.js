
function reconcileOrder(existingBook, incomingOrder) {
  let removed1 = []

  let removed3 = []

  if (!existingBook.length) {
    existingBook.push(incomingOrder)

    return existingBook
  }

  if (existingBook.length >= 1) {
    for (let i = 0; i < existingBook.length; i++) {
      if (existingBook[i].type === 'sell' && incomingOrder.type === 'buy' && incomingOrder.price >=
        existingBook[i].price && existingBook[i].quantity >= incomingOrder.quantity) {
        existingBook[i].quantity = existingBook[i].quantity - incomingOrder.quantity
        incomingOrder.quantity = 0
        if (existingBook[i].quantity > 0) {
          removed1 = existingBook.splice(i, 1)
          //console.log({removed1})
          existingBook.push(removed1[0])
          //console.log({existingBook})
        }
      }

      if (existingBook[i].type === 'sell' && incomingOrder.type === 'buy' && incomingOrder.price >=
        existingBook[i].price && incomingOrder.quantity > existingBook[i].quantity) {
        incomingOrder.quantity = incomingOrder.quantity - existingBook[i].quantity
        existingBook[i].quantity = 0
      }

      if (existingBook[i].type === 'buy' && incomingOrder.type === 'sell' && existingBook[i].price >=
        incomingOrder.price && existingBook[i].quantity <= incomingOrder.quantity) {
        incomingOrder.quantity = incomingOrder.quantity - existingBook[i].quantity
        existingBook[i].quantity = 0
      }

      if (existingBook[i].type === 'buy' && incomingOrder.type === 'sell' && existingBook[i].price >=
        incomingOrder.price && existingBook[i].quantity > incomingOrder.quantity) {
        existingBook[i].quantity = existingBook[i].quantity - incomingOrder.quantity

        incomingOrder.quantity = 0
        removed3 = existingBook.splice(i, 1)
        //console.log({removed3})
        //why was removed2 undefined? very strange, I had to change the name of this variable

        existingBook.push(removed3[0])

        //console.log(existingBook)

      }
    }
  }
  existingBook = existingBook.filter((order) => {
    return order.quantity !== 0
  })
  if (incomingOrder.quantity !== 0) {
    existingBook.push(incomingOrder)
  }

  return existingBook
}

module.exports = reconcileOrder

// let existing1 = [{ type: 'buy', quantity: 15, price: 6150 }, { type: 'sell', quantity: 12, price: 6950 }]
// let incoming1 = { type: 'sell', quantity: 10, price: 6150 }

//console.log(reconcileOrder(existing1, incoming1))
