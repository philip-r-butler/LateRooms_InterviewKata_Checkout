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
(function (checkout) {

    "use strict";

    checkout.order = (function (sku, rules) {
        var order;
        var hasChargeRule;
        var hasDiscount;
        var hasDiscountLimit;
        var hasDiscountPrice;
        var getDiscountLimit;
        var getDiscountPrice;
        var getFullPrice;

        order = [];

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

        return {
            add: function (key) {
                order.push(key);
                checkout.billing.update();
                return this;
            },
            removeLast: function () {
                order.pop();
                checkout.billing.update();
                return this;
            },
            get: function () {
                return order;
            },
            getItem: function (index) {
                return order[index];
            },
            count: function () {
                return order.length;
            },
            countItem: function (key) {
                var result;
                result = 0;
                // Loop through order and count items that match item
                order.forEach(function (i) {
                    if (i === key) {
                        result += 1;
                    }
                });
                return result;
            },
            charge: function () {
                var key;
                var units;
                var unit;
                var unitCount;
                var params;
                var orderCharge;

                orderCharge = 0;
                units = sku.get();
                params = {};

                for (key in units) {
                    if (units.hasOwnProperty(key)) {
                        unit = units[key];
                        unitCount = this.countItem(key);

                        if (hasChargeRule(unit)) {
                            params = unit.rule.params;
                            params.count = unitCount;
                            orderCharge += unit.rule.func(params);
                        } else {
                            params.count = unitCount;
                            params.fullPrice = getFullPrice(unit);
                            params.discountPrice = getDiscountPrice(unit);
                            params.discountLimit = getDiscountLimit(unit);
                            orderCharge += rules.discountPriceWithOrderLimit(params);
                        }
                    }
                }
                return orderCharge;
            },
            clear: function () {
                order = [];
                checkout.billing.update();
                return this;
            }
        };
    }(checkout.stockKeepingUnits, checkout.rules));
}(lateRooms.kata.checkout));
