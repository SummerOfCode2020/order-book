

function reconcileOrder(existingBook, incomingOrder) {
  // first check if a deal is possible if not, no need to run any code
  // just concat the orders using our function
  if (dealPossible(existingBook, incomingOrder) === false) {
    return concatOrders(existingBook, incomingOrder)
  }

  // if the dealPossible didn't eliminate the function, we have an order
  // so now createOrderBook and create our order book, then return it
  return createOrderBook(existingBook, incomingOrder)
}

// Function used to verify there's a possible deal in the first place
function dealPossible(existingBook, incomingOrder) {
  // first set a dealPossible variable to keep track of our loop results
  let dealPossible = false

  // Now create a loop going through each array inside existingBook object
  existingBook.forEach(existingOrder => {
    // Now we check if the existing order and incoming order types ever
    // differ, if so we have the possibility of an order so exit loop
    // and return true, if not return false
    if (existingOrder.type !== incomingOrder.type) {
      // we found types that are different, so we can maybe make a deal
      // First we have to make sure the prices match up
      if (priceCheck(existingOrder, incomingOrder) === true) {
        dealPossible = true
      }
    }
  })

  // now return our value which would only be changed if the loop detected
  // two types that are not the same
  return dealPossible
}

// Function used to combine the existing book and incoming order into order book
function concatOrders(existingBook, incomingOrder) {
  // set a temporary orderBook
  let orderBook = []

  orderBook.push(...existingBook)
  orderBook.push({ ...incomingOrder })

  return orderBook
}

// Function used to see if prices align in both interests
function priceCheck(existingOrder, incomingOrder) {
  // We want to see if when buying our price is greater than or equal too our price,
  if (incomingOrder.type === 'buy' && existingOrder.type === 'sell' && incomingOrder.price >= existingOrder.price &&
      incomingOrder.quantity !== 0 &&
    existingOrder.quantity !== 0) {
    return true
  }
  // and when selling our price is less than or equal to our price)
  if (incomingOrder.type === 'sell' && existingOrder.type === 'buy' && incomingOrder.price <= existingOrder.price &&
      incomingOrder.quantity !== 0 && existingOrder.quantity !== 0) {
    return true
  }

  // if nothing else was true, return false as we have no price match
  return false
}

// Function to find all deals and build the order book
function createOrderBook(existingBook, incomingOrder) {
  // declare our order array as a global variable so it can be accessed in the forLoop
  let orderToExecute = { ...incomingOrder }
  let oldBook = [...existingBook]


  // now create a loop that runs until we have exhausted all quantities of the incomingOrder
  // eslint-disable-next-line no-prototype-builtins
  while (orderToExecute.hasOwnProperty('type') === true) {
  // While we have an order we need to compare it to each existing order
    for (let i = 0; i < oldBook.length; i++) {
      // Let's see if an order is possible in this pair
      if (priceCheck(oldBook[i], orderToExecute) === true) {
      // A deal is possible so let's execute it, subtract the quantity from each other
        let quantity = Math.min(orderToExecute.quantity, oldBook[i].quantity)

        orderToExecute.quantity -= quantity
        oldBook[i].quantity -= quantity
        // now move our old order to the back of the book
        oldBook.push(...oldBook.splice(oldBook.indexOf(oldBook[i]), 1))
        // check if this depleted our quantity, if so delete our order
        if (orderToExecute.quantity === 0) {
        // if our quantity is 0, delete the object
          orderToExecute = {}
        }
      }
      if (oldBook[i].quantity === 0) {
        // if this sale made our quantity in the book 0, then delete this object from the array
        oldBook.splice(oldBook.indexOf(oldBook[i]), 1)

        // now check if an order is no longer possible
        // eslint-disable-next-line no-prototype-builtins
        if (!dealPossible(oldBook, orderToExecute) && orderToExecute.hasOwnProperty('type') === true) {
          // if not then push the order to the back of the book 
          oldBook.push(orderToExecute)
          orderToExecute = {}
        }
      }
    } }

  return oldBook
}

//
module.exports = reconcileOrder
