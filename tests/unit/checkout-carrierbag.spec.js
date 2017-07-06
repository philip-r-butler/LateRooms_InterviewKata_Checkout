/**
 * Created by mtlsspb4 on 17/06/2017.
 */
/*global lateRooms, chai */
describe("Tests for checkout-carrierBag module", function () {

    "use strict";

    var rules;
    var order;
    var bag;
    var expect;

    beforeEach(function () {
        if (typeof(module) === "undefined") {
            expect = chai.expect;
            rules = lateRooms.kata.checkout.chargeRules;
            order = lateRooms.kata.checkout.order;
            bag = lateRooms.kata.checkout.carrierBag;
        } else {
            expect = require("chai").expect;
            rules = require("../../js/checkout-chargerules");
            order = require("../../js/checkout-order");
            bag = require("../../js/checkout-carrierbag");
        }
    });

    afterEach(function () {
        bag.clear();
        order.clear();
    });

    it("Check bag setter and getter, price and limit", function () {

        bag.set({price: 5, limit: 10});

        expect(bag.get().price).to.equal(5);
        expect(bag.get().limit).to.equal(10);
    });

    it("Check bag setter and getter, price, limit is null", function () {

        bag.set({price: 5});

        expect(bag.get().price).to.equal(5);
        expect(bag.get().limit).to.equal(0);
    });

    it("Check bag setter and getter, limit, price is null", function () {

        bag.set({limit: 5});

        expect(bag.get().price).to.equal(0);
        expect(bag.get().limit).to.equal(5);
    });

    it("Check bag setter and getter, limit and price are null", function () {

        expect(bag.get().price).to.equal(0);
        expect(bag.get().limit).to.equal(0);
    });

    it("Check bag.getBagNumber and bag.charge of order items < bag.limit ", function () {

        order.setRules(rules).add("A").add("B").add("C");
        bag.set({price: 5, limit: 5}).setChargeRule(rules.carrierBagCharge).setOrder(order);

        expect(bag.count()).to.equal(1);
        expect(bag.update().charge()).to.equal(5);
    });

    it("Check bag.getBagNumber and bag.charge of order items = bag.limit ", function () {

        order.setRules(rules).add("A").add("B").add("C");
        bag.set({price: 10, limit: 3}).setChargeRule(rules.carrierBagCharge).setOrder(order);

        expect(bag.count()).to.equal(1);
        expect(bag.update().charge()).to.equal(10);
    });

    it("Check bag.getBagNumber and bag.charge  of order items > bag.limit ", function () {

        order.setRules(rules).add("A").add("B").add("C").add("B");
        bag.set({price: 20, limit: 3}).setChargeRule(rules.carrierBagCharge).setOrder(order);

        expect(bag.count()).to.equal(2);
        expect(bag.update().charge()).to.equal(40);

        order.add("B");
        expect(bag.count()).to.equal(2);
        expect(bag.update().charge()).to.equal(40);

        order.add("A").add("C");
        expect(bag.count()).to.equal(3);
        expect(bag.update().charge()).to.equal(60);
    });

});