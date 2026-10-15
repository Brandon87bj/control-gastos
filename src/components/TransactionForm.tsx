import { useState, type FormEvent } from 'react';
import { EXPENSE_CATEGORIES, type TransactionData, type TransactionType } from '../types';
import { toISODate } from '../utils';

interface Props {
  onSubmit: (data: TransactionData) => void;
}

export default function TransactionForm({ onSubmit }: Props) {
  const [type, setType] = useState<TransactionType>('gasto');
  const [category, setCategory] = useState<string>(EXPENSE_CATEGORIES[0]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(toISODate(new Date()));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const value = Number(amount);
    if (!description.trim() || value <= 0 || !date) return;

    onSubmit({
      type,
      // Solo los gastos tienen categoría; los ingresos se guardan como "Ingreso"
      category: type === 'gasto' ? category : 'Ingreso',
      description: description.trim(),
      amount: value,
      date,
    });

    // Se limpian solo los campos que cambian de un registro a otro
    setDescription('');
    setAmount('');
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>Nuevo movimiento</h2>

      <div className="row">
        <label>
          Tipo
          <select value={type} onChange={(e) => setType(e.target.value as TransactionType)}>
            <option value="gasto">Gasto</option>
            <option value="ingreso">Ingreso</option>
          </select>
        </label>

        {type === 'gasto' && (
          <label>
            Categoría
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {EXPENSE_CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
        )}
      </div>

      <label>
        Descripción
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={type === 'gasto' ? 'Ej. Comida en la cafetería' : 'Ej. Beca del mes'}
          required
        />
      </label>

      <div className="row">
        <label>
          Monto (MXN)
          <input
            type="number"
            inputMode="decimal"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>

        <label>
          Fecha
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>
      </div>

      <button type="submit" className="primary">
        Registrar {type}
      </button>
    </form>
  );
}
