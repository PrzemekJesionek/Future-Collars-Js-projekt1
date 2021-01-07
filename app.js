

///
/// CZĘŚĆ PRZETWARZAJĄCA PRZYCHODY!
///

const btn1 = document.getElementById("btn1");

let allIncomeList = [];

//Zmienna przechowująca zsumowane przychody, zamienione już na Number
let allIncomeSum = '';

let lastId = 1;

incomeIdSplitMain = []


btn1.addEventListener("click", function () {

    const newIncomeName = document.getElementById("new-income-name");
    const newIncomePrice = document.getElementById("new-income-price");
    console.log(newIncomePrice.value);
    let income = {
        name: newIncomeName.value,
        price: Number(newIncomePrice.value),
        id: `income-${lastId}`,
    };

    console.log(income.price);
    if (income.price < 0) {
        return (alert('musisz podać liczbę większą od zera!'))
    }

    allIncomeList.push(income);
    lastId++;
    console.log(allIncomeList);

    updateAllIncomeList();
    incomeSum(allIncomeList);
    budgetSum()
});

//funkcja uaktualniająca listę przychodów

function updateAllIncomeList() {

    const ulIncomeList = document.getElementById('ul-income');
    ulIncomeList.innerText = '';

    allIncomeList.forEach(function (income) {

        //
        // NARAZIE WSZTSTKO DZIAŁA ALE OD TEGO MOMENTU MOŻE SIĘ COŚ ZEPSUĆ!!!!!
        //

        let incomeIdSplit = income.id.split('-');
        console.log(incomeIdSplit);
        incomeIdSplitMain.push(incomeIdSplit)
        console.log(incomeIdSplitMain)

        let incomeLi = document.createElement('li');
        incomeLi.innerText = `${income.name} :${income.price}`;
        incomeLi.classList.add('li-separator');
        incomeLi.id = `li-income-${incomeIdSplit[1]}`;


        const editIncomeBtn = document.createElement('button');
        editIncomeBtn.innerText = 'Edytuj';
        //do skopiowanie w wydatkach
        editIncomeBtn.id = `editIncomeBtn-${incomeIdSplit[1]}`;
        editIncomeBtn.addEventListener('click', function () {
            let containerIncomeLiId = `li-income-${incomeIdSplit[1]}`
            let containerIncome = document.getElementById(containerIncomeLiId);
            containerIncome.innerHTML = `
            <input id="edited-income-name${incomeIdSplit[1]}" value="${income.name}"></input>
            <input id="edited-income-price${incomeIdSplit[1]}" value="${income.price}" type="number"></input>
            <button onclick="onSaveIncomeButtonClicked(${incomeIdSplit[1]})">Zapisz</button>
            ` //TUTAJ

        })
        //koniec kopiowania
        const deleteIncomeBtn = document.createElement('button');
        // let incomeIdSplit = income.id.split('-');
        // console.log(incomeIdSplit);
        deleteIncomeBtn.innerText = 'Usuń';
        deleteIncomeBtn.id = `deleteIncomeBtn-${incomeIdSplit[1]}`;
        deleteIncomeBtn.addEventListener('click', function (event) {
            console.log(event.target.id);
            allIncomeList = allIncomeList.filter(function (elemIncome) {
                let deleteIncomeBtnId = deleteIncomeBtn.id.split('-');
                let incomeSplit = elemIncome.id.split('-');
                return Number(incomeSplit[1]) !== Number(deleteIncomeBtnId[1]);

            });
            updateAllIncomeList();
            incomeSum(allIncomeList);
            budgetSum()
        });



        console.log(incomeLi)
        incomeLi.appendChild(deleteIncomeBtn);
        incomeLi.appendChild(editIncomeBtn);

        ulIncomeList.appendChild(incomeLi);


    });
}

function onSaveIncomeButtonClicked(incomeIdSplitMain) {
    let income = allIncomeList.find(elem => elem.id === `income-${incomeIdSplitMain}`);
    let inputIncomeElemValue = document.getElementById(`edited-income-name${incomeIdSplitMain}`);
    income.name = inputIncomeElemValue.value;
    let inputIncomeElemPrice = document.getElementById(`edited-income-price${incomeIdSplitMain}`);


    income.price = Number(inputIncomeElemPrice.value)
    console.log(income.name)

    console.log(income.price)
    updateAllIncomeList()
    incomeSum(allIncomeList)
    budgetSum()


}


//Funkcja licząca sumę przychodów

function incomeSum(allIncomeList) {
    // let incomeSumPrice = allIncomeList.price;
    let i1 = 0;
    let sum1 = 0;
    while (i1 < allIncomeList.length) {
        sum1 += allIncomeList[i1].price;
        i1++;
    }

    let incomeSum = document.getElementById('income-sum-value');
    incomeSum.innerText = sum1;

    allIncomeSum = Number(sum1);
    console.log(allIncomeSum)
    console.log(`suma wynosi ${allIncomeSum}`);

};




///
/// CZĘŚĆ PRZETWARZAJĄCA WYDATKI!
///


const btn2 = document.getElementById("btn2");

let allExpensesList = [];

//Zmienna przechowująca zsumowane przychody, zamienione już na Number
let allExpensesSum = '';

let lastId2 = 1;

expensesIdSplitMain = []


