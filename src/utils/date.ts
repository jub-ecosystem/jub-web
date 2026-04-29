export const getRelativeTime = (createdAt: string | Date): string => {
  const now = new Date();
   let dateStr = createdAt instanceof Date ? createdAt.toISOString() : createdAt;
  if (typeof dateStr === 'string' && !dateStr.endsWith('Z')) {
    dateStr += 'Z'; 
  }

  const past = new Date(dateStr);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);
  if (diffInSeconds < 0) {
    return 'Justo ahora';
  }

  if (diffInSeconds < 60) {
    return `Hace ${diffInSeconds} segundos`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `Hace ${diffInMinutes} ${diffInMinutes === 1 ? 'minuto' : 'minutos'}`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `Hace ${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'}`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  return `Hace ${diffInDays} ${diffInDays === 1 ? 'día' : 'días'}`;
};
