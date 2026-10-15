import History from './components/History';
import InstallButton from './components/InstallButton';
import MonthlyChart from './components/MonthlyChart';
import Summary from './components/Summary';
import TransactionForm from './components/TransactionForm';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Transaction, TransactionData } from './types';

export default function App() {
  // Movimientos guardados en el dispositivo: el historial se ve sin conexión
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('movimientos-gastos', []);

  const addTransaction = (data: TransactionData) =>
    setTransactions([...transactions, { ...data, id: Date.now().toString() }]);

  const deleteTransaction = (id: string) =>
    setTransactions(transactions.filter((t) => t.id !== id));

  // Suma de los montos de un tipo de movimiento
  const total = (type: Transaction['type']) =>
    transactions.filter((t) => t.type === type).reduce((sum, t) => sum + t.amount, 0);

  return (
    <main>
      <h1>Control de gastos</h1>

      <InstallButton />

      <Summary income={total('ingreso')} expenses={total('gasto')} />
      <TransactionForm onSubmit={addTransaction} />
      <MonthlyChart transactions={transactions} />
      <History transactions={transactions} onDelete={deleteTransaction} />
    </main>
  );
}
