function calculateBMI() {
    // Get height, weight, and units
    const heightInput = document.getElementById("height").value;
    const weightInput = document.getElementById("weight").value;
    const heightUnit = document.getElementById("height-unit").value;
    const weightUnit = document.getElementById("weight-unit").value;
    const bmiResultElement = document.getElementById("bmiResult");

    // Check if input fields are not empty
    if (!heightInput || !weightInput) {
        alert("Please enter both height and weight.");
        return;
    }

    // Convert height to meters if needed
    let heightInMeters;
    if (heightUnit === "cm") {
        heightInMeters = heightInput / 100;
    } else if (heightUnit === "ft") {
        heightInMeters = heightInput * 0.3048;
    } else {
        heightInMeters = parseFloat(heightInput);
    }

    // Convert weight to kilograms if needed
    let weightInKg;
    if (weightUnit === "lbs") {
        weightInKg = weightInput * 0.453592;
    } else {
        weightInKg = parseFloat(weightInput);
    }

    // Calculate BMI
    const bmi = weightInKg / (heightInMeters * heightInMeters);
    
    // Display BMI result rounded to one decimal place
    bmiResultElement.textContent = bmi.toFixed(1);

    // Determine BMI category based on the calculated BMI
    let category = "";
    if (bmi < 18.5) {
        category = "Underweight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = "Normal";
    } else if (bmi >= 25 && bmi <= 29.9) {
        category = "Overweight";
    } else {
        category = "Obese";
    }

    // Show BMI category
    let bmiCategoryElement = document.querySelector(".bmi-category");
    if (!bmiCategoryElement) {
        // Create category element if it doesn't already exist
        bmiCategoryElement = document.createElement("p");
        bmiCategoryElement.className = "bmi-category";
        document.querySelector(".result").appendChild(bmiCategoryElement);
    }
    bmiCategoryElement.textContent = `Category: ${category}`;
}
