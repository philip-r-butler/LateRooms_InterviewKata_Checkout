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

    'use strict';

    checkout.billing = function (order, sku) {

        var bill, calculateBill;

        bill = 0;

        function getOrderCount(order, key) {
            return order.countItem(key);
        }

        function hasDiscount(unit) {
            return unit.hasOwnProperty('discount');
        }

        function hasDiscountLimit(unit) {
            return hasDiscount(unit) && unit.discount.hasOwnProperty('limit');
        }

        function hasDiscountPrice(unit) {
            return hasDiscount(unit) && unit.discount.hasOwnProperty('price');
        }

        function getDiscountLimit(unit) {
            return hasDiscountLimit(unit) ? unit.discount.limit : null;
        }

        function getDiscountPrice(unit) {
            return hasDiscountPrice(unit) ? unit.discount.price() : null;
        }

        function getCountAtDiscountPrice(count, limit) {
            return limit && count ? Math.floor(count / limit) * limit : null;
        }

        function getFullPrice(unit) {
            return unit.price;
        }

        function getPrice(count, countAtDiscountPrice, fullPrice, discountPrice) {
            return ((count - countAtDiscountPrice) * fullPrice) + (countAtDiscountPrice * discountPrice);
        }

        // relies on fixed rule for discounts,
        // might be better to define rules in stock keeping units object literal as discount functions
        calculateBill = function () {
            var key, units, unit, result, unitCount;

            result = 0;
            units = sku.get();

            for (key in units) {
                if (!units.hasOwnProperty(key)) {
                    continue;
                }

                unit = units[key];
                unitCount = getOrderCount(order, key);

                result += getPrice(unitCount, getCountAtDiscountPrice(unitCount, getDiscountLimit(unit)), getFullPrice(unit), getDiscountPrice(unit));
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
    }(checkout.order, checkout.stockKeepingUnits);
}(lateRooms.kata.checkout));
