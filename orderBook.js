function reconcileOrder(existingBook, incomingOrder) {
  // first thing we do is try to find a deal, if we find one
  // return the index of that order, if not then just combine
  // our orders together
  let dealFoundIndex = findDeal(existingBook, incomingOrder)

  // let's check our index, if it's less than 0 then we didnt find a deal
  // so simply concat our lists
  if (dealFoundIndex < 0) {
    // no deal found, concat our order into our book and return it
    return existingBook.concat({ ...incomingOrder })
  }

  // now let's make our deal using our indexed order and generate a new pending order
  const newOrder = makeDeal(existingBook[dealFoundIndex], incomingOrder)

  // now let's trim our existing order from the book, if the quantity isn't 0
  // it will be reinserted on the next recursion
  existingBook.splice(dealFoundIndex, 1)

  // now let's check if our order has any quantity, if it doesnt then we are done
  if (newOrder.quantity > 0) {
    // we still have some quantity left, so let's recall the function using our
    // new data causing a recursion that wont be stopped until the quantity is 0
    // or no deal is found on line 11
    return reconcileOrder(existingBook, newOrder)
  } else {
    // quantity is 0, we are done! no need to concat because it's not a valid order
    // just return our book which has been spliced of the order that was processed 
    return existingBook
  }
}


// our function which first finds a deal, and returns the index of that deal
function findDeal(existingBook, incomingOrder) {
  // we want to return the index of a deal by making a callback function
  // find index will cycle through each order until it finds one
  return existingBook.findIndex((existingOrder) => {
    // if our existingOrder type isn't the same
    // as our incoming order, then its a match
    // we also need to make sure the prices work
    // if both are true, return this order
    // this will then make the function return the index
    // if no order is found it will return -1
    return existingOrder.type !== incomingOrder.type && goodDeal(existingOrder, incomingOrder) === true
  })
}

// this function checks the prices to see if both sides benefit
function goodDeal(existingOrder, incomingOrder) {
  // let's check if the incoming order is a buy, if not then its a sell
  if (incomingOrder.type === 'buy') {
    // if the incoming order is a buy, we need to check if the price
    // of the existing order is >= to it
    return incomingOrder.price >= existingOrder.price
  } else {
    // if it's not a buy, it must be a sell, so now we want to check if
    // the existing order is <= to incoming order
    return incomingOrder.price <= existingOrder.price
  }
}

// this function makes a deal and returns our newOrder
function makeDeal(existingOrder, incomingOrder) {
  // let's see which order will be sent back depending on the quantity
  if (incomingOrder.quantity >= existingOrder.quantity) {
    // our incoming order has more quantity, so subtract the existing order from it
    // then return it as our newest order to be fulfilled
    incomingOrder.quantity -= existingOrder.quantity

    return { ...incomingOrder }
  } else {
    // now our incoming order has less quantity, so let's take its quantity from
    // our existing order then return it to be processed through
    existingOrder.quantity -= incomingOrder.quantity

    return { ...existingOrder }
  }
}

// export our module to tests and the front end
module.exports = reconcileOrder
