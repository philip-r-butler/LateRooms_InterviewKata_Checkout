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

    checkout.order = (function () {

        var orders;

        orders = [];

        return {
            add: function (key) {
            },
            removeLast: function () {
            },
            count: function () {
                return 1;
            }
        }
    }());

}(lateRooms.kata.checkout));
