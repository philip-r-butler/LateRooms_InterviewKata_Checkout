/**
 * Created by Phil Butler on 04/06/2017.
 */
/*global lateRooms */
describe("Tests for checkout-orders module", function () {

    "use strict";

    var order;

    beforeEach(function () {
        order = lateRooms.kata.checkout.order;
    });

    afterEach(function () {
        order.clear();
    });

    it("Add single order", function () {
        var key;

        key = "A";

        order.add(key);

        expect(order.count()).toBe(1);
    });

    it("Add multiple orders", function () {

        order.add("A").add("B");

        expect(order.count()).toBe(2);
    });

    it("Get order item", function () {
        var key1;
        var key2;
        var key3;

        key1 = "A";
        key2 = "B";
        key3 = "C";

        order.add(key1).add(key2).add(key1).add(key1).add(key3);

        expect(order.getItem(3)).toBe(key1);
        expect(order.getItem(1)).toBe(key2);
        expect(order.getItem(4)).toBe(key3);
    });

    it("Remove last order", function () {

        order.add("A").add("B").removeLast();

        expect(order.count()).toBe(1);
    });

    it("Get all orders", function () {
        var key1;
        var key2;
        var ordered;

        key1 = "A";
        key2 = "B";

        order.add(key1);
        order.add(key2);

        ordered = order.get();

        expect(ordered[0]).toBe(key1);
        expect(ordered[1]).toBe(key2);
    });

    it("Count orders with key", function () {
        var key1;
        var key2;
        var key3;

        key1 = "A";
        key2 = "B";
        key3 = "C";

        order.add(key1).add(key2).add(key1).add(key1).add(key2).add(key3).add(key1);

        expect(order.countItem(key1)).toBe(4);
        expect(order.countItem(key2)).toBe(2);
        expect(order.countItem(key3)).toBe(1);

    });
});