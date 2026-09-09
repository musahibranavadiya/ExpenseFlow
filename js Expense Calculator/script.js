var expenseName = document.getElementById("expenseName");
var expenseAmount = document.getElementById("expenseAmount");
var expenseCategory = document.getElementById("expenseCategory");
var addExpenseButton = document.getElementById("addExpenseButton");
var searchInput = document.getElementById("searchInput");

var totalBalance = document.getElementById("totalBalance");
var spentAmount = document.getElementById("spentAmount");
var budgetRemaining = document.getElementById("budgetRemaining");


// =============================
// STARTING VALUES
// =============================

var balance = 0;
var budget = 10000;

var expenses = [];


// =============================
// LOAD SAVED EXPENSES
// =============================

var savedExpenses =
    localStorage.getItem("expenseFlowExpenses");

if (savedExpenses !== null) {
    expenses = JSON.parse(savedExpenses);
}


// =============================
// SAVE DATA
// =============================

function savedata() {

    localStorage.setItem(
        "expenseFlowExpenses",
        JSON.stringify(expenses)
    );

}


// =============================
// SAVE COOKIE
// =============================

function savecookis() {

    document.cookie =
        "expenseFlowCount=" +
        expenses.length +
        ";max-age=31536000;path=/";

}


// =============================
// ADD EXPENSE
// =============================

function addexpance() {

    var name = expenseName.value.trim();

    var amount =
        parseFloat(expenseAmount.value);

    var category =
        expenseCategory.value;


    // Check name
    if (name === "") {

        alert("Please enter expense name.");

        return;

    }


    // Check amount
    if (isNaN(amount) || amount <= 0) {

        alert("Please enter a valid amount.");

        return;

    }


    // Current date
    var date = new Date();

    var day = date.getDate();

    var month =
        date.toLocaleString("en-US", {
            month: "short"
        });

    var year =
        date.getFullYear();


    var fullDate =
        day + " " + month + " " + year;


    // Create expense
    var expense = {

        name: name,

        amount: amount,

        category: category,

        date: fullDate

    };


    // Add expense
    expenses.push(expense);


    // Save
    savedata();

    savecookis();


    // Clear inputs
    expenseName.value = "";

    expenseAmount.value = "";

    expenseCategory.value = "Food";


    // Update screen
    updateDashboard();

    renderExpenses();

}


// =============================
// UPDATE DASHBOARD
// =============================

function updateDashboard() {

    var totalSpent = 0;


    expenses.forEach(function (expense) {

        totalSpent += expense.amount;

    });


    var remaining =
        budget - totalSpent;


    totalBalance.innerText =
        "₹" + balance.toLocaleString("en-IN");


    spentAmount.innerText =
        "₹" + totalSpent.toLocaleString("en-IN");


    budgetRemaining.innerText =
        "₹" + remaining.toLocaleString("en-IN");

}


// =============================
// SHOW EXPENSES
// =============================

function renderExpenses() {

    var container =
        document.querySelector(".nower-contant");


    // Remove ONLY dynamically added expenses
    var oldExpenses =
        container.querySelectorAll(
            ".dynamic-expense"
        );


    oldExpenses.forEach(function (expense) {

        expense.remove();

    });


    // Add saved expenses
    expenses.forEach(function (expense) {

        var expenseDiv =
            document.createElement("div");


        expenseDiv.className =
            "expense dynamic-expense";


        expenseDiv.innerHTML = `

            <div class="expense-left">

                <div class="expense-icone">

                    <i class="fa-solid fa-receipt"></i>

                </div>

                <div>

                    <h3>${expense.name}</h3>

                    <p>
                        ${expense.category}
                        •
                        ${expense.date}
                    </p>

                </div>

            </div>


            <div class="expense-right">

                <h3>
                    ₹${expense.amount.toLocaleString("en-IN")}
                </h3>

                <p>Cash</p>

            </div>

        `;


        var addExpense =
            document.querySelector(".add-expense");


        container.insertBefore(
            expenseDiv,
            addExpense
        );

    });

}


// =============================
// SEARCH
// =============================

searchInput.addEventListener(
    "input",
    function () {

        var searchText =
            searchInput.value.toLowerCase();


        var expenseElements =
            document.querySelectorAll(
                ".dynamic-expense"
            );


        expenseElements.forEach(
            function (expenseElement) {

                var text =
                    expenseElement.innerText
                        .toLowerCase();


                if (text.includes(searchText)) {

                    expenseElement.style.display =
                        "flex";

                } else {

                    expenseElement.style.display =
                        "none";

                }

            }
        );

    }
);


// =============================
// ADD BUTTON
// =============================

addExpenseButton.addEventListener(
    "click",
    addexpance
);


// =============================
// START APP
// =============================

updateDashboard();

renderExpenses();