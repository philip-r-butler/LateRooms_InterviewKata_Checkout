/**
 * Created by mtlsspb4 on 14/06/2017.
 */
/*global lateRooms*/
(function (checkout) {
    "use strict";

    checkout.rules = (function () {

        return {
            fixedPrice: function (obj) {
                return obj.price * obj.count;
            },
            discountPriceWithOrderLimit: function (obj) {
                var countAtDiscountPrice;

                countAtDiscountPrice = (function (count, limit) {
                    if (limit && count) {
                        return Math.floor(count / limit) * limit;
                    } else {
                        return null;
                    }
                }(obj.count, obj.discountLimit));

                return (obj.count * obj.fullPrice) + (countAtDiscountPrice * (obj.discountPrice - obj.fullPrice));
            }
        };
    }());

}(lateRooms.kata.checkout));
