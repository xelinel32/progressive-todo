export default {
  data() {
    return {
      date: null,
      chips: null,
    }
  },
  computed: {
    isValidTextarea() {
      return this.description.length > 2048 ? 'invalid' : ''
    },
  },
  mounted() {
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      autoClose: true,
      format: 'mm.dd.yyyy',
      defaultDate: new Date(),
      setDefaultDate: true,
    })
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: 'Tags',
      secondaryPlaceholder: 'Add',
      limit: 5,
    })
    setTimeout(() => {
      M.updateTextFields()
    }, 0)
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
