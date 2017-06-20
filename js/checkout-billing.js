/**
 * Created by Phil Butler on 04/06/2017.
 *
 * checkout-billing.js - responsible for calculating the price of an order given items in an order and pricing defined in stock keeping units
 * including any applicable discount
 *
 * Uses module pattern to encapsulate code and reduce pollution of global namespace
 * Module also acts to decouple dependency between order and stock keeping units
 * Uses dependency injection to expose order and stock keeping unit methods
 **/
/*global lateRooms */
(function (checkout) {

    "use strict";

    checkout.billing = (function (order, bag) {

        var bill;
        var getOrderCharge;
        var getBagCharge;
        var getBill;

        bill = 0;

        getOrderCharge = function () {
            return order.charge();
        };

        getBagCharge = function () {
            return bag.charge();
        };

        getBill = function () {
            return getOrderCharge() + getBagCharge();
        };

        return {
            get: function () {
                return bill;
            },
            update: function () {
                bill = getBill();
            },
            clear: function () {
                bill = null;
            }
        };
    }(checkout.order, checkout.carrierBag));
}(lateRooms.kata.checkout));
