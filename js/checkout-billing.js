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
(function (checkout) {

    'use strict';

    checkout.billing = function (order, sku) {

        var bill, calculateBill;

        bill = 0;

        // This function could do with refactoring,
        // relies on fixed rule for discounts,
        // might be better to define rules in stock keeping units object literal as discount functions,
        calculateBill = function () {
            var key, skuUnits, result, itemCount, itemFullPrice, itemCountDiscountLimit, itemDiscountPrice, itemCountAtDiscountPrice, itemCountAtFullPrice;

            result   = 0;
            skuUnits = sku.get();

            for (key in skuUnits) {
                if (!skuUnits.hasOwnProperty(key)) {
                    continue;
                }
                itemCount                = order.countItem(key);
                itemFullPrice            = skuUnits[key].price;
                itemCountAtFullPrice     = 0;
                itemCountAtDiscountPrice = 0;
                itemCountDiscountLimit   = 0;
                itemDiscountPrice        = 0;

                if (skuUnits[key].hasOwnProperty('discount')) {
                    itemCountDiscountLimit   = skuUnits[key]['discount'].limit;
                    itemDiscountPrice        = skuUnits[key]['discount'].price();
                    itemCountAtDiscountPrice = Math.floor(itemCount / itemCountDiscountLimit) * itemCountDiscountLimit;
                }

                itemCountAtFullPrice = itemCount - itemCountAtDiscountPrice;
                result += (itemFullPrice * itemCountAtFullPrice) + (itemDiscountPrice * itemCountAtDiscountPrice);
            }
            // This rounds to two decimal places, need to refactor this
            return Math.round(result * 100) / 100;
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
        }
    }(checkout.order, checkout.stockKeepingUnits);
}(lateRooms.kata.checkout));
