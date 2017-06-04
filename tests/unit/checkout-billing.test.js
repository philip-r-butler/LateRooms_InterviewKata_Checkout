/**
 * Created by Phil Butler on 04/06/2017.
 */
/*global lateRooms */
describe('Tests for checkout-billing module', function () {

    'use strict';

    var bill, order, sku;

    beforeEach(function () {
        order = lateRooms.kata.checkout.order;
        sku   = lateRooms.kata.checkout.stockKeepingUnits;
        bill  = lateRooms.kata.checkout.billing;
    });

    afterEach(function () {
        order.clear();
        sku.clear();
        bill.clear();
    });

    it('Calculate simple bill with single item type in order, no discounts', function () {
        var key1;

        key1 = 'A';

        order.add(key1);
        order.add(key1);

        sku.set({
            'A': {label: 'Label for A', price: 50}
        });

        bill.update();

        expect(bill.get()).toBe(100);

    });

    it('Calculate simple bill with multiple item type in order, no discounts', function () {
        var key1, key2, key3;

        key1 = 'A';
        key2 = 'B';
        key3 = 'C';

        order.add(key1);
        order.add(key2);
        order.add(key1);
        order.add(key1);
        order.add(key3);

        sku.set({
            'A': {label: 'Label for A', price: 50},
            'B': {label: 'Label for B', price: 30},
            'C': {label: 'Label for C', price: 15}
        });

        bill.update();

        expect(bill.get()).toBe(195);
    });
});