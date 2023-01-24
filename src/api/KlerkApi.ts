import type { Rubric } from "@/Rubric";

export const getRubrics = async (allowEmpty: boolean): Promise<Rubric[]> => {
  return await fetch(
    `https://www.klerk.ru/yindex.php/v3/event/rubrics?allowEmpty=${+allowEmpty}`
  ).then((x) => x.json());
};
