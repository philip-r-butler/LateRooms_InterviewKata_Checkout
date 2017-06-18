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

    checkout.billing = (function (order, sku, bag) {

        var bill;
        var calculateBill;
        var getOrderCount;
        var hasDiscount;
        var hasDiscountLimit;
        var hasDiscountPrice;
        var getDiscountLimit;
        var getDiscountPrice;
        var getCountAtDiscountPrice;
        var getFullPrice;
        var getPrice;

        bill = 0;

        getOrderCount = function (order, key) {
            return order.countItem(key);
        };

        hasDiscount = function (unit) {
            return unit.hasOwnProperty("discount");
        };

        hasDiscountLimit = function (unit) {
            return hasDiscount(unit) && unit.discount.hasOwnProperty("limit");
        };

        hasDiscountPrice = function (unit) {
            return hasDiscount(unit) && unit.discount.hasOwnProperty("price");
        };

        getDiscountLimit = function (unit) {
            if (hasDiscountLimit(unit)) {
                return unit.discount.limit;
            } else {
                return null;
            }
        };

        getDiscountPrice = function (unit) {
            if (hasDiscountPrice(unit)) {
                return unit.discount.price();
            } else {
                return null;
            }
        };

        getCountAtDiscountPrice = function (count, limit) {
            if (limit && count) {
                return Math.floor(count / limit) * limit;
            } else {
                return null;
            }
        };

        getFullPrice = function (unit) {
            return unit.price;
        };


        getPrice = function (count, countAtDiscountPrice, fullPrice, discountPrice) {
            return ((count - countAtDiscountPrice) * fullPrice) + (countAtDiscountPrice * discountPrice) + bag.charge();
        };

        // relies on fixed rule for discounts,
        // might be better to define rules in stock keeping units object literal as discount functions
        calculateBill = function () {
            var key;
            var units;
            var unit;
            var result;
            var unitCount;

            result = 0;
            units = sku.get();
            for (key in units) {
                if (units.hasOwnProperty(key)) {
                    unit = units[key];
                    unitCount = getOrderCount(order, key);

                    result += getPrice(unitCount, getCountAtDiscountPrice(unitCount, getDiscountLimit(unit)), getFullPrice(unit), getDiscountPrice(unit));
                }
            }
            return result;
        };

        return {
            get: function () {
                return bill;
            },
            update: function () {
                bill = calculateBill();
            },
            clear: function () {
                bill = 0;
            }
        };
    }(checkout.order, checkout.stockKeepingUnits, checkout.carrierBag));
}(lateRooms.kata.checkout));
