/**
 * Created by mtlsspb4 on 14/06/2017.
 */
/*global lateRooms*/
(function () {
    "use strict";

    var chargeRules;

    chargeRules = (function () {
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
            },
            carrierBagCharge: function (obj) {
                return obj.numberOfBags * obj.chargePerBag;
            }
        };
    }());

    if (typeof module === "undefined") {
        lateRooms.kata.checkout.chargeRules = chargeRules;
    } else {
        module.exports = chargeRules;
    }

}());