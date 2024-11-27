// Currency Converter JavaScript
document.addEventListener("DOMContentLoaded", () => {
    const fromAmountInput = document.querySelector(".input-group input[type='number']");
    const fromCurrencySelect = document.querySelector(".input-group select");
    const toAmountInput = document.querySelectorAll(".input-group input[type='number']")[1];
    const toCurrencySelect = document.querySelectorAll(".input-group select")[1];
    const convertButton = document.querySelector(".convert-btn");
    const swapButton = document.querySelector(".swap-btn");
    const exchangeRateDisplay = document.querySelector(".result .result-value");

    // API URL (replace 'YOUR_API_KEY' with your API key from an exchange rate provider)
    const API_KEY = "0936c0a75dd5fef97358892c";
    const BASE_API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest`;

    // Function to fetch exchange rates and convert currency
    async function fetchExchangeRate() {
        const fromCurrency = fromCurrencySelect.value;
        try {
            const response = await fetch(`${BASE_API_URL}/${fromCurrency}`);
            const data = await response.json();
            if (data.result === "success") {
                const exchangeRate = data.conversion_rates[toCurrencySelect.value];
                exchangeRateDisplay.textContent = `1 ${fromCurrency} = ${exchangeRate} ${toCurrencySelect.value}`;
                return exchangeRate;
            } else {
                throw new Error("Unable to fetch exchange rate");
            }
        } catch (error) {
            exchangeRateDisplay.textContent = "Error fetching exchange rate";
            console.error(error);
        }
    }

    // Function to convert currency based on the fetched exchange rate
    async function convertCurrency() {
        const fromAmount = parseFloat(fromAmountInput.value);
        if (isNaN(fromAmount) || fromAmount <= 0) {
            toAmountInput.value = "Invalid amount";
            return;
        }

        const exchangeRate = await fetchExchangeRate();
        if (exchangeRate) {
            const convertedAmount = (fromAmount * exchangeRate).toFixed(2);
            toAmountInput.value = convertedAmount;
        }
    }

    // Event listener for the convert button
    convertButton.addEventListener("click", convertCurrency);

    // Event listener for the swap button
    swapButton.addEventListener("click", () => {
        const tempCurrency = fromCurrencySelect.value;
        fromCurrencySelect.value = toCurrencySelect.value;
        toCurrencySelect.value = tempCurrency;
        fetchExchangeRate();
        if (fromAmountInput.value) {
            convertCurrency();
        }
    });

    // Update exchange rate when currency selection changes
    fromCurrencySelect.addEventListener("change", fetchExchangeRate);
    toCurrencySelect.addEventListener("change", fetchExchangeRate);

    // Initial load of the exchange rate
    fetchExchangeRate();
});