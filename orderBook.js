// The tests expects `reconcileOrder` function, we we have it named to match that expectation as set
// The tests pass in two values, existingBook and incomingOrder
//  - We can name these any names we would like here in the function declaration 
//  - We can use the same naming here for these parameter names that we see in the test 
function reconcileOrder (existingBook, incomingOrder) {
    // to support @test "adds an order to the book when the book is empty and thus cannot fulfill the order"
    if (existingBook.length === 0) {
        // if the book is empty we can exit quickly here without needed to run further logic
        const updatedBook = existingBook.concat({...incomingOrder})
        console.log({updatedBook})
        return updatedBook
    }

    // to support @test "adds an order to the book when the book has orders of the corresponding type (i.e. a sell with no buys)"
    // this means there can be orders to sell but there are no buyers so the order to sell gets put in the book for a later match when orders to buy come in
    const matchingTrades = existingBook.filter( function (existingOrder) { 
        const correspondingType = existingOrder.type !== incomingOrder.type
        const correspondingPrice = existingOrder.price === incomingOrder.price
        const correspondingQuantity = existingOrder.quantity === incomingOrder.quantity

        // we need the type match, the price match and the quantity to all match
        return correspondingType && correspondingPrice && correspondingQuantity
    } )

    /**
    
        You Have Options!

        Adding an item onto an array can be done at least 4 ways.

        Option A)

            The push() method is used to add one or multiple elements to the end of an array. It returns the new length of the array formed. An object can be inserted by passing the object as a parameter to this method. The object is hence added to the end of the array.

        Option B) 

            The splice method is used to both remove and add elements from a specific index. It takes 3 parameters, the starting index, the number of elements to delete and then the items to be added to the array. An object can only be added without deleting any other element by specifying the second parameter to 0.

            The object to be inserted is passed to the method and the index where it is to be inserted is specified. This inserts the object at the specified index.

        Option C)

            The unshift() method is used to add one or multiple elements to the beginning of an array. It returns the length of the new array formed. An object can be inserted by passing the object as a parameter to this method. The object is hence added to the beginning of the array.


        Option D)

            The concat() method is used to add one or multiple elements to the end of an array. It returns the new array. An object can be inserted by passing the object as a parameter to this method. The object is hence added to the end of the array.

     */

     // for @test to add on the order when there is not a match in the book:
     // if there is not something to exchange, we just put the incoming order into the book
    if (matchingTrades.length === 0) {
        const updatedBook = existingBook.concat(incomingOrder)
        console.log({updatedBook})
        return updatedBook
    }


    // debug to see what we have for matches
    console.log( {matchingTrades} )

}

module.exports = {
    reconcileOrder
}