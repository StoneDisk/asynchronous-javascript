alert("Some message will appear after some time.");
setTimeout(() => console.log("Boom!"), 3000);
setInterval(() => console.log("Pull up!"), 2000);

// callbacks
function showMeCalculations(callback1, callback2) {
   let perimeter = callback1(12, 20, 6);
   let area_rectangle = callback2(9, 2);
   console.log("Perimeter: ", perimeter);
   console.log("Area of given rectangle: ", area_rectangle); 
}

function calculatePerimeterPolygon(...sides) {
    let perimeter = 0;

    for (const side of sides) {
        perimeter += side;
    }

    return perimeter;
}

function calculateAreaRectangle(width, length) {
    return width * length;
}

// showMeCalculations(calculatePerimeterPolygon, calculateAreaRectangle);

// Simple Promises Example

function loadAFile() {
    const fileOperationResult = new Promise((resolve, reject) => {
      let fileLoaded = true;

      if (fileLoaded) {
        resolve("File loaded succesfully");
      } else {
        reject("File loading operation failed.");
      }
    });

    fileOperationResult.then(value => console.log(value))
                       .catch(value => console.log(value))
                       .finally(() => console.log("File operation has finished its task."));
} 


// loadAFile();


// Simple Promises Example 2

function loadAFile2() {
  let fileLoaded = false;

  if (fileLoaded) {
    return Promise.resolve("File loaded succesfully.");
  } else {
    return Promise.reject("File loading operation failed.");
  }
} 


/* 
loadAFile2().then(value => console.log(value))
            .catch(value => console.log(value))
            .finally(() => console.log("File operation has finished its task.")); 
*/

// Using async keyword to force a function to return a promise

async function loadAFile3() {
  let fileLoaded = false;

  if (fileLoaded) {
    return "File loaded succesfully.";
  } else {
    throw "File loading operation failed.";
  }
} 

/* 
loadAFile3().then(value => console.log(value))
            .catch(value => console.log(value))
            .finally(() => console.log("File operation has finished its task."));
*/


// using async keyword in combination with await keyword that makes an 
// async function wait for a promise to get settled before proceeding with
// execution

async function startFileOperation() {
  try {
    let message = await loadAFile3();
    console.log(message);
  } catch (error) {
    console.log(error);
  }
}

// startFileOperation().finally(() => console.log("File operation has finished its task."));


// Advanced Promises Example
/*
    In this example we will simulate the process of an ice cream
    shop. Here are the following steps:

    1. Open the ice cream shop at 7:00 am
    2. Place Order
    3. Cut the fruit
    4. Add water and ice
    5. Start the machine
    6. Select the container
    7. Select the toppings
    8. Serve ice cream
    9. Close shop at 10:00 pm
 */


function operateIceCreamShop() {
  let stocks = {
    fruits: ["mango", "banana", "lanka", "durian", "guyabano"],
    liquid: ["water", "ice"],
    holder: ["cone", "cup", "stick"],
    toppings: ["chocolate", "peanuts", "cheese"],
  };

  let is_stock_available = true;

  let order = (work, time) => {
    return new Promise((resolve, reject) => {
      if (is_stock_available) {
        setTimeout(() => {
            resolve(work());
        }, time);
      } else {
        reject(console.log("Stocks have run out!"));
      }
    });
  };

  order(() => console.log(`Selected fruit: ${stocks.fruits[2]}`), 2000)
  .then(() => {
    return order(() => console.log("Production has started!"), 0000);
  })
  .then(() => {
    return order(() => console.log(`Here is the chopped ${stocks.fruits[2]}`), 2000);
  })
  .then(() => {
    return order(() => {
      console.log(`${stocks.fruits[2]} will be mixed with ${stocks.liquid[0]} and ${stocks.liquid[1]}.`);
    }, 1000);
  })
  .then(() => {
    return order(() => console.log("Starting the machine."), 1000);
  })
  .then(() => {
    return order(() => console.log(`Ice cream is being poured on ${stocks.holder[0]}.`), 2000);
  })
  .then(() => {
    return order(() => console.log(`Ice cream is sprinkled with ${stocks.toppings[2]}.`), 3000);
  })
  .then(() => {
    return order(() => console.log(`Ice cream is now served.`), 1000);
  })
  .catch(() => {
    console.log("Cannot make ice cream.");
  })
  .finally(() => console.log("It's already 10:00 pm. Shop is closing."));
} 


// operateIceCreamShop();

// Ice cream shop process async await version

function operateIceCreamShop2() {
  let stocks = {
    fruits: ["mango", "banana", "lanka", "durian", "guyabano"],
    liquid: ["water", "ice"],
    holder: ["cone", "cup", "stick"],
    toppings: ["chocolate", "peanuts", "cheese"],
  };

  let is_stock_available = false;

  function time(milliseconds) {
    return new Promise((resolve, reject) => {
      if (is_stock_available) {
        setTimeout(resolve, milliseconds);
      } else {
        reject(console.log("Stocks have ran out!"));
      }
    });
  }

  async function kitchen() {
    try {
      await time(2000);
      console.log(`Selected fruit: ${stocks.fruits[2]}`);

      await time(1000);
      console.log("Production has started!");

      await time(2000);
      console.log(`Here is the chopped ${stocks.fruits[2]}`);

      await time(1000);
      console.log(`${stocks.fruits[2]} will be mixed with ${stocks.liquid[0]} and ${stocks.liquid[1]}.`);

      await time(1000);
      console.log("Starting the machine.");

      await time(2000);
      console.log(`Ice cream is being poured on ${stocks.holder[0]}.`);

      await time(3000);
      console.log(`Ice cream is sprinkled with ${stocks.toppings[2]}.`);

      await time(1000);
      console.log(`Ice cream is now served.`);
    } catch (error) {
      console.log("Sorry. Cannot make ice cream :(", error);
    }
    finally {
      console.log("It's already 10:00 pm. Shop is closing.");
    }  
  }

  kitchen();
}

// operateIceCreamShop2();