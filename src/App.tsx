import { useState } from "react";
import "./App.css";
import ExpensesFilter from "./expense-tracker/componets/ExpensesFilter";
import ExpenseList from "./expense-tracker/componets/ExpenseList";
import ExpenseForm from "./expense-tracker/componets/ExpenseForm";
import Navbar from "./assets/Navbar";
function App() {
  const [SelectCategory, setSelectCategory] = useState("");
  const [expenses, setExpenses] = useState([
    { id: 1, description: "aaa", amount: 10, category: "Utility" },
    { id: 2, description: "bbb", amount: 10, category: "Utility" },
    { id: 3, description: "ccc", amount: 10, category: "Utility" },
    { id: 4, description: "ddd", amount: 10, category: "Utility" },
  ]);
  const visibleExpenses = SelectCategory
    ? expenses.filter((e) => e.category === SelectCategory)
    : expenses;
  return (
    <div>
      <div className="mb-3">
        <Navbar />
      </div>
      <div className="mb-5">
        <ExpenseForm
          onSubmit={(expense) =>
            setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
          }
        />
      </div>
      <div className="mb-3">
        <ExpensesFilter
          onSelectCategory={(category) => setSelectCategory(category)}
        />
      </div>
      <ExpenseList
        expenses={visibleExpenses}
        onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
      />
    </div>
  );
}
export default App;
