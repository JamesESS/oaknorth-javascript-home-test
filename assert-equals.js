function assertEquals(expect, actual, optionalMessage) {
    // stop optionalMessage outputting undefined if left out
    if (optionalMessage == undefined) {
        optionalMessage = "";
    }
    
    //throws error when argument(s) missing
    if (arguments.length < 2) {
        throw new Error('Missing arguments');
    }

    //throws an error of type differs
    if (typeof(expect) != typeof(actual)) {
        throw new Error(`${optionalMessage}Expected type ${typeof(expect)} but received ${typeof(actual)}`);
    }

    // handles edge case of both args being null, NaN or undefined
    if ((expect === null && actual === null) || (Number.isNaN(expect) && Number.isNaN(actual)) || (expect === undefined && actual === undefined)) {
        console.error(`${optionalMessage}expect and actual are equal but both are ${expect} if this is expected behavior ignore`);
        return true;
    }

    // deals with primitives
    if (typeof(expect) !== 'object') {
        // throw error if values differ
        if (expect !== actual) {
            throw new Error(`${optionalMessage}Expected ${expect} but received ${actual}`);
        }
        return true;
    }

    const expectArray = Array.isArray(expect);
    const actualArray = Array.isArray(actual);
    // throw error if one arg is array and other is object (not strictly necesseray as other tests ought to catch?)
    if ((expectArray || actualArray) && !(expectArray && actualArray)) {  // xor only true if one arg is an array
        if (expectArray) {
            throw new Error(`${optionalMessage}Expected an array received an object`);
        }
        else {
            throw new Error(`${optionalMessage}Expected an object received an array`);
        }
    }

    // handles arrays
    if (expectArray) {
        // throws error if arrays different length
        if (expect.length !== actual.length) {
            throw new Error(`${optionalMessage}Expected array length ${expect.length} but received ${actual.length}`);
        }
        if (!optionalMessage.length) {
            optionalMessage = 'While comparing array elements: ';
        }
        // runs each element in array through assertEquals
        for (let i = 0; i < expect.length; i++) {
            assertEquals(expect[i],actual[i],optionalMessage);
        }
        return true;
    }

    // handles edge case of receiving null and an object
    if ((expect === null || actual === null) && !(expect === null && actual === null)) {
        if (expect === null) {
            throw new Error(`${optionalMessage}Expected null received an object`);
        }
        else {
            throw new Error(`${optionalMessage}Expected an object received null`);
        }
    }

    // handles objects
    if (typeof(expect) === 'object') {
        const expectKeys = Object.keys(expect);
        const actualKeys = Object.keys(actual);
        if (!optionalMessage.length) {
            optionalMessage = 'While comparing objectKeys: ';
        }
        // checks objectKeys throw error if length or values different
        assertEquals(expectKeys,actualKeys,optionalMessage);
        optionalMessage = 'While comparing object values: ';
        // check each object value throw error if values different
        for (let i = 0; i < expectKeys.length; i++) {
            assertEquals(expect[expectKeys[i]],actual[actualKeys[i]],optionalMessage);
        }
        return true;
    }
    // fair bit of recursion potential for issues with large nested objects or arrays?
    // generic error for edge cases I might have missed. Shows up as uncovered line in jest
    throw new Error(`edge case expected ${expect} received ${actual} if you see this message please raise a new issue including what you're expected and actual are along with any other relevant information`);
}

module.exports = assertEquals