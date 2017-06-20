/**
 * Created by Phil Butler on 04/06/2017.
 *
 * checkout-stockkeepingunits.js - responsible for managing stock keeping units,
 * a set of stock items with price details and discount pricing rules
 *
 * Uses module pattern to encapsulate code and not pollute global namespace
 **/
/*global lateRooms */
(function (checkout) {

    "use strict";

    checkout.stockKeepingUnits = (function () {
        var units;
        units = {};

        return {
            set: function (obj) {
                units = obj;
                checkout.billing.update();
            },
            get: function () {
                return units;
            },
            addUnit: function (key, obj) {
                units[key] = obj;
                checkout.billing.update();
            },
            setUnitProperty: function (key, property, value) {
                units[key][property] = value;
                checkout.billing.update();
            },
            getUnit: function (key) {
                return units[key];
            },
            count: function () {
                return Object.keys(units).length;
            },
            clear: function () {
                units = {};
                checkout.billing.update();
            }
        };
    }());

}(lateRooms.kata.checkout));