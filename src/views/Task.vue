<template>
  <div class="row">
    <div class="col m12">
      <h3 class="text-flow orange-text">Name - {{ curTask.name }}</h3>
      <form @submit.prevent="onUpdate">
        <div class="chips input-field is-disabled" ref="chips">
          <input class="input validate" />
        </div>
        <div class="input-field">
          <textarea
            id="description"
            class="materialize-textarea"
            v-model="description"
          >
          </textarea>
          <span
            class="character-counter"
            style="float: right; font-size: 12px;"
          >
            {{ description.length }} / 2048</span
          >
          <label for="description">Description</label>
        </div>
        <div class="input-field">
          <input type="text" class="datepicker" ref="datepicker" />
        </div>
        <div v-if="curTask.status != 'outdated'">
        <button type="submit" class="btn btn-small orange waves-effect">
          Update
        </button>
        <button
          type="button"
          @click="updStatus(curTask.id)"
          style="margin-left: 1rem"
          class="btn btn-small green waves-effect"
        >
          Complete
        </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Task',
  data: () => ({
    curTask: {},
    description: '',
    date: null,
    chips: null,
  }),
  computed: {
    isValidTextarea() {
      return this.curTask.length > 2048 ? 'invalid' : ''
    },
  },
  methods: {
    onUpdate() {
      if (this.description && this.date && this.chips) {
        const formData = {
          id: this.curTask.id,
          name: this.curTask.name,
          status: this.curTask.status,
          description: this.description,
          date: this.date.date,
          tags: this.chips.chipsData,
        }
        this.$store.dispatch('updateData', formData)
        this.$router.push('/list')
      }
    },
    updStatus(id) {
      this.$store.dispatch('updateStatus', id)
      this.$router.push({ name: 'List' })
    },
  },
  async created() {
    if (this.$route.params.id) {
      await this.$store
        .dispatch('fetchTaskById', this.$route.params.id)
        .then(task => {
          this.curTask = task
          this.description = task.description
          this.chips = M.Chips.init(this.$refs.chips, {
            data: this.curTask.tags,
          })
          this.date = M.Datepicker.init(this.$refs.datepicker, {
            autoClose: true,
            format: 'mm.dd.yyyy',
            defaultDate: new Date(this.curTask.date),
            setDefaultDate: true,
          })
          setTimeout(() => {
            M.updateTextFields()
          }, 0)
        })
    }
  },
  destroyed() {
    if (this.date && this.date.destroy) {
      this.date.destroy()
    }
    if (this.chips && this.chips.destroy) {
      this.chips.destroy()
    }
  },
}
</script>

<style lang="scss" scoped>
.is-disabled {
  pointer-events: none;
}
</style>
