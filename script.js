let totalElement = document.querySelector("#total");
let expenseName = document.querySelector("#expenseName");
let expenseAmount = document.querySelector("#expenseAmount");
let addBtn = document.querySelector("#addBtn");
let expenseList = document.querySelector("#expenseList");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let total = 0;

expenses.forEach(function(expense){
    addExpenseToUI(expense);

    let amount = expense.split("₹")[1];
    total += Number(amount);
});

totalElement.innerText = total;


addBtn.addEventListener("click", function(){

    let name = expenseName.value.trim();
    let amount = expenseAmount.value.trim();

    if (name === "" || amount === ""){
        alert("Please fill all fields");
        return;
    }

    name = name
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");    
    
    
    let expense = `${name} - ₹${amount}`;

    expenses.push(expense);
    localStorage.setItem("expenses",JSON.stringify(expenses));

    addExpenseToUI(expense);

    total += Number(amount);
    totalElement.innerText = total;

    expenseName.value = "";
    expenseAmount.value = "";
    
    expenseName.focus();
});

expenseName.addEventListener("keydown",function(event){
    if(event.key === "Enter"){
        expenseAmount.focus();
    }
});

expenseAmount.addEventListener("keydown",function(event){
    if(event.key === "Enter"){
        addBtn.click();
    }
});

function addExpenseToUI(expense){
    
    let li = document.createElement("li");
    
    let textSpan = document.createElement("span");
    textSpan.innerText = expense;

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "X";
    
    li.appendChild(textSpan);
    li.appendChild(deleteBtn);
    
    expenseList.appendChild(li);
    
    deleteBtn.addEventListener("click", function(){

        let amount = expense.split("₹")[1];

        total -= Number(amount);
        totalElement.innerText = total;
        
        let index = expenses.indexOf(expense);

        if (index > -1){
        expenses.splice(index,1);
        }
        
        localStorage.setItem("expenses",JSON.stringify(expenses));

        li.remove();
    });
    
}
//     expenses = expenses.filter(item => item !== expense);
//     addExpenseToUI(expense);
//     console.log(expenses);
    
//     // let expense = name + " - ₹" + amount;
    
    
//     let li = document.createElement("li"); 
    
//     let deleteBtn = document.createElement("button");
//     deleteBtn.innerText = "X";
    
//     let textSpan = document.createElement("span");
//     textSpan.innerText = `${name} - ₹${amount}`;
    
//     li.appendChild(textSpan);
//     li.appendChild(deleteBtn);
    
//     expenseList.appendChild(li);
    
//     deleteBtn.addEventListener("click", function(){
//         total = total- Number(amount);
//         totalElement.innerText = "" + total;
//         console.log(total);
//         li.remove();
//     });
    
    
    
    

// localStorage.setItem("test", "hello");
// console.log(localStorage.getItem("test"));
