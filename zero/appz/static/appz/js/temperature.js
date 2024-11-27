// Conversion functions
function convertToC(value, unit) {
    switch (unit) {
        case 'c':
            return value;
        case 'f':
            return (value - 32) * 5 / 9;
        case 'k':
            return value - 273.15;
        default:
            return 0;
    }
  }
  
  function convertFromC(value, unit) {
    switch (unit) {
        case 'c':
            return value;
        case 'f':
            return (value * 9 / 5) + 32;
        case 'k':
            return value + 273.15;
        default:
            return 0;
    }
  }
  
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
  
    // Convert to Celsius first, then to the target unit
    const valueInCelsius = convertToC(fromValue, fromUnit);
    const result = convertFromC(valueInCelsius, toUnit);
  
    toInput.value = result.toFixed(2);
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