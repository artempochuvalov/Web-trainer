<template>
    <div class="stp-restore-link">
        <h4 class="stp-restore-link__title">
           {{ restore_link_text }}
        </h4>
        <div class="stp-restore-link__btns">
            <Button class="stp-restore-link__btn" @click.stop="restoreLink">
                Да
            </Button>
            <Button class="btn_grey stp-restore-link__btn" @click.stop="cancelRestore">
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
    name: 'stp-restore-link',
    methods: {
       restoreLink() {
           this.$emit('restoreLink', true);
       },
       cancelRestore() {
           this.$emit('restoreLink', false);
       }
    },
    computed: {
        ...mapGetters({
            getTextOfTask: "langs/getTextOfTask",
        }),
        restore_link_text() {
            return this.getTextOfTask("stp", "restore_link_text");
        }
    }
}
</script>

<style scoped>
.stp-restore-link {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.stp-restore-link__title {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 24px;
}
.stp-restore-link__btns {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 12px;
}
.stp-restore-link__btn {
    flex: 0 1 30%;
}
.stp-restore-link__btn:not(:last-of-type) {
   margin-right: 36px;
}

</style>