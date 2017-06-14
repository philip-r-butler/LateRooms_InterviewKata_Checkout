/**
 * Created by Phil Butler on 04/06/2017.
 */
/*global lateRooms */
describe("Tests for checkout-stockKeepingUnits module", function () {

    "use strict";

    var sku;

    beforeEach(function () {
        sku = lateRooms.kata.checkout.stockKeepingUnits;
    });

    afterEach(function () {
        sku.clear();
    });

    it("Set single stock keeping unit", function () {
        var unit;
        var key;
        var label;
        var price;
        var obj;

        key = "A";
        label = "Label for " + key;
        price = 50;

        obj = {label: label, price: price};

        sku.addUnit(key, obj);
        unit = sku.getUnit("A");

        expect(unit.label).toBe(label);
        expect(unit.price).toBe(price);
    });

    it("Set single stock keeping unit property", function () {
        var unit;
        var key;
        var property;
        var value;
        var obj;

        key = "A";
        obj = {label: "Label for " + key, price: 50};
        property = "price";
        value = 100;

        sku.addUnit("A", obj);
        sku.setUnitProperty(key, property, value);
        unit = sku.getUnit("A");

        expect(unit[property]).toBe(value);
    });

    it("Set multiple stock keeping units", function () {
        var units;
        var unit;

        units = {
            A: {label: "Label for A", price: 50},
            B: {label: "Label for B", price: 30},
            C: {label: "Label for C", price: 20},
            D: {label: "Label for D", price: 15}
        };

        sku.set(units);
        unit = sku.getUnit("A");
        expect(unit.price).toBe(units.A.price);
        unit = sku.getUnit("C");
        expect(unit.price).toBe(units.C.price);
    });
});