/**
 * Created by Phil Butler on 04/06/2017.
 */
/*global lateRooms */
describe("Tests for checkout-billing module", function () {

    "use strict";

    var sku;
    var rules;
    var bag;
    var order;
    var bill;
    var expect;

    beforeEach(function () {
        if (typeof(module) === "undefined") {
            expect = chai.expect;
            sku = lateRooms.kata.checkout.stockKeepingUnits;
            rules = lateRooms.kata.checkout.chargeRules;
            order = lateRooms.kata.checkout.order;
            bag = lateRooms.kata.checkout.carrierBag;
            bill = lateRooms.kata.checkout.billing;
        } else {
            expect = require("chai").expect;
            sku = require("../../js/checkout-stockkeepingunits");
            rules = require("../../js/checkout-chargerules");
            order = require("../../js/checkout-order");
            bag = require("../../js/checkout-carrierbag");
            bill = require("../../js/checkout-billing");
        }
    });

    afterEach(function () {
        order.clear();
        sku.clear();
        bill.clear();
        bag.clear();
    });

    it("Calculate simple bill with single item type in order, no discounts", function () {
        var key1;

        key1 = "A";

        sku.set({"A": {label: "Label for A", price: 50}});

        order.setSKU(sku.get()).setRules(rules).add(key1).add(key1);

        bill.addCharge("order", order.charge()).update();

        expect(bill.get()).to.equal(100);
    });

    it("Calculate simple bill with multiple item type in order, no discounts", function () {
        var key1;
        var key2;
        var key3;

        key1 = "A";
        key2 = "B";
        key3 = "C";

        sku.set({
            "A": {label: "Label for A", price: 50},
            "B": {label: "Label for B", price: 30},
            "C": {label: "Label for C", price: 15}
        });

        order.setSKU(sku.get()).add(key1).add(key2).add(key1).add(key1).add(key3);

        bill.addCharge("order", order.charge()).update();

        expect(bill.get()).to.equal(195);
    });

    it("Calculate bill with single item type in order, with discount but discount limit not reached", function () {
        var key1;

        key1 = "A";

        sku.set({
            "A": {
                label: "Label for A",
                price: 50,
                discount: {
                    price: function () {
                        return 45;
                    },
                    limit: 3
                }
            }
        });

        order.setSKU(sku.get()).add(key1).add(key1);

        bill.addCharge("order", order.charge()).update();

        expect(bill.get()).to.equal(100);
    });

    it("Calculate bill with single item type in order, with discount and discount limit reached", function () {
        var key1;

        key1 = "A";

        sku.set({
            "A": {
                label: "Label for A",
                price: 50,
                discount: {
                    price: function () {
                        return 130 / 3;
                    },
                    limit: 3
                }
            }
        });

        order.setSKU(sku.get()).add(key1).add(key1).add(key1);

        bill.addCharge("order", order.charge()).update();

        expect(bill.get()).to.equal(130);
    });

    it("Calculate bill with single item type in order, with discount and discount limit exceeded", function () {
        var key1;

        key1 = "A";

        sku.set({
            "A": {
                label: "Label for A",
                price: 50,
                discount: {
                    price: function () {
                        return 130 / 3;
                    },
                    limit: 3
                }
            }
        });

        order.setSKU(sku.get()).add(key1).add(key1).add(key1).add(key1).add(key1);

        bill.addCharge("order", order.charge()).update();

        expect(bill.get()).to.equal(230);
    });

    it("Calculate bill with single item type in order, with discount and discount limit exceeded twice", function () {
        var key1;

        key1 = "A";

        sku.set({
            "A": {
                label: "Label for A",
                price: 50,
                discount: {
                    price: function () {
                        return 130 / 3;
                    },
                    limit: 3
                }
            }
        });

        order.setSKU(sku.get()).add(key1).add(key1).add(key1).add(key1).add(key1).add(key1);

        bill.addCharge("order", order.charge()).update();

        expect(bill.get()).to.equal(260);
    });

    it("Calculate bill with two item types in order, with and without discount and discount limit exceeded", function () {
        var key1;
        var key2;

        key1 = "A";
        key2 = "B";

        sku.set({
            "A": {
                label: "Label for A",
                price: 50,
                discount: {
                    price: function () {
                        return 130 / 3;
                    },
                    limit: 3
                }
            },
            "B": {
                label: "Label for B",
                price: 30,
                discount: {
                    price: function () {
                        return 45 / 2;
                    },
                    limit: 2
                }
            }
        });

        order.setSKU(sku.get()).add(key1).add(key2).add(key1).add(key1).add(key2).add(key2).add(key1);

        bill.addCharge("order", order.charge()).update();

        expect(bill.get()).to.equal(255);

    });

    it("Calculate bill with four item types in order, with and without discount and discount limit exceeded", function () {
        var key1;
        var key2;
        var key3;
        var key4;

        key1 = "A";
        key2 = "B";
        key3 = "C";
        key4 = "D";

        sku.set({
            "A": {
                label: "Label for A",
                price: 50,
                discount: {
                    price: function () {
                        return 130 / 3;
                    },
                    limit: 3
                }
            },
            "B": {
                label: "Label for B",
                price: 30,
                discount: {
                    price: function () {
                        return 45 / 2;
                    },
                    limit: 2
                }
            },
            "C": {
                label: "Label for C",
                price: 20
            },
            "D": {
                label: "Label for D",
                price: 15
            }
        });

        order.setSKU(sku.get()).add(key1).add(key2).add(key1).add(key1).add(key2).add(key2).add(key1).add(key4).add(key3).add(key4).add(key1);

        bill.addCharge("order", order.charge()).update();

        expect(bill.get()).to.equal(355);
    });

    it("Calculate simple bill with single item type in order, using rules.fixedPrice rule", function () {
        var key1;

        key1 = "A";

        sku.set({
            "A": {
                label: "Label for A",
                rule: {
                    func: rules.fixedPrice,
                    params: {
                        price: 25
                    }
                }
            }
        });

        order.setSKU(sku.get()).add(key1).add(key1).add(key1);

        bill.addCharge("order", order.charge()).update();

        expect(bill.get()).to.equal(75);
    });

    it("Calculate simple bill with multiple item types in order, using rules.fixedPrice rule", function () {
        var key1;
        var key2;

        key1 = "A";
        key2 = "B";

        sku.set({
            "A": {
                label: "Label for A",
                rule: {
                    func: rules.fixedPrice,
                    params: {
                        price: 50
                    }
                }
            },
            "B": {
                label: "Label for B",
                rule: {
                    func: rules.fixedPrice,
                    params: {
                        price: 10
                    }
                }
            }
        });

        order.setSKU(sku.get()).add(key1).add(key1).add(key2).add(key1).add(key2).add(key1);

        bill.addCharge("order", order.charge()).update();

        expect(bill.get()).to.equal(220);
    });

    it("Calculate simple bill with single item type in order, using rules.discountPriceWithOrderLimit rule, number of items in order < discount limit", function () {
        var key1;

        key1 = "A";

        sku.set({
            "A": {
                label: "Label for A",
                rule: {
                    func: rules.discountPriceWithOrderLimit,
                    params: {
                        fullPrice: 25,
                        discountPrice: 20,
                        discountLimit: 4
                    }
                }
            }
        });

        order.setSKU(sku.get()).add(key1).add(key1).add(key1);

        bill.addCharge("order", order.charge()).update();

        expect(bill.get()).to.equal(75);
    });

    it("Calculate simple bill with single item type in order, using rules.discountPriceWithOrderLimit rule, number of items in order = discount limit", function () {
        var key1;

        key1 = "A";

        sku.set({
            "A": {
                label: "Label for A",
                rule: {
                    func: rules.discountPriceWithOrderLimit,
                    params: {
                        fullPrice: 25,
                        discountPrice: 20,
                        discountLimit: 4
                    }
                }
            }
        });

        order.setSKU(sku.get()).add(key1).add(key1).add(key1).add(key1);

        bill.addCharge("order", order.charge()).update();

        expect(bill.get()).to.equal(80);
    });

    it("Calculate simple bill with single item type in order, using rules.discountPriceWithOrderLimit rule, number of items in order > discount limit", function () {
        var key1;

        key1 = "A";

        sku.set({
            "A": {
                label: "Label for A",
                rule: {
                    func: rules.discountPriceWithOrderLimit,
                    params: {
                        fullPrice: 25,
                        discountPrice: 20,
                        discountLimit: 4
                    }
                }
            }
        });

        order.setSKU(sku.get()).add(key1).add(key1).add(key1).add(key1).add(key1).add(key1);

        bill.addCharge("order", order.charge()).update();

        expect(bill.get()).to.equal(130);
    });

    it("Calculate simple bill with single order item and carrier bag charge", function () {
        var key1;

        key1 = "A";

        sku.set({"A": {label: "Label for A", price: 50}});

        order.setSKU(sku.get()).add(key1).add(key1);
        bag.set({price: 5, limit: 5}).setChargeRule(rules.carrierBagCharge).setOrder(order);

        bill.addCharge("order", order.charge()).addCharge("bag", bag.update().charge()).update();

        expect(bill.get()).to.equal(105);
    });
});