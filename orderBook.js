function reconcileOrder(existingBook, incomingOrder) {
    let updates = []
    let newOrders = []
  
    if (!existingBook.length) {
        updates.push(incomingOrder)
    
        return updates
      }
    
      for (let i = 0; i < existingBook.length; i++) {
        if (existingBook[i].type !== incomingOrder.type &&
            existingBook[i].price === incomingOrder.price &&
            existingBook[i].quantity === incomingOrder.quantity) {
            incomingOrder.price = -1

        } else if (existingBook[i].type !== incomingOrder.type &&
            existingBook[i].price === incomingOrder.price &&
            existingBook[i].quantity !== incomingOrder.quantity) {
                
                if (existingBook[i].quantity > incomingOrder.quantity) {
                    existingBook[i].quantity = existingBook[i].quantity - incomingOrder.quantity
                    incomingOrder.quantity = 0
                    newOrders.push(existingBook[i])

                } else {
                    incomingOrder.quantity = incomingOrder.quantity - existingBook[i].quantity
                  }
                } else {
                  updates.push(existingBook[i])
                }
              }
              if (incomingOrder.price !== -1 && incomingOrder.quantity !== 0) {
                updates.push(incomingOrder)
              }
            
              return updates.concat(newOrders)
            }
            
            module.exports = {reconcileOrder}
        