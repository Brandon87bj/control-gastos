import type { Transaction } from '../types';
import { formatDate, formatMoney } from '../utils';

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export default function History({ transactions, onDelete }: Props) {
  if (transactions.length === 0) {
    return <p className="empty">Aún no hay movimientos. Registra tu primer gasto o ingreso.</p>;
  }

  // Los más recientes primero (se copia el arreglo para no modificar el original)
  const sorted = [...transactions].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section>
      <h2>Historial</h2>
      <ul className="list">
        {sorted.map((t) => (
          <li key={t.id} className="card item">
            <div>
              <strong>{t.description}</strong>
              <span className="meta">
                {t.category} · {formatDate(t.date)}
              </span>
            </div>
            <span className={t.type === 'gasto' ? 'amount out' : 'amount in'}>
              {t.type === 'gasto' ? '-' : '+'}
              {formatMoney(t.amount)}
            </span>
            <button className="danger" onClick={() => onDelete(t.id)} aria-label={`Eliminar ${t.description}`}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
