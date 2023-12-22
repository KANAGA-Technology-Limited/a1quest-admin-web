export const formatNumberToNaira = (number: number) => {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(
    Number(number)
  );
};

export const getNameInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('');
};

export const splitCamelCase = (str: string) => {
  return str.replace(/([a-z])([A-Z])/g, '$1 $2');
};

export const formatQuantity = (number: number, maxFraction?: number) => {
  return new Intl.NumberFormat('en-NG', {
    maximumFractionDigits: maxFraction,
  }).format(Number(number));
};

export const formatTime = (audioDuration: number, addIndicators?: boolean) => {
  // Convert and format the duration
  const h = Math.floor(audioDuration / 3600)
    .toString()
    .padStart(2, '0');
  const m = Math.floor((audioDuration % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const s = Math.floor(audioDuration % 60)
    .toString()
    .padStart(2, '0');

  const newFormat = addIndicators
    ? Number(h) > 0
      ? h + 'h ' + m + 'm ' + s
      : m + 'm ' + s + 's '
    : Number(h) > 0
    ? h + ':' + m + ':' + s
    : m + ':' + s;
  return newFormat;
};
