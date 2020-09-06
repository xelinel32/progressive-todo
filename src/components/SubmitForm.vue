<template>
  <form @submit.prevent="onSubmit">
    <div class="input-field">
      <input
        placeholder="Name"
        id="name"
        type="text"
        class="validate"
        v-model="name"
      />
      <label for="name">Name</label>
      <span class="helper-text error" data-error="error" data-success="Success">
        Input name filed
      </span>
    </div>
    <div class="input-field">
      <textarea
        id="description"
        class="materialize-textarea validate"
        :class="isValidTextarea"
        v-model="description"
      ></textarea>
      <label for="description">Description</label>
      <span class="character-counter" style="float: right; font-size: 12px;">
        {{ description.length }} / 2048</span
      >
      <span class="helper-text error" data-error="error" data-success="Success">
        Textarea text filed
      </span>
    </div>
    <div class="chips input-field" ref="chips">
      <input class="input validate" />
    </div>
    <div class="input-field">
      <input type="text" class="datepicker validate" ref="datepicker" />
      <span class="helper-text error" data-error="error" data-success="Success">
        Input date filed
      </span>
    </div>
    <slot name="buttons"></slot>
  </form>
</template>

<script>
import pluginSettings from '@/modules/pluginSettings'
export default {
  name: 'submitForm',
  data: () => ({
    name: '',
    description: '',
  }),
  mixins: [pluginSettings],
  methods: {
    onSubmit() {
      if (this.name && this.description && this.date && this.chips) {
        const formData = {
          id: Date.now(),
          name: this.name,
          status: 'active',
          description: this.description,
          date: this.date.date,
          tags: this.chips.chipsData,
        }
        this.$emit('savedData', formData)
        this.name = this.description = ''
      }
    },
  },
}
</script>

<style lang="scss" scoped>
form {
  margin-top: 60px;
  button {
    margin-right: 15px;
  }
}
</style>
