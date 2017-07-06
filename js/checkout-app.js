/**
 * Created by Phil Butler on 04/06/2017.
 *
 * checkout-app.js - Defines and initialises application object
 *
 * Uses name spaced object literals to,
 * reduce risk of polluting global namespace,
 * assist in logical organisation of code,
 * reduce likely of collisions occurring in tests */
/*global lateRooms*/
if (typeof module === "undefined") {
    // Declare root object
    var lateRooms;
    // Initialise root lateRooms object, checks if already exists
    lateRooms = lateRooms || {};
    // Declare and initialise kata object
    lateRooms.kata = lateRooms.kata || {};
    // Declare and initialise checkout object
    lateRooms.kata.checkout = {};
}