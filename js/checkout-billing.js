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

(function () {
    "use strict";
    var billing;

    billing = (function () {
        var bill;
        var charges;
        var calculateBill;

        bill = 0;
        charges = {};

        calculateBill = function () {
            var key;
            var result;
            result = 0;
            for (key in charges) {
                result += charges[key];
            }
            return result;
        };

        return {
            addCharge: function (key, value) {
                charges[key] = value;
                return this;
            },
            setCharges: function (obj) {
                charges = obj;
                return this;
            },
            get: function () {
                return bill;
            },
            update: function () {
                bill = calculateBill();
                return this;
            },
            clear: function () {
                bill = null;
                return this;
            }
        };
    }());

    if (typeof module === "undefined") {
        lateRooms.kata.checkout.billing = billing;
    } else {
        module.exports = billing;
    }

}());