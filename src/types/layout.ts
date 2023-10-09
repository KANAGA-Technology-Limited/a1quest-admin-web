export type PageFilterType = {
  filters: {
    label: string;
    value: string;
  }[];
  onChange: (value: string) => void;
  activeFilter: string;
};
