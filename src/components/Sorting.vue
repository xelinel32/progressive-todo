<template>
  <div class="sorting row">
    <div class="col">
      <select ref="filter" v-model="selected" @change="setFilterTable">
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="outdated">Outdated</option>
      </select>
      <label>Materialize Select</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sorting',
  data: () => ({
    select: null,
    selected: 'all',
  }),
  methods: {
    setFilterTable() {
      this.$emit('setFilterFor', this.selected)
    },
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.filter, {
      classes: 'filter'
    })
    this.setFilterTable()
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
}
</script>

<style scoped>
.sorting {
  margin-top: 2rem;
}
</style>
