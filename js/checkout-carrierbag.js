/**
 * Created by mtlsspb4 on 16/06/2017.
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
            if (bag.limit > 0) {
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

                return rules.carrierBagCharge(params);
            },
            clear: function () {
                bag = defBag;
            }
        };
    }(checkout.order, checkout.rules));
}(lateRooms.kata.checkout));