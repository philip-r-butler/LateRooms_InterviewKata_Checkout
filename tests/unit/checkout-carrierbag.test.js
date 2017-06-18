/**
 * Created by mtlsspb4 on 17/06/2017.
 */
/*global lateRooms */
describe("Tests for checkout-carrierBag module", function () {

    "use strict";

    var bag;
    var order;

    beforeEach(function () {
        order = lateRooms.kata.checkout.order;
        bag = lateRooms.kata.checkout.carrierBag;
    });

    afterEach(function () {
        order.clear();
        bag.clear();
    });

    it("Check bag setter and getter, price and limit", function () {

        bag.set({price: 5, limit: 10});

        expect(bag.get().price).toBe(5);
        expect(bag.get().limit).toBe(10);
    });

    it("Check bag setter and getter, price, limit is null", function () {

        bag.set({price: 5});

        expect(bag.get().price).toBe(5);
        expect(bag.get().limit).toBe(0);
    });

    it("Check bag setter and getter, limit, price is null", function () {

        bag.set({limit: 5});

        expect(bag.get().price).toBe(0);
        expect(bag.get().limit).toBe(5);
    });

    it("Check bag setter and getter, limit and price are null", function () {

        expect(bag.get().price).toBe(0);
        expect(bag.get().limit).toBe(0);
    });

    it("Check bag.getBagNumber and bag.charge of order items < bag.limit ", function () {

        bag.set({price: 5, limit: 5});
        order.add("A").add("B").add("C");

        expect(bag.count()).toBe(1);
        expect(bag.charge()).toBe(5);
    });

    it("Check bag.getBagNumber and bag.charge of order items = bag.limit ", function () {

        bag.set({price: 10, limit: 3});
        order.add("A").add("B").add("C");

        expect(bag.count()).toBe(1);
        expect(bag.charge()).toBe(10);
    });

    it("Check bag.getBagNumber and bag.charge  of order items > bag.limit ", function () {

        bag.set({price: 20, limit: 3});
        order.add("A").add("B").add("C").add("B");
        expect(bag.count()).toBe(2);
        expect(bag.charge()).toBe(40);

        order.add("B");
        expect(bag.count()).toBe(2);
        expect(bag.charge()).toBe(40);

        order.add("A").add("C");
        expect(bag.count()).toBe(3);
        expect(bag.charge()).toBe(60);
    });

});