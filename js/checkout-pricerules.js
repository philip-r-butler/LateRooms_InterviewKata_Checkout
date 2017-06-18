/**
 * Created by mtlsspb4 on 14/06/2017.
 */
/*global lateRooms*/
(function (checkout) {
    "use strict";

    checkout.rules = (function (order) {

        var getOrderCount;

        getOrderCount = function (order) {
            return order.countItem(this.key);
        };

        return {
            fixedPrice: function () {
                return this.price;
            },
            discountWithOrderLimit: function (limit, price) {
                return limit * price * getOrderCount(order);
            }
        };
    }(checkout.order));

}(lateRooms.kata.checkout));
