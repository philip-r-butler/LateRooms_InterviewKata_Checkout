# Test description
## Laterooms Kata - Checkout

Implement the code for a checkout system that handles pricing schemes such as "pineapples cost 50, three pineapples cost 130."

Implement the code for a supermarket checkout that calculates the total price of a number of items. In a normal supermarket, things are identified using Stock Keeping Units, or SKUs. In our store, we’ll use individual letters of the alphabet (A, B, C, and so on). Our goods are priced individually. In addition, some items are multi-priced: buy n of them, and they’ll cost you y pence. For example, item A might cost 50 individually, but this week we have a special offer: buy three As and they’ll cost you 130. In fact the prices are:

| SKU  | Unit Price | Special Price |
| ---- | ---------- | ------------- |
| A    | 50         | 3 for 130     |
| B    | 30         | 2 for 45      |
| C    | 20         |               |
| D    | 15         |               |

The checkout accepts items in any order, so that if we scan a B, an A, and another B, we’ll recognize the two Bs and price them at 45 (for a total price so far of 95). **The pricing changes frequently, so pricing should be independent of the checkout.**

The interface to the checkout could look like:

```cs
interface ICheckout
{
    void Scan(string item);
    int GetTotalPrice();
}
```

# Solution notes
## Design decisions
* Example code  in test suggested using Java or C#.
* I decided to use Javascript instead of Java or C# because I have a pre-configured development environment for this language.
* Created four javascript modules,
  * checkout-app.js - defines and initialises application object literal
  * checkout-order.js - responsible for managing orders i.e. a series of scanned stock units, with price to be paid (including any applicable discount)
  * checkout-billing.js - responsible for calculating the price of a selected stock unit given order details and any discount details for the stock unit
  * checkout-stockkeepingunits.js - responsible for managing stock keeping units i.e. stock items, normal and discount price rules
* Provided index.html to demonstrate usage
## Development/testing environment
* Used JetBrains WebStorm IDE. I used version 2017.1.
* Used Karma test runner, for general installation and configuration see https://karma-runner.github.io/, for installation using Webstorm see https://blog.jetbrains.com/webstorm/2013/10/running-javascript-tests-with-karma-in-webstorm-7/
* Used Jasmine testing framework, for general installation and configuration see https://github.com/jasmine/jasmine, for installation using Webstorm see https://stackoverflow.com/questions/8108461/how-can-i-get-webstorm-to-recognize-jasmine-methods
* Tested using PhamtonJS (see http://phantomjs.org/) and Chrome.
* Unit tests are located in the folder /tests/unit
## Example usage
* Checkout solution from https://github.com/philip-r-butler/LateRooms_InterviewKata_Checkout.git
* Load index.html into browser for examples of us
## Todo
* Refactor calculateBill() and move definition of discount functions into stock keeping units
* Optimise calculateBill() so does not need to loop entire stock keeping units
* Provide examples of running tests outside of Webstorm