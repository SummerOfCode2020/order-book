function reconcileOrder(existingBook, incomingOrder) {
    let removed1 = []
    let removed2 = []
    let removed3 = []

// push an incoming order into the book when no entries exist

    if (!existingBook.length) {
        existingBook.push(incomingOrder)

        return existingBook
    }

    // we need to iterate over entries in the book for all other cases
    existingBook.forEach((entry, index) => {

        if (entry.type !== incomingOrder.type && entry.price === incomingOrder.price && entry.quantity >= incomingOrder.quantity) {
            entry.quantity = entry.quantity - incomingOrder.quantity
            incomingOrder.quantity = 0
            if (entry.quantity > 0) {
                removed1 = existingBook.splice(index, 1)
                existingBook.push(removed1[0])
            }
            console.log(existingBook)
        }

        if (entry.type !== incomingOrder.type && entry.price === incomingOrder.price && entry.quantity <= incomingOrder.quantity) {
            incomingOrder.quantity = incomingOrder.quantity - entry.quantity
            entry.quantity = 0
        }

    });

    existingBook = existingBook.filter(entry => entry.quantity !== 0)

    if (incomingOrder.quantity !== 0) {
        existingBook.push(incomingOrder)
    }

    return existingBook
}

console.log(reconcileOrder([{ type: 'buy', quantity: 10, price: 6150 }, { type: 'sell', quantity: 12, price: 6250 }], { type: 'sell', quantity: 10, price: 6150 }))

module.exports = reconcileOrder