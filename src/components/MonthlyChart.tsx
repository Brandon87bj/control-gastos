import type { Transaction } from '../types';
import { formatMoney } from '../utils';

interface Props {
  transactions: Transaction[];
}

const MONTHS_SHOWN = 6;

// Devuelve los últimos 6 meses (incluido el actual) con el total gastado en cada uno
function getMonthlyExpenses(transactions: Transaction[]) {
  const now = new Date();
  const months = [];

  for (let i = MONTHS_SHOWN - 1; i >= 0; i--) {
    const first = new Date(now.getFullYear(), now.getMonth() - i, 1);
    // Clave AAAA-MM: las fechas guardadas empiezan igual (AAAA-MM-DD)
    const key = `${first.getFullYear()}-${String(first.getMonth() + 1).padStart(2, '0')}`;
    const total = transactions
      .filter((t) => t.type === 'gasto' && t.date.startsWith(key))
      .reduce((sum, t) => sum + t.amount, 0);

    months.push({
      key,
      label: first.toLocaleDateString('es-MX', { month: 'short' }),
      total,
    });
  }
  return months;
}

export default function MonthlyChart({ transactions }: Props) {
  const months = getMonthlyExpenses(transactions);
  // La barra más alta ocupa todo el alto; si no hay gastos se evita dividir entre 0
  const max = Math.max(...months.map((m) => m.total), 1);

  // Medidas del dibujo SVG
  const width = 300;
  const chartHeight = 110;
  const slot = width / MONTHS_SHOWN;
  const barWidth = 28;

  return (
    <section className="card">
      <h2>Gastos por mes</h2>
      <svg
        viewBox={`0 0 ${width} ${chartHeight + 40}`}
        role="img"
        aria-label="Gráfica de barras con los gastos de los últimos seis meses"
      >
        {months.map((m, i) => {
          const barHeight = (m.total / max) * chartHeight;
          const x = i * slot + (slot - barWidth) / 2;
          const y = 20 + chartHeight - barHeight;

          return (
            <g key={m.key}>
              <rect x={x} y={y} width={barWidth} height={barHeight} rx="3" className="bar">
                <title>{`${m.label}: ${formatMoney(m.total)}`}</title>
              </rect>
              {m.total > 0 && (
                <text x={x + barWidth / 2} y={y - 5} textAnchor="middle" className="bar-value">
                  {Math.round(m.total)}
                </text>
              )}
              <text x={x + barWidth / 2} y={chartHeight + 36} textAnchor="middle" className="bar-label">
                {m.label}
              </text>
            </g>
          );
        })}
      </svg>
    </section>
  );
}
