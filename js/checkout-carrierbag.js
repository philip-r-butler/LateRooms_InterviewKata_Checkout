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
(function () {
    "use strict";
    var carrierBag;

    carrierBag = (function () {
        var defBag;
        var rule;
        var order;
        var bag;
        var calculateNumberOfBags;
        var calculateBagCharge;
        var charge;

        defBag = {
            price: 0,
            limit: 0
        };
        bag = defBag;

        calculateNumberOfBags = function () {
            // Returns the number of bags required by a particular order, dependent of bag.limit
            if (bag.limit > 0) {
                // Calculate the upper integer of the quotient, order count / bag limit
                return Math.ceil(order.count() / bag.limit);
            } else {
                return 0;
            }
        };

        calculateBagCharge = function () {
            var params;

            params = {};
            params.numberOfBags = calculateNumberOfBags();
            params.chargePerBag = bag.price;
            // Uses returned carrier bag charge rule, carrierBagcharge, as defined in checkout-chargerules.js
            return rule(params);
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
                return this;
            },
            get: function () {
                return bag;
            },
            setOrder: function (obj) {
                order = obj;
                return this;
            },
            setChargeRule: function (obj) {
                rule = obj;
                return this;
            },
            count: function () {
                return calculateNumberOfBags();
            },
            charge: function () {
                return charge;
            },
            clear: function () {
                bag = defBag;
                return this;
            },
            update: function () {
                charge = calculateBagCharge();
                return this;
            }
        };
    }());

    if (typeof module === "undefined") {
        lateRooms.kata.checkout.carrierBag = carrierBag;
    } else {
        module.exports = carrierBag;
    }

}());