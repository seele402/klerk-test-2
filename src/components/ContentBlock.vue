<template>
  <div class="main-container">
    <label class="empty-rubrics-checkbox">
      <input type="checkbox" v-model="rubricsStore.allowEmpty" />
      Показывать пустые рубрики
    </label>

    <div>Сумма отмеченных элементов: {{ rubricsStore.checkedRubricsSum }}</div>

    <div class="rubric-category" @click="isExpanded = !isExpanded">
      {{ !isExpanded ? "&gt;" : "&lt;" }}
      Рубрики
    </div>

    <div v-show="isExpanded">
      <template v-if="rubricsStore.isLoading">Загрузка...</template>
      <template v-else>
        <RubricTree
          v-for="rubric in rubricsStore.rubrics"
          :key="rubric.url"
          :rubric="rubric"
          class="rubric-tree"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRubricsStore } from "../stores/rubrics";
import RubricTree from "./RubricTree.vue";

const rubricsStore = useRubricsStore();
const isExpanded = ref(true);
</script>

<style scoped lang="scss">
.main-container {
  top: 100px;
  min-width: 600px;
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  padding: 24px;
  border-radius: 10px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.08);

  .empty-rubrics-checkbox {
    cursor: pointer;
    margin-bottom: 15px;
  }

  .rubric-category {
    margin: 10px 0;
    cursor: pointer;
  }
  .rubric-tree {
    padding-left: 10px;
  }
}
</style>
