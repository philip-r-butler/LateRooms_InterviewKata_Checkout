/**
 * Created by Phil Butler on 19/06/2017.
 */
/*global lateRooms, chai, module*/
describe("Tests for checkout-pricerules module", function () {

    "use strict";

    var expect;
    var rules;

    beforeEach(function () {
        if (typeof(module) === "undefined") {
            expect = chai.expect;
            rules = lateRooms.kata.checkout.chargeRules;
        } else {
            expect = require("chai").expect;
            rules = require("../../js/checkout-chargerules");
        }
    });

    // afterEach(function () {
    // });

    it("Apply rules.fixedPrice rule", function () {
        var price;

        price = {count: 1, price: 50};

        expect(rules.fixedPrice(price)).to.equal(50);
    });

    it("Apply rules.discountWithOrderLimit rule, count < discount limit", function () {
        var obj;

        obj = {};

        obj.count = 4;
        obj.fullPrice = 50;
        obj.discountLimit = 5;
        obj.discountPrice = 45;

        expect(rules.discountPriceWithOrderLimit(obj)).to.equal(200);
    });

    it("Apply rules.discountWithOrderLimit rule, count = discount limit", function () {
        var obj;

        obj = {};

        obj.count = 5;
        obj.fullPrice = 50;
        obj.discountLimit = 5;
        obj.discountPrice = 45;

        expect(rules.discountPriceWithOrderLimit(obj)).to.equal(225);
    });

    it("Apply rules.discountWithOrderLimit rule, count > discount limit", function () {
        var obj;

        obj = {};

        obj.count = 6;
        obj.fullPrice = 50;
        obj.discountLimit = 5;
        obj.discountPrice = 45;

        expect(rules.discountPriceWithOrderLimit(obj)).to.equal(275);
    });

    it("Apply rules.discountWithOrderLimit rule, count = 2 * discount limit", function () {
        var obj;

        obj = {};

        obj.count = 10;
        obj.fullPrice = 50;
        obj.discountLimit = 5;
        obj.discountPrice = 45;

        expect(rules.discountPriceWithOrderLimit(obj)).to.equal(450);
    });

    it("Apply rules.discountWithOrderLimit rule, count = (2 * discount limit) + 2", function () {
        var obj;

        obj = {};

        obj.count = 12;
        obj.fullPrice = 50;
        obj.discountLimit = 5;
        obj.discountPrice = 45;

        expect(rules.discountPriceWithOrderLimit(obj)).to.equal(550);
    });
});