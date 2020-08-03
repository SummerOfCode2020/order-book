// The tests expects `reconcileOrder` function, we we have it named to match that expectation as set
// The tests pass in two values, existingBook and incomingOrder
//  - We can name these any names we would like here in the function declaration 
//  - We can use the same naming here for these parameter names that we see in the test 
function reconcileOrder (existingBook, incomingOrder) {
    // to support @test "adds an order to the book when the book is empty and thus cannot fulfill the order"
    if (existingBook.length === 0) {
        // if the book is empty we can exit quickly here without needed to run further logic
        return existingBook.concat({...incomingOrder})
    }

}

module.exports = {
    reconcileOrder
}