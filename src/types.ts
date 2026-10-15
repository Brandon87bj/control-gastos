// Un movimiento puede ser un ingreso o un gasto
export type TransactionType = 'ingreso' | 'gasto';

// Estructura de un movimiento registrado
export interface Transaction {
  id: string;
  type: TransactionType;
  category: string; // Los ingresos usan siempre la categoría "Ingreso"
  description: string;
  amount: number;
  date: string; // Formato AAAA-MM-DD (el que entrega <input type="date">)
}

// Datos que captura el formulario (el id lo asigna la app)
export type TransactionData = Omit<Transaction, 'id'>;

// Categorías disponibles para los gastos
export const EXPENSE_CATEGORIES = [
  'Comida',
  'Transporte',
  'Escuela',
  'Entretenimiento',
  'Salud',
  'Otros',
] as const;
