/**
 * Created by Phil Butler on 16/06/2017.
 *
 * checkout-carrierbag.js - responsible for managing carrier bags,
 * a carrier bag is required to fulfill an order,
 * the number of carrier bags is dependent on the size of the order and the limit number of items a bag can carry
 *
 * Uses module pattern to encapsulate code and reduce pollution of global namespace
 */
/*global lateRooms*/
(function (checkout) {
    "use strict";
    checkout.carrierBag = (function (order, rules) {

        var defBag;
        var bag;
        var numberOfBags;

        defBag = {
            price: 0,
            limit: 0
        };
        bag = defBag;

        numberOfBags = function () {
            // Returns the number of bags required by a particular order, dependent of bag.limit
            if (bag.limit > 0) {
                // Calculate the upper integer of the quotient, order count / bag limit
                return Math.ceil(order.count() / bag.limit);
            } else {
                return 0;
            }
        };

        return {
            set: function (settings) {
                bag = settings;
                if (!bag.price) {
                    bag.price = 0;
                }
                if (!bag.limit) {
                    bag.limit = 0;
                }
            },
            get: function () {
                return bag;
            },
            count: function () {
                return numberOfBags();
            },
            charge: function () {
                var params;

                params = {};
                params.numberOfBags = numberOfBags();
                params.chargePerBag = bag.price;
                // Uses returned charge rule, carrierBagcharge, as defined in checkout-chargerules.js
                return rules.carrierBagCharge(params);
            },
            clear: function () {
                bag = defBag;
            }
        };
    }(checkout.order, checkout.rules));
}(lateRooms.kata.checkout));