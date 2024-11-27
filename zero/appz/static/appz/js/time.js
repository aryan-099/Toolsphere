// Conversion rates
const conversionRates = {
    s: 1,
    min: 60,
    h: 3600,
    d: 86400,
    w: 604800,
    m: 2629800, // Assuming 30.417 days per month
    y: 31557600 // Assuming 365.25 days per year
};

// Get DOM elements
const fromInput = document.querySelector('.input-group:first-of-type input');
const toInput = document.querySelector('.input-group:last-of-type input');
const fromSelect = document.querySelector('.input-group:first-of-type select');
const toSelect = document.querySelector('.input-group:last-of-type select');
const convertBtn = document.querySelector('.convert-btn');
const swapBtn = document.querySelector('.swap-btn');

// Convert function
function convert() {
    const fromValue = parseFloat(fromInput.value);
    const fromUnit = fromSelect.value;
    const toUnit = toSelect.value;

    // Validate input
    if (isNaN(fromValue)) {
        toInput.value = '';
        return;
    }

    // Convert to base unit (seconds) then to target unit
    const valueInSeconds = fromValue * conversionRates[fromUnit];
    const result = valueInSeconds / conversionRates[toUnit];

    toInput.value = formatResult(result);
}

// Format result based on the magnitude of the number
function formatResult(number) {
    if (Math.abs(number) < 0.000001 || Math.abs(number) >= 1000000) {
        return number.toExponential(6);
    }
    return Number(number.toPrecision(8)).toString();
}

// Swap function
function swapUnits() {
    // Swap values
    const tempValue = fromInput.value;
    fromInput.value = toInput.value;
    toInput.value = tempValue;

    // Swap units
    const tempUnit = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = tempUnit;

    // If there's a value, convert with new units
    if (fromInput.value) {
        convert();
    }
}

// Clear input function
function clearResult() {
    if (!fromInput.value) {
        toInput.value = '';
    }
}

// Event listeners
convertBtn.addEventListener('click', convert);
swapBtn.addEventListener('click', swapUnits);
fromInput.addEventListener('input', clearResult);
fromSelect.addEventListener('change', clearResult);
toSelect.addEventListener('change', clearResult);

// Handle Enter key
fromInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        convert();
    }
});

// Prevent invalid input
fromInput.addEventListener('keydown', (e) => {
    const invalidChars = ['e', 'E', '+', '-'];
    if (invalidChars.includes(e.key) && !e.ctrlKey) {
        e.preventDefault();
    }
});