/**
 * Created by Phil Butler on 04/06/2017.
 */
/*global lateRooms */
describe("Tests for checkout-billing module", function () {

    "use strict";

    var bill;
    var order;
    var sku;
    var bag;
    var rules;

    beforeEach(function () {
        sku = lateRooms.kata.checkout.stockKeepingUnits;
        bill = lateRooms.kata.checkout.billing;
        bag = lateRooms.kata.checkout.carrierBag;
        order = lateRooms.kata.checkout.order;
        rules = lateRooms.kata.checkout.rules;
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

        bag.set({price: 5, limit: 5});
        sku.set({"A": {label: "Label for A", price: 50}});

        order.add(key1).add(key1);

        bill.update();

        expect(bill.get()).toBe(105);
    });

    it("Calculate simple bill with multiple item type in order, no discounts", function () {
        var key1;
        var key2;
        var key3;

        key1 = "A";
        key2 = "B";
        key3 = "C";

        order.add(key1).add(key2).add(key1).add(key1).add(key3);

        sku.set({
            "A": {label: "Label for A", price: 50},
            "B": {label: "Label for B", price: 30},
            "C": {label: "Label for C", price: 15}
        });

        bill.update();

        expect(bill.get()).toBe(195);
    });

    it("Calculate bill with single item type in order, with discount but discount limit not reached", function () {
        var key1;

        key1 = "A";

        order.add(key1).add(key1);

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

        bill.update();

        expect(bill.get()).toBe(100);
    });

    it("Calculate bill with single item type in order, with discount and discount limit reached", function () {
        var key1;

        key1 = "A";

        order.add(key1).add(key1).add(key1);

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

        bill.update();

        expect(bill.get()).toBe(130);
    });

    it("Calculate bill with single item type in order, with discount and discount limit exceeded", function () {
        var key1;

        key1 = "A";

        order.add(key1).add(key1).add(key1).add(key1).add(key1);

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

        bill.update();

        expect(bill.get()).toBe(230);
    });

    it("Calculate bill with single item type in order, with discount and discount limit exceeded twice", function () {
        var key1;

        key1 = "A";

        order.add(key1).add(key1).add(key1).add(key1).add(key1).add(key1);

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

        bill.update();

        expect(bill.get()).toBe(260);
    });

    it("Calculate bill with two item types in order, with and without discount and discount limit exceeded", function () {
        var key1;
        var key2;

        key1 = "A";
        key2 = "B";

        order.add(key1).add(key2).add(key1).add(key1).add(key2).add(key2).add(key1);

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

        bill.update();

        expect(bill.get()).toBe(255);

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

        order.add(key1).add(key2).add(key1).add(key1).add(key2).add(key2).add(key1).add(key4).add(key3).add(key4).add(key1);

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

        bill.update();

        expect(bill.get()).toBe(355);
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

        order.add(key1).add(key1).add(key1);

        expect(bill.get()).toBe(75);
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

        order.add(key1).add(key1).add(key2).add(key1).add(key2).add(key1);

        expect(bill.get()).toBe(220);
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

        order.add(key1).add(key1).add(key1);

        expect(bill.get()).toBe(75);
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

        order.add(key1).add(key1).add(key1).add(key1);

        expect(bill.get()).toBe(80);
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

        order.add(key1).add(key1).add(key1).add(key1).add(key1).add(key1);

        expect(bill.get()).toBe(130);
    });
});