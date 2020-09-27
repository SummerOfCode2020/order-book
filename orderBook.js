function reconcileOrder(existingBook, incomingOrder) {
    let updatedBook = []
    let changedOrders = []

    for (let i = 0; i < existingBook.length; i++) {
        if (!existingBook.length) {
            updatedBook.push(incomingOrder)
            return updatedBook
        }
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