btn2.addEventListener("click", function () {

    const newExpensesName = document.getElementById("new-expenses-name");
    const newExpensesPrice = document.getElementById("new-expenses-price");
    console.log(newExpensesPrice.value);
    let expenses = {
        name: newExpensesName.value,
        price: Number(newExpensesPrice.value),
        id: `expenses-${lastId2}`,


    };


    if (expenses.price < 0) {
        return (alert('musisz podać liczbę większą od zera!'))
    }
    console.log(expenses.price);

    allExpensesList.push(expenses);
    lastId2++;
    console.log(allExpensesList);

    updateAllExpensesList();
    expensesSum(allExpensesList);
    budgetSum()

});

// //funkcja uaktualniająca listę przychodów

function updateAllExpensesList() {

    const ulExpensesList = document.getElementById('ul-expenses');
    ulExpensesList.innerText = '';

    allExpensesList.forEach(function (expenses) {


        let expensesIdSplit = expenses.id.split('-');
        console.log(expensesIdSplit);
        expensesIdSplitMain.push(expensesIdSplit)
        console.log(expensesIdSplitMain)

        let expensesLi = document.createElement('li');
        expensesLi.innerText = `${expenses.name} :${expenses.price}`;
        expensesLi.classList.add('li-separator');
        expensesLi.id = `li-expenses-${expensesIdSplit[1]}`;
        console.log(expensesLi)


        const editExpensesBtn = document.createElement('button');
        editExpensesBtn.innerText = 'Edytuj';
        //do skopiowanie w wydatkach
        editExpensesBtn.id = `editIncomeBtn-${expensesIdSplit[1]}`;
        editExpensesBtn.addEventListener('click', function () {
            let containerExpensesLiId = `li-expenses-${expensesIdSplit[1]}`
            let containerExpenses = document.getElementById(containerExpensesLiId);
            containerExpenses.innerHTML = `
            <input id="edited-expenses-name${expensesIdSplit[1]}" value="${expenses.name}" ></input>
            <input id="edited-expenses-price${expensesIdSplit[1]}" value="${expenses.price}" type="number"></input>
            <button onclick="onSaveExpensesButtonClicked(${expensesIdSplit[1]})">Zapisz</button>
            ` //TUTAJ

        })





        const deleteExpensesBtn = document.createElement('button');
        deleteExpensesBtn.innerText = 'Usuń';
        deleteExpensesBtn.id = `deleteExpensesBtn-${expensesIdSplit[1]}`;
        deleteExpensesBtn.addEventListener('click', function (event) {
            console.log(event.target.id);
            allExpensesList = allExpensesList.filter(function (elemExpenses) {
                let deleteExpensesBtnId = deleteExpensesBtn.id.split('-');
                let expensesSplit = elemExpenses.id.split('-');
                return Number(expensesSplit[1]) !== Number(deleteExpensesBtnId[1]);

            });
            updateAllExpensesList();
            expensesSum(allExpensesList);
            budgetSum()
        });





        console.log(expensesLi)
        expensesLi.appendChild(deleteExpensesBtn);
        expensesLi.appendChild(editExpensesBtn);

        ulExpensesList.appendChild(expensesLi);


    });
}


function onSaveExpensesButtonClicked(expensesIdSplitMain) {
    let expenses = allExpensesList.find(elem => elem.id === `expenses-${expensesIdSplitMain}`);
    let inputExpensesElemValue = document.getElementById(`edited-expenses-name${expensesIdSplitMain}`);
    expenses.name = inputExpensesElemValue.value;
    let inputExpensesElemPrice = document.getElementById(`edited-expenses-price${expensesIdSplitMain}`);


    expenses.price = Number(inputExpensesElemPrice.value)
    console.log(expenses.name)

    console.log(expenses.price)
    updateAllExpensesList()
    expensesSum(allExpensesList)
    budgetSum()


}



// //Funkcja licząca sumę wydatków

function expensesSum(allExpensesList) {
    // let incomeSumPrice = allIncomeList.price;
    let i2 = 0;
    let sum2 = 0;
    while (i2 < allExpensesList.length) {
        sum2 += allExpensesList[i2].price;
        i2++;
    }

    let expensesSum = document.getElementById('expenses-sum-value');
    expensesSum.innerText = sum2;

    allExpensesSum = Number(sum2);
    console.log(allExpensesSum)
    console.log(`suma wynosi ${allExpensesSum}`);

};


//Funkcja aktualizująca aktualny bilans wydatków

function budgetSum() {
    let budget = allIncomeSum - allExpensesSum;
    let moneyLeftValue = document.getElementById('money-left-value')
    let moneyLeftStyle = document.querySelector('.money-left')
    console.group(moneyLeftStyle)

    if (budget > 0) {
        moneyLeftValue.innerText = `Możesz jeszcze wydać ${budget} zł`
        moneyLeftStyle.style.backgroundColor = "green";

    } else if (budget < 0) {
        moneyLeftValue.innerText = `Bilans jest ujemny. Jesteś na minusie ${budget} zł`
        moneyLeftStyle.style.backgroundColor = "red";
    } else {
        moneyLeftValue.innerText = 'Jesteś na zero'
        moneyLeftStyle.style.backgroundColor = "yellow";
    }

}


// zapisywanie strony w pamięci za pomocą local storage, do zrobienia