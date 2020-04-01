<template>
  <div>
    <h1>List</h1>
    <!-- filter -->
    <div class="filter">
      <select ref="select" v-model="filter">
        <option value="" disabled selected>Choose filter</option>
        <option value="active">Active</option>
        <option value="outdated">Autdated</option>
        <option value="completed">Completed</option>
      </select>
      <label>Status filter</label>
    </div>
    <button v-if="filter" class="btn btn-small red" @click="filter = null">Clear</button>
    <!-- filter end-->
    <hr />

    <table v-if="tasks.length">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Date</th>
          <th>Description</th>
          <th>Status</th>
          <th>Open</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, idx) of displayTasks" :key="task.id">
          <td>{{ idx + 1 }}</td>
          <td>{{ task.title }}</td>
          <td>{{ new Date(task.date).toLocaleDateString() }}</td>
          <td class="is_clip">
            <div class="cliptext">{{ task.description }}</div>
          </td>
          <td>{{ task.status }}</td>
          <td>
            <router-link
              tag="button"
              class="btn btn-small"
              :to="'/task/' + task.id"
              >Open</router-link
            >
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>Task list empty</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    filter: null,
  }),
  computed: {
    tasks() {
      return this.$store.getters.tasks;
    },
    displayTasks() {
      return this.tasks.filter(t => {
        if(!this.filter){
          return true
        } else {
          return t.status === this.filter;
        }
      })
    }
  },
  mounted(){
    M.FormSelect.init(this.$refs.select);
  }
};
</script>

<style lang="scss" scoped>
.cliptext {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.is_clip {
  max-width: 250px;
}
.filter{
  max-width: 170px
}
</style>
