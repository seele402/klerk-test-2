export type Rubric = {
  id: number;
  title: string;
  url: string;
  count: number;
  children?: Rubric[];
};
