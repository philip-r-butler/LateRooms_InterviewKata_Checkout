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
(function (checkout) {

    'use strict';

    checkout.order = function () {

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
            countItem: function (item) {
                var i, result;
                i      = 0;
                result = 0;
                for (i; i < order.length; i += 1) {
                    if (order[i] == item) {
                        result += 1;
                    }
                }
                return result;
            },
            clear: function () {
                order = [];
                checkout.billing.update();
            }
        }
    }();
}(lateRooms.kata.checkout));
