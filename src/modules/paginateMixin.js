import _ from 'lodash'

export default {
  data() {
    return {
      page: +this.$route.query.page || 1,
      pageSize: 3,
      pageCount: 0,
      allItems: [],
      tasks: [],
      selectedItem: 'all',
    }
  },
  methods: {
    setupPagination(allItems) {
      this.allItems = _.chunk(allItems, this.pageSize)
      this.pageCount = _.size(this.allItems)
      this.tasks = this.allItems[this.page - 1] || this.allItems[0]
    },
    pageChangeHandler(page) {
      this.$router.push(
        `${this.$route.path}?page=${page}&cat=${this.selectedItem}`
      )
      this.tasks = this.allItems[page - 1] || this.allItems[0]
    },
  },
}
