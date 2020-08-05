const existingBook = [{ type: 'buy', quantity: 10, price: 6150 }, { type: 'buy', quantity: 5, price: 6150 }, { type: 'sell', quantity: 12, price: 5950 }]
const incomingOrder = { type: 'sell', quantity: 15, price: 6150 }

function reconcileOrder(existingBook, incomingOrder) {
// I'll try and modularize my code out into different functions and then
// have this main function pull from them

let updatedBook = []

// If no entries in book, add incoming order
if (existingBook.length === 0) {
    updatedBook.push(incomingOrder)
    return updatedBook
} 

// If book only contains entries of matching type, add incoming order


// existingBook.splice(, 1)
// console.log(existingBook)

existingBook.forEach((entry, index) => {
    // if (entry.type === incomingOrder.type || entry.price !== incomingOrder.price) {
    //     existingBook.push(incomingOrder)
    // }
    if (entry.type !== incomingOrder.type && entry.price === incomingOrder.price && entry.quantity === incomingOrder.quantity) {
        existingBook.splice(index, 1)
        updatedBook = [ ...existingBook]
    }
    else if (entry.type !== incomingOrder.type && entry.price === incomingOrder.price && entry.quantity > incomingOrder.quantity) {
        let reducedEntry = entry
        reducedEntry.quantity = reducedEntry.quantity - incomingOrder.quantity
        existingBook.splice(index, 1)
        updatedBook = [ ...existingBook ]
        updatedBook.push(reducedEntry)
    }
    else if (entry.type !== incomingOrder.type && entry.price === incomingOrder.price && entry.quantity < incomingOrder.quantity) {
        let reducedOrder = {...incomingOrder}
        reducedOrder.quantity = reducedOrder.quantity - entry.quantity
        existingBook.splice(index, 1)
        updatedBook = [ ...existingBook ]
        updatedBook.push(reducedOrder)
    } 
    else {
        updatedBook = [ ...existingBook]
        updatedBook.push(incomingOrder)
    }
        
    
});

return updatedBook
}

console.log(reconcileOrder(existingBook, incomingOrder))

// All of my functions should take the same parameters
// function findDeal (existingBook, incomingOrder) {
// // We have a deal if the objects types are different
// // and the prices match
// }

module.exports = reconcileOrder