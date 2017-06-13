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

    checkout.order = (function () {

        var order;

        order = [];

        return {
            add: function (key) {
                order.push(key);
                checkout.billing.update();
            },
            removeLast: function () {
                order.pop();
                checkout.billing.update();
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
            clear: function () {
                order = [];
                checkout.billing.update();
            }
        };
    }());
}(lateRooms.kata.checkout));
