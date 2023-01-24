import type { Rubric } from "@/Rubric";

export const sumRubric = (rubric: Rubric) => {
  return (
    rubric.count +
    (rubric.children?.reduce((acc, child) => acc + child.count, 0) || 0)
  );
};
