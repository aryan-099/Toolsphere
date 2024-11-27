// Conversion rates
const conversionRates = {
    ms: 1,
    kmh: 3.6,
    mph: 2.23694,
    kn: 1.94384,
    fts: 3.28084
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

    // Convert to base unit (meters/second) then to target unit
    const valueInMetersPerSecond = fromValue * conversionRates[fromUnit];
    const result = valueInMetersPerSecond / conversionRates[toUnit];

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