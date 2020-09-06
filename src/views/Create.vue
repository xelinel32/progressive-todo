<template>
  <div class="row">
    <div class="col m6 s12 offset-m3">
      <h4 class="flow-text">Create task</h4>
      <submit-form @savedData="queryData">
        <template #buttons>
          <button
            class="btn waves-effect waves-light green"
            type="submit"
            name="action"
          >
            Submit
            <i class="material-icons right">send</i>
          </button>
        </template>
      </submit-form>
    </div>
  </div>
</template>

<script>
import submitForm from '@/components/SubmitForm.vue'
export default {
  name: 'Create',
  data: () => ({}),
  components: { submitForm },
  methods: {
    async queryData(data) {
      await this.$store.dispatch('sendData', data).then(() => {
        this.$message('Task is added!')
        this.$router.push('/list')
      })
    },
  },
}
</script>
