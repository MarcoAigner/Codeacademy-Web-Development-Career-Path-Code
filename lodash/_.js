const _ = {

    // Clamps a number within the inclusive lower- and upper bounds
    clamp(number, lower, upper) {
        const lowerClampedValue = Math.max(number, lower);
        const clampedValue = Math.min(lowerClampedValue, upper);
        return clampedValue;
    },

    // Checks if n is between start and up to, but not including, end.
    // If end is not specified, it's set to start with start then set to 0.
    // If start is greater than end the params are swapped to support negative ranges.
    inRange(number, start, end) {

        if (!end) { // end does not exist -> end = start & start = 0
            end = start;
            start = 0;
        }

        if (start > end) { // start is greater than end -> values are swapped to support negative values
            const cache = start;
            start = end;
            end = cache;
        }

        if (number < start || number >= end) { // number is without range
            return false;
        } else if (start < number < end) { // number is within range
            return true;
        }

    },

    // Splits strings into an array of its words
    words(string) {
        return string.split(' ');
    },

    // Distribute n spaces among both sides of a string
    // If n is uneven, there will be one more space at the end
    pad(string, length) {
        if (string.length >= length) { // String's length is greater than or equal to length -> return string directly
            return string;
        } else {
            let padding = length - string.length; // calculate total padding
           // Padding is even : even distribution; Padding is uneven: One extra space at the end
            return padding % 2 === 0 ? `${' '.repeat(padding / 2)}${string}${' '.repeat(padding / 2)}` : `${' '.repeat(padding / 2)}${string}${' '.repeat(padding / 2 + 1)}`;
        }
    },

    // Check if key is a direct property of object
    has(object, key) {
        return object[key] !== undefined;
    },

    // Invert an object's keys and values
    invert(object) {
        let invertedObject = {};

        for (entry in object) {
            invertedObject[object[entry]] = entry; // save the original key into the new object's value and vice versa
        }

        return invertedObject;

    },

    // Returns the key of the first property within an object to return true on the predicate function
    findKey(object, predicate) {
        for (key in object) {
           return predicate(object[key]) ? key : undefined; // Predicate function returns true -> return key, else return undefined
        }
    },

    // Shorten an array by a given amount, cutting elements from the beginning
    drop(array, dropBy = 1) { // if no dropBy is specified, only the first element will be removed
        if (dropBy > array.length) { // Array is smaller than dropBy -> return empty array
            return [];
        } else {
            for (let i = 0; i < dropBy; i++) { // for every dropBy, shift() the first element in the array
                array.shift();
            }
            return array;
        }
    },

    // Drop elements from an array until the predicate function returns true on the current
    dropWhile(array, predicate) {
        for (let i = 0; i < array.length; i++) {
            if (!(predicate(array[i], array.indexOf(array[i]), array))) { // if predicate-function returns false...
                return this.drop(array, i); // ... drop the current element from the array
            }
        }
        return array;
    },

    // Splits an array into  sub-arrays of length n each
    // If n is not defined: n = 1
    // If the source-array is uneven, the last element consists of the remaining elements
    chunk(array, n = 1) {
        let newArray = [];
        const chunk = Math.floor(array.length / n); // calculate the chunks
            
        for(let i = 0; i < array.length; i += chunk) { // iterate the array in steps of chunk
            newArray.push(array.slice(i, i + chunk));  // add a new array to with size of chunk to newArray
        }

        console.log(newArray);
        return newArray;
    }


};

// Do not write or modify code below this line.
module.exports = _;