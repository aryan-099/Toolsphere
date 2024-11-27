// Get elements from the DOM
const fromInput = document.querySelectorAll(".input-group")[0].querySelector("input");
const fromBaseSelect = document.querySelectorAll(".input-group")[0].querySelector("select");
const toInput = document.querySelectorAll(".input-group")[1].querySelector("input");
const toBaseSelect = document.querySelectorAll(".input-group")[1].querySelector("select");
const convertBtn = document.querySelector(".convert-btn");
const swapBtn = document.querySelector(".swap-btn");

// Event listener for the convert button
convertBtn.addEventListener("click", () => {
    const fromBase = parseInt(fromBaseSelect.value);
    const toBase = parseInt(toBaseSelect.value);
    const number = fromInput.value.trim();

    try {
        // Convert the input number to decimal
        const decimalValue = parseInt(number, fromBase);

        if (isNaN(decimalValue)) {
            toInput.value = "Invalid input!";
            return;
        }

        // Convert the decimal value to the target base
        let result;
        if (toBase === 64) {
            result = btoa(decimalValue.toString()); // Base-64 encoding
        } else {
            result = decimalValue.toString(toBase).toUpperCase();
        }

        toInput.value = result;
    } catch (error) {
        toInput.value = "Conversion error!";
    }
});

// Event listener for the swap button
swapBtn.addEventListener("click", () => {
    // Swap the values in the "From" and "To" base selectors
    const tempValue = fromBaseSelect.value;
    fromBaseSelect.value = toBaseSelect.value;
    toBaseSelect.value = tempValue;

    // Clear inputs
    fromInput.value = "";
    toInput.value = "";
});