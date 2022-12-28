<script setup lang="ts">
import { useField } from "vee-validate";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
});

const name = toRef(props, "name");

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.value,
});
</script>

<template>
  <label class="mb-2" :for="name">{{ label }} *</label>
  <input
    class="input"
    :class="{ 'has-error': errorMessage }"
    :name="name"
    :id="name"
    :type="type"
    :value="inputValue"
    @input="handleChange"
  />
  <span class="text-red-500 dark:text-[#FCA5A5]" v-show="errorMessage">{{
    errorMessage
  }}</span>
</template>
