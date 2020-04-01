<template>
  <div class="row">
    <div class="col s6 offset-s3" v-if="task">
      <h1>{{ task.title }}</h1>
      <form @submit.prevent="submitHandler">
        <div class="chips is_disable" ref="chips"></div>
        <div class="input-field">
          <textarea
            v-model="description"
            id="description"
            class="materialize-textarea"
          ></textarea>
          <label for="description">Description</label>
          <span class="character-counter" style="float: right; font-size: 12px;"
            >{{ description.length }}/1337</span
          >
        </div>
        <input type="text" ref="datepicker" />
        <br />
        <br />
        <button class="btn primary__btn" type="submit">Update</button>
        <button class="btn blue" type="button" @click="completeTask">Complete task</button>
      </form>
    </div>
    <p v-else>Task not found</p>
  </div>
</template>

<script>
export default {
  computed: {
    task() {
      return this.$store.getters.taskById(Number(this.$route.params.id)); // when id in string format
    }
  },
  name: 'create',
  data: () => ({
    description: '',
    chips: null,
    date: null
  }),
  mounted() {
    this.description = this.task.description;
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: 'Tast tags',
      data: this.task.tags
    }),
    this.date = M.Datepicker.init(this.$refs.datepicker, {
        format: 'dd.mm.yyyy',
        defaultDate: new Date(this.task.date),
        setDefaultDate: true
    }),
    setTimeout(() => {
      M.updateTextFields()
    }, 0)
  },
  methods: {
    submitHandler() {
      this.$store.dispatch('updateTask', {
        id: this.task.id,
        description: this.description,
        date: this.date.date
      });
      this.$router.push('/list');
    },
    completeTask() {
      this.$store.dispatch('completeTask', this.task.id)
      this.$router.push('/list')
    }
  },
  destroyed() {
    if (this.date && this.date.destroy) {
      this.date.destroy();
    }
    if (this.chips && this.chips.destroy) {
      this.chips.destroy();
    }
  }
};
</script>

<style lang="scss" scoped>
.is_disable {
  pointer-events: none;
  opacity: 0.8;
}
.primary__btn{
  margin-right: 10px;
}
</style>
