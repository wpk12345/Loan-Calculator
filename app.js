//Listen for submit
document.getElementById("loan-form").addEventListener("submit", function(e) {
  //hide results
  document.getElementById("results").style.display = "none";
  //show loader
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 2000);
  e.preventDefault();
});

//Calculate Results
function calculateResults() {
  console.log("Calculating...");
  //UI vars
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute the monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    //isFinite and toFixed are Javascript methods  the latter being how many decimal places
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    //show results
    document.getElementById("results").style.display = "block";

    //hide loader
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please Check Your Numbers");
  }
}

function showError(error) {
  //show results
  document.getElementById("results").style.display = "none";

  //hide loader
  document.getElementById("loading").style.display = "none";
  //Create a div
  const errorDiv = document.createElement("div");

  //Get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");
  //Add class
  errorDiv.className = "alert alert-danger";

  //Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  //Insert error above heading
  card.insertBefore(errorDiv, heading);

  //Clear error after 2 seconds
  setTimeout(clearError, 2000);
}

//Clear error
function clearError() {
  document.querySelector(".alert").remove();
}
