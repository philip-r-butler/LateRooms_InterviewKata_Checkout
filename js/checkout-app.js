/**
 * Created by Phil Butler on 04/06/2017.
 *
 * checkout-app.js - Defines and initialises application object
 *
 * Uses name spaced object literals to,
 * reduce risk of polluting global namespace,
 * assist in logical organisation of code,
 * reduce likely of collisions occurring in tests */

// Check to determine if lateRooms variable already exists
var lateRooms = lateRooms || {};

lateRooms.kata          = lateRooms.kata || {};
lateRooms.kata.checkout = {};

// lateRooms.kata.checkout.stockKeepingUnits.setUnits(
//     {
//         A: {label: 'Label for A', price: 50},
//         B: {label: 'Label for B', price: 30},
//         C: {label: 'Label for C', price: 20},
//         D: {label: 'Label for D', price: 15}
//     }
// );