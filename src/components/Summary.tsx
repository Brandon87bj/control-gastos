import { formatMoney } from '../utils';

interface Props {
  income: number;
  expenses: number;
}

export default function Summary({ income, expenses }: Props) {
  // Saldo disponible = todo lo que ha entrado menos todo lo que se ha gastado
  const balance = income - expenses;

  return (
    <section className="card summary">
      <p>Saldo disponible</p>
      <strong className={balance < 0 ? 'negative' : ''}>{formatMoney(balance)}</strong>
      <div className="row">
        <span>Ingresos: {formatMoney(income)}</span>
        <span>Gastos: {formatMoney(expenses)}</span>
      </div>
    </section>
  );
}
