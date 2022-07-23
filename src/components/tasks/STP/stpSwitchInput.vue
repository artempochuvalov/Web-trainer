<template>
  <input
    class="stp-switch-input"
    @input="validateInput"
    :value="device"
    maxlength="1"
    id="switches-search-input"
  />
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "stp-switch-input",
  props: {
    device: {
      required: true,
      default: null,
      validator: (prop) =>
        typeof prop === "string" || prop === null || typeof prop === "number",
    },
  },
  methods: {
    validateInput(evt) {
      evt.target.value = evt.target.value.replace(/[^\d]/g, "");
      if (evt.target.value >= this.connectionsSize) {
        evt.target.value = "";
      }

      if (evt.target.value === "") {
        this.$emit("update:device", null);
      } else {
        this.$emit("update:device", evt.target.value);
      }
    },
  },
  computed: {
    ...mapGetters({
      connectionsSize: "stp/connectionsSize",
    }),
  },
};
</script>

<style scoped>
.stp-switch-input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 0;
  border: none;
  height: 36px;
  width: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 14px;
  font-family: "Radio Canada";
  background-color: var(--white);
  border: 2px solid var(--grey);
  color: var(--dark);
}
</style>