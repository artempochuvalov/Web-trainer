<template>
  <form class="edit-weigth" @submit.prevent="editWeight">
    <small v-if="!isValid" class="edit-weight__not-valid">заполните поле</small>
    <label class="edit-weight__label" for="edit-weight-input">
      Введите вес соединения
    </label>
    <input
      class="edit-weight__input"
      :class="{ 'edit-weight__input_invalid': !isValid }"
      id="edit-weight-input"
      ref="editWeightInput"
      type="text"
      maxlength="6"
      :value="weight"
      @input="inputWeight"
      @click.stop="isValid = true"
    />
    <Button class="edit-weight__button">Подвердить</Button>
  </form>
</template>
<script>
import Button from "../../layout/Button.vue";

export default {
  name: "edit-weight",
  components: { Button },
  data() {
    return {
      weight: "",
      isValid: true,
    };
  },
  methods: {
    editWeight() {
      if (this.weight === null || this.weight === "") {
        this.isValid = false;
      } else {
        this.$emit("editWeight", this.weight);
      }
      this.weight = "";
    },
    inputWeight(evt) {
      evt.target.value = evt.target.value.replace(/[^\d]/g, "");
      if (+evt.target.value[0] === 0) {
        evt.target.value = "" + evt.target.value.slice(1);
      }
      this.weight = evt.target.value;
    },
  },
  mounted() {
    this.$refs.editWeightInput.focus();
  },
};
</script>
<style scoped>
.edit-weigth {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.edit-weight__not-valid {
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: var(--dark-red);
  margin-bottom: 6px;
}
.edit-weight__label {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 6px;
}
.edit-weight__input {
  width: 192px;
  border-radius: 4px;
  border: none;
  border: 1px solid transparent;
  background-color: var(--grey);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font-size: 14px;
  padding: 6px 12px;
  text-align: center;
  font-family: "Radio Canada";
  color: var(--dark);
  margin-bottom: 24px;
  transition: 0.3s ease border-color;
}
.edit-weight__input_invalid {
  border-color: var(--dark-red);
}
</style>