/**
 * Created by Phil Butler on 04/06/2017.
 */
/*global lateRooms */
describe('calculator controller tests', function () {

    'use strict';

    var sku;

    beforeEach(function () {
        sku = lateRooms.kata.checkout.stockKeepingUnits;
    });

    afterEach(function () {
        sku.clear();
    });

    it('Test test', function () {
        var num;
        num = 1;

        expect(num).toBe(1);

    })
    /*    it('number button clicked event triggered', function () {
     var number = myCalculator.view.getUISelectors().number;

     spyEvent = spyOnEvent(number, 'click');

     $(number).trigger('click');
     expect(spyEvent).toHaveBeenTriggered();
     });

     it('operator button clicked event triggered', function () {
     var operator = myCalculator.view.getUISelectors().operator;

     spyEvent = spyOnEvent(operator, 'click');

     $(operator).trigger('click');
     expect(spyEvent).toHaveBeenTriggered();
     });

     it('number button clicked adds character to expression', function () {
     $(myCalculator.view.getUISelectors().number).trigger('click');
     expect(model.get()).toBe('9');
     });

     it('operator button clicked adds character to expression', function () {
     var number   = myCalculator.view.getUISelectors().number,
     operator = myCalculator.view.getUISelectors().operator;

     $(number).trigger('click');
     $(operator).trigger('click');
     expect(model.get()).toBe('9+');
     });

     it('backspace button clicked removes last character from expression', function () {
     var number   = myCalculator.view.getUISelectors().number,
     operator = myCalculator.view.getUISelectors().operator,
     remove   = myCalculator.view.getUISelectors().remove;

     $(number).trigger('click');
     $(operator).trigger('click');
     $(number).trigger('click');
     expect(model.get()).toBe('9+9');
     $(remove).trigger('click');
     expect(model.get()).toBe('9+');
     });

     it('evaluate button clicked evaluates expression', function () {
     var number   = myCalculator.view.getUISelectors().number,
     operator = myCalculator.view.getUISelectors().operator,
     evaluate = myCalculator.view.getUISelectors().evaluate;

     $(number).trigger('click');
     $(operator).trigger('click');
     $(number).trigger('click');
     $(evaluate).trigger('click');
     expect(model.get()).toBe('18');
     });

     it('number key pressed add character to expression', function () {
     var code = 49;

     $(document).trigger($.Event('keypress', {which: code, keyCode: code}));
     expect(model.get()).toBe('1');
     });

     it('number key pressed add character to expression', function () {
     var code = 49;

     $(document).trigger($.Event('keypress', {which: code, keyCode: code}));
     expect(model.get()).toBe('1');
     });

     it('addToExpression subscription adds character to model expression', function () {
     $.publish('addToExpression', '1');
     expect(model.get()).toBe('1');
     });

     it('two addToExpression subscriptions appends two characters to model expression', function () {
     $.publish('addToExpression', '1');
     $.publish('addToExpression', '2');
     expect(model.get()).toBe('12');
     });

     it('addToExpression subscription appends clause to model expression', function () {
     $.publish('addToExpression', '1+2');
     expect(model.get()).toBe('1+2');
     });

     it('evaluate subscription evaluates and updates expression', function () {
     $.publish('addToExpression', '1+2');
     $.publish('evaluate');
     expect(model.get()).toBe('3');
     });

     it('removeLastFromExpression subscription removes last item from expression', function () {
     $.publish('addToExpression', '1+2');
     $.publish('removeLastFromExpression');
     expect(model.get()).toBe('1+');
     $.publish('removeLastFromExpression');
     expect(model.get()).toBe('1');
     });

     */
});