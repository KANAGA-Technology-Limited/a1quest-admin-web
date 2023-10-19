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
