export const formatDate = (date: string | Date): string => {
    const d = date instanceof Date ? date : new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Mês começa em 0
    const year = d.getFullYear();
  
    return `${day}/${month}/${year}`;
  };