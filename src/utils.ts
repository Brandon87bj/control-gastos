// Muestra un número como dinero: 1500 -> "$1,500.00"
export const formatMoney = (amount: number) =>
  amount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

// Convierte una fecha a texto AAAA-MM-DD usando la zona horaria del dispositivo
export const toISODate = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
};

// Convierte "2026-10-20" en "20 oct 2026". Se agrega la hora para que
// el navegador no corra la fecha un día por la zona horaria.
export const formatDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
