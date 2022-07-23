<template>
  <div class="tips-agreement">
    <section class="tips-agreement__grade-info grade-info">
      <h3 class="tips-agreement__title grade-info__title">
        Ваше решение содержит ошибки
      </h3>
      <p class="grade-info__band">
        Оценка за решение: <span>{{ grade }}/10</span>
      </p>
    </section>
    <section class="tips-agreement__agree agree" v-if="!tipsNotAcceptable">
      <h3 class="tips-agreement__title agree__title">
        Желаете ли взять подсказку?
      </h3>
      <Warn class="agree__warn warn-agree" >
        <p class="warn-agree__text" v-if="!tipsUsed">
          Подсказка снижает максимальный балл за задание до <span>7</span>
        </p>
        <p class="warn-agree__text" v-else>
          Функция подсказок уже была использована.
        </p>
      </Warn>
      <button class="agree__btn" @click.stop="$emit('agreeTips')">
        Получить подсказку
      </button>
    </section>
    <Warn class="tips-agreement__tips-not-acceptable" v-else>
        Подсказки недоступны (высокая текущая оценка)
      </Warn>
    <section class="tips-agreement__disagree disagree">
      <p class="disagree__option">Вы можете продолжить/завершить решение</p>
      <div class="disagree__btns">
        <Button class="btn_l disagree__btn" @click.stop="$emit('disagreeTips')">
          Отправить решение
        </Button>
        <Button
          class="btn_l btn_grey disagree__btn"
          @click.stop="this.$emit('closeAgreement')"
        >
          Продолжить решение
        </Button>
      </div>
    </section>
  </div>
</template>

<script>
import Button from "@/components/layout/Button.vue";
import Warn from "@/components/layout/Warn.vue";

export default {
  components: { Button, Warn },
  name: "tips-agreement",
  props: {
    tipsUsed: {
      type: Boolean,
      default: false,
    },
    grade: {
      type: Number,
      default: 0,
    },
    tipsNotAcceptable: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.tips-agreement {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tips-agreement__grade-info {
  margin-bottom: 6px;
  text-align: center;
}
.tips-agreement__title {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 15px;
  margin-bottom: 6px;
  text-align: center;
}
.grade-info__band,
.warn-agree__text,
.disagree__option {
  font-family: "Roboto", sans-serif;
  font-size: 15px;
  color: var(--dark-grey);
}
.grade-info__band span {
  font-family: "Radio Canada", sans-serif;
  display: inline-block;
  padding: 6px;
  background-color: rgba(var(--light-blue-rgb), 0.3);
  color: var(--light-blue);
  border-radius: 12px;
}
.warn-agree__text span {
  font-family: "Radio Canada", sans-serif;
  color: var(--dark);
}
.agree {
  display: flex;
  flex-direction: column;
}
.agree__btn {
  margin-top: 6px;
  background-color: var(--red);
  color: var(--white);
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  border: none;
  padding: 6px 18px;
  border-radius: 12px;
  transition: all 0.3s ease;
  align-self: center;
}
.agree__btn:hover {
  background-color: var(--dark-red);
  transform: scale(0.98);
}
.tips-agreement__agree {
  margin-bottom: 12px;
}
.tips-agreement__tips-not-acceptable {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 15px;
  color: var(--dark-red);
  text-align: center;
  margin: -6px 0 12px;
}
.disagree__option {
  margin-bottom: 6px;
  text-align: center;
  font-size: 14px;
}
.disagree__btns {
  display: flex;
}
.disagree__btn:not(:last-of-type) {
  margin-right: 72px;
}
</style>