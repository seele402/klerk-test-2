<template>
  <div class="tree-root">
    <input
      class="checkbox"
      type="checkbox"
      :checked="isChecked"
      :disabled="isParentChecked"
      @change="toggleChecked"
    />

    <button v-if="hasChildren" class="marker" @click="isExpanded = !isExpanded">
      {{ !isExpanded ? "&gt;" : "&lt;" }}
    </button>

    <a class="title" :href="'https://www.klerk.ru' + rubric.url">
      {{ rubric.title }} ({{ rubric.count }}, {{ count }})
    </a>

    <div class="subtree" v-if="hasChildren" v-show="isExpanded">
      <RubricTree
        v-for="child in rubric.children"
        :key="child.url"
        :rubric="child"
        :isParentChecked="isChecked || isParentChecked"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Rubric } from "@/Rubric";
import { computed, ref } from "vue";
import { useRubricsStore } from "@/stores/rubrics";
import { sumRubric } from "@/utils/rubric-utils";

const rubricsStore = useRubricsStore();

const props = defineProps<{
  isParentChecked?: boolean;
  rubric: Rubric;
}>();

const isExpanded = ref(false);
const hasChildren = computed(() => !!props.rubric.children?.length);
const isChecked = computed(
  () => props.isParentChecked || rubricsStore.checkedRubrics.has(props.rubric)
);

const count = computed(() => sumRubric(props.rubric));

const toggleChecked = () => rubricsStore.toggleRubric(props.rubric);
</script>

<style scoped lang="scss">
li {
  margin-bottom: 10px;
}

.checkbox + .title {
  margin-left: 20px;
}

.subtree {
  border-left: 1px solid rgba($color: gray, $alpha: 0.2);
  padding-top: 10px;
  padding-left: 10px;
}

.tree-root {
  margin: 0;
  padding: 0;
  margin-bottom: 10px;
}

.marker {
  cursor: pointer;
  border: 0;
  background: none;
}
</style>
