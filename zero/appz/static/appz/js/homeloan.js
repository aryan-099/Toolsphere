document.querySelector('.calculate-btn').addEventListener('click', function() {
    // Get input values
    const loanAmount = parseFloat(document.getElementById('loan-amount').value);
    const interestRate = parseFloat(document.getElementById('interest-rate').value);
    const loanTerm = parseFloat(document.getElementById('loan-term').value);

    // Validation check for empty or invalid inputs
    if (!loanAmount || !interestRate || !loanTerm) {
        alert("Please fill in all fields.");
        return;
    }

    // Convert interest rate to monthly and loan term to months
    const monthlyRate = (interestRate / 100) / 12;
    const termInMonths = loanTerm * 12;

    // Calculate EMI
    const emi = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termInMonths));

    // Calculate total payment and total interest
    const totalPayment = emi * termInMonths;
    const totalInterest = totalPayment - loanAmount;

    // Display results
    document.getElementById('emi-result').textContent = emi.toFixed(2);
    document.getElementById('total-payment-result').textContent = totalPayment.toFixed(2);
    document.getElementById('total-interest-result').textContent = totalInterest.toFixed(2);
});
