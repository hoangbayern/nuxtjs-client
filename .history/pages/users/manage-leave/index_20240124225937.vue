<template>
  <div>
    <h1 style="margin-left: 32px; margin-top: 32px;">Leave List</h1>
    <div class="button-container">
      <modal-create-leave />
      <a-select v-model="selectedStatus" style="width: 120px" @change="searchByStatus">
        <a-select-option value="all">All</a-select-option>
        <a-select-option value="pending">Pending</a-select-option>
        <a-select-option value="confirmed">Confirmed</a-select-option>
        <a-select-option value="rejected">Rejected</a-select-option>
      </a-select>
    </div>
    <leave-table :users="filteredUsers" />
  </div>
</template>

<script>
import LeaveTable from '../../../components/LeaveTable.vue';
import ModalCreateLeave from '../../../components/modal-manage-leave/ModalCreateLeave.vue';

export default {
  components: { LeaveTable, ModalCreateLeave },

  data() {
    return {
      users: [],
      selectedStatus: null,
    };
  },
  async asyncData({ $http }) {
    try {
      const response = await $http.$get('https://86x07hia9j.execute-api.us-east-1.amazonaws.com/Dev/leave/all_leave');
      return { users: response.Items };
    } catch (error) {
      console.error('API Error:', error);
      return { users: [] };
    }
  },
  computed: {
    filteredUsers() {
      if (!this.selectedStatus) {
        return this.users;
      }
      return this.users.filter(user => user.status === this.selectedStatus);
    },
  },
  methods: {
    searchByStatus() {
      // Bạn có thể thực hiện các hành động cần thiết khi status thay đổi
      // Ví dụ: gọi API tìm kiếm dựa trên status
    },
  },
};
</script>

<style scoped>
.button-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  margin-right: 32px;
}
</style>
