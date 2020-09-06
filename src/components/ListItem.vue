<template>
  <tr>
    <td>
      <slot name="counter"></slot>
    </td>
    <td>{{ task.name }}</td>
    <td>{{ task.description }}</td>
    <td>{{ task.date | dateFilter }}</td>
    <td>
      <span :class="statusColor">{{ task.status }}</span>
    </td>
    <td>
      <router-link
        :to="{ name: 'Task', params: { id: task.id } }"
        class="btn red waves-effect btn-small hoverable"
        v-tooltip="'open'"
      >
        <i class="material-icons">
          launch
        </i>
      </router-link>
    </td>
  </tr>
</template>

<script>
import dateFilter from '@/modules/dateFilter'
export default {
  name: 'ListItem',
  props: {
    task: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  computed: {
    statusColor() {
      return this.task.status === 'active' ? 'green-text' : 'orange-text'
    },
  },
  filters: { dateFilter },
}
</script>

<style lang="scss" scoped></style>
