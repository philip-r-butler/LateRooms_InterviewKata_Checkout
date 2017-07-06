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
        var orderItems;
        var units;
        var rules;
        var hasChargeRule;
        var hasDiscount;
        var hasDiscountLimit;
        var hasDiscountPrice;
        var getDiscountLimit;
        var getDiscountPrice;
        var getFullPrice;
        var countItems;
        var calculateUnitCharge;
        var calculateOrderCharge;

        units = {};
        rules = {};
        orderItems = [];

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

        countItems = function (key) {
            var result;
            result = 0;
            // Loop through order and count items that match item
            orderItems.forEach(function (i) {
                if (i === key) {
                    result += 1;
                }
            });
            return result;
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
            var key;
            var unit;
            var unitCount;
            var charge;

            charge = 0;

            for (key in units) {
                if (units.hasOwnProperty(key)) {
                    unit = units[key];
                    unitCount = countItems(key);
                    charge += calculateUnitCharge(unit, unitCount);
                }
            }

            return charge;
        };

        return {
            add: function (key) {
                orderItems.push(key);
                return this;
            },
            removeLast: function () {
                orderItems.pop();
                return this;
            },
            get: function () {
                return orderItems;
            },
            getItem: function (index) {
                return orderItems[index];
            },
            count: function () {
                return orderItems.length;
            },
            countItem: function (key) {
                return countItems(key);
            },
            charge: function () {
                return calculateOrderCharge();
            },
            clear: function () {
                orderItems = [];
                return this;
            },
            setUnits: function (obj) {
                units = obj;
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


// (function () {
//
//     "use strict";
//     var order;
//     var stockKeepingUnits;
//     var rules;
//     var billing;
//
//     stockKeepingUnits = require("./checkout-stockkeepingunits");
//     rules = require("./checkout-chargerules");
//     billing = require("./checkout-billing");
//
//     order = (function (sku, rules) {
//         var orderItems;
//         var hasChargeRule;
//         var hasDiscount;
//         var hasDiscountLimit;
//         var hasDiscountPrice;
//         var getDiscountLimit;
//         var getDiscountPrice;
//         var getFullPrice;
//         var calculateCharge;
//
//         orderItems = [];
//
//         hasChargeRule = function (unit) {
//             return unit.hasOwnProperty("rule");
//         };
//
//         hasDiscount = function (unit) {
//             return unit.hasOwnProperty("discount");
//         };
//
//         hasDiscountLimit = function (unit) {
//             return hasDiscount(unit) && unit.discount.hasOwnProperty("limit");
//         };
//
//         hasDiscountPrice = function (unit) {
//             return hasDiscount(unit) && unit.discount.hasOwnProperty("price");
//         };
//
//         getDiscountLimit = function (unit) {
//             if (hasDiscountLimit(unit)) {
//                 return unit.discount.limit;
//             } else {
//                 return null;
//             }
//         };
//
//         getDiscountPrice = function (unit) {
//             if (hasDiscountPrice(unit)) {
//                 return unit.discount.price();
//             } else {
//                 return null;
//             }
//         };
//
//         getFullPrice = function (unit) {
//             return unit.price;
//         };
//
//         calculateCharge = function (unit, num) {
//             var params;
//
//             params = {};
//
//             if (hasChargeRule(unit)) {
//                 params = unit.rule.params;
//                 params.count = num;
//                 return unit.rule.func(params);
//             } else {
//                 params.count = num;
//                 params.fullPrice = getFullPrice(unit);
//                 params.discountPrice = getDiscountPrice(unit);
//                 params.discountLimit = getDiscountLimit(unit);
//                 return rules.discountPriceWithOrderLimit(params);
//             }
//         };
//
//         return {
//             add: function (key) {
//                 orderItems.push(key);
//                 billing.update();
//                 return this;
//             },
//             removeLast: function () {
//                 orderItems.pop();
//                 billing.update();
//                 return this;
//             },
//             get: function () {
//                 return orderItems;
//             },
//             getItem: function (index) {
//                 return orderItems[index];
//             },
//             count: function () {
//                 return orderItems.length;
//             },
//             countItem: function (key) {
//                 var result;
//                 result = 0;
//                 // Loop through order and count items that match item
//                 orderItems.forEach(function (i) {
//                     if (i === key) {
//                         result += 1;
//                     }
//                 });
//                 return result;
//             },
//             charge: function () {
//                 var key;
//                 var units;
//                 var unit;
//                 var unitCount;
//                 var charge;
//
//                 charge = 0;
//                 units = sku.get();
//
//                 for (key in units) {
//                     if (units.hasOwnProperty(key)) {
//                         unit = units[key];
//                         unitCount = this.countItem(key);
//                         charge += calculateCharge(unit, unitCount);
//                     }
//                 }
//                 return charge;
//             },
//             clear: function () {
//                 orderItems = [];
//                 billing.update();
//                 return this;
//             }
//         };
//     }(stockKeepingUnits, rules));
//
//     module.exports = order;
//
// }());