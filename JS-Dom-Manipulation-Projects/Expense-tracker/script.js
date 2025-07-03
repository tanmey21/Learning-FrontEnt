const expenseForm = document.getElementById("expense-form");
const expenseName = document.getElementById("expense-name");
const expenseAmount = document.getElementById("expense-amount");
const expenseList = document.getElementById("expense-list");
const totalAmt = document.getElementById("total-amount");


let expenses = JSON.parse(localStorage.getItem('expenses')) || [];


function updateTotalAmt(value){
    totalAmt.textContent = `${value}`;
}

function saveExpenses(){
    localStorage.setItem('expenses',JSON.stringify(expenses));
}

function createNewExpense(){let total=0.0;
    expenseList.innerHTML = "";
    expenses.forEach(expense =>{total+=expense.amt;
        updateTotalAmt(total);
        const li = document.createElement("li");
        li.innerHTML = `
    <span>${expense.name}-$${expense.amt}</span>
    <button id="remove-${expense.id}">Delete</button>
    `;
        expenseList.appendChild(li);

        const DeleteButton = document.getElementById(`remove-${expense.id}`);
        DeleteButton.addEventListener('click',()=>{
            let idx=expenses.indexOf(expense);
            expenses.splice(idx,1);
            saveExpenses();
            total-=expense.amt;
            updateTotalAmt(total);
            createNewExpense();
        })
    }

)
}
createNewExpense();

expenseForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    const name = expenseName.value.trim();
    const amt = parseFloat(expenseAmount.value.trim());

    if(name === "" || isNaN(amt) || amt<=0)return;

    const newExpense = {
        id:Date.now(),
        name,
        amt,
    }

    expenses.push(newExpense);
    saveExpenses();
    createNewExpense();
    expenseName.value = "";
    expenseAmount.value = "";
})