import React, { useState } from "react";

const ExpenseTracker = () => {
  const [transactions, setTransactions] = useState(
    JSON.parse(localStorage.getItem('transactions')) || []
  );
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');

  const addTransaction = (e) => {
    e.preventDefault();

    if (text.trim() === '' || amount.trim() === '') {
      alert('Please add a text and amount');
    } else {
      const newTransaction = {
        id: generateID(),
        text,
        amount: +amount
      };

      setTransactions([...transactions, newTransaction]);

      updateLocalStorage();

      setText('');
      setAmount('');
    }
  };

  const generateID = () => {
    return Math.floor(Math.random() * 100000000);
  };

  const removeTransaction = (id) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));

    updateLocalStorage();
  };

  const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  };

  const updateValues = () => {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  
    const income = amounts
      .filter(item => item > 0)
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2);
  
    const expense = (
      amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
      -1
    ).toFixed(2);
  
    return { total, income, expense };
  };

  const { total, income, expense } = updateValues();

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Expense Tracker</h2>

      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Your Balance</h4>
              <h1 id="balance" className="mb-4">${total}</h1>
              
              <div className="row">
                <div className="col-md-6">
                  <h5>Income</h5>
                  <p id="money-plus" className="money plus">${income}</p>
                </div>
                <div className="col-md-6">
                  <h5>Expense</h5>
                  <p id="money-minus" className="money minus">${expense}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">History</h3>
              <ul id="list" className="list-group mb-4">
                {transactions.map(transaction => (
                  <li key={transaction.id} className={`list-group-item ${transaction.amount < 0 ? 'minus' : 'plus'}`}>
                    {transaction.text} <span>${Math.abs(transaction.amount)}</span>
                    <button className="btn btn-danger btn-sm float-end" onClick={() => removeTransaction(transaction.id)}>x</button>
                  </li>
                ))}
              </ul>

              <h3 className="card-title">Add new transaction</h3>
              <form onSubmit={addTransaction}>
                <div className="mb-3">
                  <label htmlFor="text" className="form-label">Text</label>
                  <input type="text" id="text" className="form-control" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
                </div>
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">Amount (negative - expense, positive - income)</label>
                  <input type="number" id="amount" className="form-control" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
                </div>
                <button type="submit" className="btn btn-primary">Add transaction</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseTracker;
