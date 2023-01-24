import { computed, ref, watch } from 'vue';
import { defineStore } from 'pinia';
import type { Rubric } from '@/Rubric';
import { getRubrics } from '@/api/KlerkApi';
import { sumRubric } from '@/utils/rubric-utils';

export const useRubricsStore = defineStore('rubrics', () => {
  const rubrics = ref<Rubric[]>([]);
  const checkedRubrics = ref<Set<Rubric>>(new Set());
  const isLoading = ref(false);
  const allowEmpty = ref(false);

  const refresh = async () => {
    isLoading.value = true;
    rubrics.value = await getRubrics(allowEmpty.value);
    isLoading.value = false;
  };

  watch(
    allowEmpty,
    async () => {
      checkedRubrics.value.clear();
      await refresh();
    },
    {
      immediate: true,
    }
  );

  const checkedRubricsSum = computed(() =>
    [...checkedRubrics.value].reduce(
      (acc, rubric) => acc + sumRubric(rubric),
      0
    )
  );

  const toggleRubric = (rubric: Rubric) => {
    if (checkedRubrics.value.has(rubric)) {
      checkedRubrics.value.delete(rubric);
      return;
    }

    checkedRubrics.value.add(rubric);

    [...checkedRubrics.value]
      .filter((r) => rubric.children?.includes(r))
      .forEach((r) => checkedRubrics.value.delete(r));
  };

  return {
    rubrics,
    isLoading,
    allowEmpty,
    toggleRubric,
    checkedRubrics,
    checkedRubricsSum,
  };
});
