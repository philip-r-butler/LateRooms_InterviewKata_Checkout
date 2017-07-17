/**
 * Created by Phil Butler on 04/06/2017.
 *
 * checkout-order.js - responsible for managing orders,
 * an order is a series of stock keeping units,
 * the order object includes the price paid for each stoke unit (including any discount)
 *
 * Uses module pattern to encapsulate code and reduce pollution of global namespace
 * Uses Facade Design Pattern to provide simple interface for other objects to interact with an order
 **/
/*global lateRooms */
(function () {
    "use strict";
    var order;

    order = (function () {
        var sku;
        var units;
        var rules;
        var hasKey;
        var hasChargeRule;
        var hasDiscount;
        var hasDiscountLimit;
        var hasDiscountPrice;
        var getDiscountLimit;
        var getDiscountPrice;
        var getFullPrice;
        var calculateUnitCharge;
        var calculateOrderCharge;

        sku = {};
        units = {};
        rules = {};

        hasKey = function (key) {
            return units.hasOwnProperty(key);
        };

        hasChargeRule = function (unit) {
            return unit.hasOwnProperty("rule");
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

        getFullPrice = function (unit) {
            return unit.price;
        };

        calculateUnitCharge = function (unit, num) {
            var params;

            params = {};

            if (hasChargeRule(unit)) {
                params = unit.rule.params;
                params.count = num;
                return unit.rule.func(params);
            } else {
                params.count = num;
                params.fullPrice = getFullPrice(unit);
                params.discountPrice = getDiscountPrice(unit);
                params.discountLimit = getDiscountLimit(unit);
                return rules.discountPriceWithOrderLimit(params);
            }
        };

        calculateOrderCharge = function () {
            var charge;

            charge = 0;

            Object.keys(units).forEach(function (key) {
                charge += calculateUnitCharge(sku[key], units[key]);
            });

            return charge;
        };

        return {
            add: function (key) {
                if (hasKey(key)) {
                    units[key] += 1;
                } else {
                    units[key] = 1;
                }
                return this;
            },
            remove: function (key) {
                if (hasKey(key) && units[key] > 1) {
                    units[key] -= 1;
                } else {
                    delete units[key];
                }
                return this;
            },
            get: function () {
                return units;
            },
            getItem: function (key) {
                return units[key];
            },
            count: function () {
                var num;

                num = 0;

                Object.keys(units).forEach(function (key) {
                    num += units[key];
                });

                return num;
            },
            countItem: function (key) {
                return units[key];
            },
            charge: function () {
                return calculateOrderCharge();
            },
            clear: function () {
                units = {};
                return this;
            },
            setSKU: function (obj) {
                sku = obj;
                return this;
            },
            setRules: function (obj) {
                rules = obj;
                return this;
            }
        };
    }());

    if (typeof module === "undefined") {
        lateRooms.kata.checkout.order = order;
    } else {
        module.exports = order;
    }

}());