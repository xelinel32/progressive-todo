<template>
  <div class="row">
    <div class="col m12">
      <h4 class="text-flow">List of the tasks</h4>
      <span class="text-flow">Total items - <strong>{{ getTaskLength }}</strong></span>
      <loading v-if="!getTaskLength" isLoading />
      <div v-else>
        <sorting @setFilterFor="setStatusItem" />
        <table class="highlight responsive-table centered">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <list-item v-for="(task, idx) in tasks" :key="idx" :task="task">
              <template #counter>{{ idx + 1 }}</template>
            </list-item>
          </tbody>
        </table>
        <vue-paginate
          v-model="page"
          :page-count="pageCount"
          :click-handler="pageChangeHandler"
          :prev-text="leftBtn"
          :next-text="rightBtn"
          :container-class="'pagination'"
          :page-class="'waves-effect'"
          :active-class="'green active'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import listItem from '@/components/ListItem'
import PaginateMixin from '@/modules/paginateMixin'
import { mapGetters } from 'vuex'
import Sorting from '@/components/Sorting'
export default {
  name: 'List',
  data: () => ({
    sortedElements: [],
  }),
  computed: {
    ...mapGetters([
      'getTaskLength',
      'getTask',
      'getTaskByActive',
      'getTaskByOutdated',
    ]),
    leftBtn() {
      return '<i class="material-icons">chevron_left</i>'
    },
    rightBtn() {
      return '<i class="material-icons">chevron_right</i>'
    }
  },
  components: { listItem, Sorting },
  methods: {
    setStatusItem(status) {
      this.selectedItem = status
      if (status === 'all') {
        this.setupPagination(this.getTask)
      } else if(status === 'active'){
        this.setupPagination(this.getTaskByActive)
      } else if (status === 'outdated') {
        this.setupPagination(this.getTaskByOutdated)
      }
    },
  },
  mixins: [PaginateMixin],
  async created() {
    await this.$store.dispatch('getData')
  },
}
</script>

<style lang="scss" scoped>
.pagination {
  li {
    &.active {
      background-color: lime;
    }
  }
}
</style>
