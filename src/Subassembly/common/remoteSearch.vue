<template>
  <div>
    <input :value="value" @input="$emit('input', $event.target.value)" />
    <div class="scroll_bar">
      <ul class="list">
        <li></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  model: {
    prop: "value",
    event: "input",
  },
  props: {},
};
</script>