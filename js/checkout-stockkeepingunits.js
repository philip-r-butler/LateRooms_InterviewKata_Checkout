/**
 * Created by Phil Butler on 04/06/2017.
 *
 * checkout-stockkeepingunits.js - responsible for managing stock keeping units,
 * a set of stock items with price details and discount pricing rules
 *
 * Uses module pattern to encapsulate code and not pollute global namespace
 **/
(function (checkout) {

    'use strict';

    checkout.stockKeepingUnits = (function () {
        var units;
        units = {};

        return {
            setUnits: function (obj) {
                units = obj;  
            },
            addUnit: function (key, obj) {
                units[key] = obj;
            },
            setUnitProperty: function (key, property, value) {
                units[key][property] = value;
            },
            getUnit: function (key) {
                return units[key];
            },
            clear: function () {
                units = {};
            }
        }
    }());

}(lateRooms.kata.checkout));