<template>
    <div class="stp-delete-link">
        <h4 class="stp-delete-link__title">
            {{ delete_link_text }}
        </h4>
        <div class="stp-delete-link__btns">
            <Button class="stp-delete-link__btn" @click.stop="deleteLink">
                Да
            </Button>
            <Button class="btn_grey stp-delete-link__btn" @click.stop="cancelDelete">
                Отмена
            </Button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Button from '../../layout/Button.vue';

export default {
  components: { Button },
    name: 'stp-delete-link',
    methods: {
       deleteLink() {
           this.$emit('deleteLink', true);
       },
       cancelDelete() {
           this.$emit('deleteLink', false);
       }
    },
    computed: {
        ...mapGetters({
            getTextOfTask: "langs/getTextOfTask",
        }),
        delete_link_text() {
            return this.getTextOfTask("stp", "delete_link_text");
        }
    }
}
</script>

<style scoped>
.stp-delete-link {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.stp-delete-link__title {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 24px;
}
.stp-delete-link__btns {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 12px;
}
.stp-delete-link__btn {
    flex: 0 1 30%;
}
.stp-delete-link__btn:not(:last-of-type) {
    margin-right: 36px;
}
</style>