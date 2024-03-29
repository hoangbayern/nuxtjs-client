<template>
  <a-table :columns="columns" :dataSource="users" rowKey="leave_id">
    <template v-slot:action="text">
      <a-button type="link" @click="editUser(text)">Edit</a-button>
      <a-button type="link" @click="showUser(text)">Show</a-button>
      <a-button type="link" @click="deleteUser(text)">Delete</a-button>
      <ModalUpdateLeave
        :visible="updateModalVisible"
        :leave="selectedLeave"
        v-if="selectedLeave"
        @updateLeave="updateLeave"
        @cancel="closeUpdateModal"
      />
      <!-- <ModalUpdateUser :user="selectedUserUpdate" v-if="selectedUserUpdate" :visible="editModalVisible" @cancel="closeEditModal" @close="closeEditModal" @update="updateUser" /> -->
      <a-modal
        v-if="selectedUser"
        :title="`User Information - ID: ${selectedUser.leave_id || ''}`"
        v-model="visible"
        @cancel="closeModal"
        @ok="closeModal"
      >
        <p>User_ID: {{ selectedUser.user_id }}</p>
        <p>Start Date: {{ selectedUser.start_date }}</p>
        <p>End Date: {{ selectedUser.end_date }}</p>
        <p>Reason: {{ selectedUser.leave_reason }}</p>
        <p>Status: {{ selectedUser.status }}</p>
      </a-modal>
    </template>
    <template v-slot:status="text">
      <span :class="getStatusColor(text)">{{ text }}</span>
    </template>
    <template v-slot:leave_reason="text">
      {{ text.slice(0, 20) + (text.length > 20 ? "..." : "") }}
    </template>
  </a-table>
</template>

<script>
import { Table, Button, Modal, message } from "ant-design-vue";
import moment from 'moment';

export default {
  components: {
    "a-table": Table,
    "a-button": Button,
    "a-modal": Modal,
  },
  props: {
    users: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      columns: [
        {
          title: "ID",
          dataIndex: "leave_id",
          key: "leave_id",
        },
        {
          title: "User_ID",
          dataIndex: "user_id",
          key: "user_id",
        },
        {
          title: "Start_Date",
          dataIndex: "start_date",
          key: "start_date",
        },
        {
          title: "End_Date",
          dataIndex: "end_date",
          key: "end_date",
        },
        {
          title: "Reason",
          dataIndex: "leave_reason",
          key: "leave_reason",
          scopedSlots: { customRender: "leave_reason" },
        },
        {
          title: "Status",
          dataIndex: "status",
          key: "status",
          scopedSlots: { customRender: "status" },
        },
        {
          title: "Actions",
          key: "action",
          scopedSlots: { customRender: "action" },
        },
      ],
      visible: false,
      selectedUser: null,
      updateModalVisible: false,
      selectedLeave: null,
    };
  },
  methods: {
    editUser(user) {
      if (user.start_date) {
        user.start_date = moment(user.start_date, 'DD-MM-YYYY').format('DD-MM-YYYY');
      }
      if (user.end_date) {
        user.end_date = moment(user.end_date, 'DD-MM-YYYY').format('DD-MM-YYYY');
      }
      this.selectedLeave = user;
      this.updateModalVisible = true;
      console.log(user);
    },
    showUser(user) {
      this.visible = true;
      this.selectedUser = user;
      console.log(user);
    },
    deleteUser(user) {
      Modal.confirm({
        title: "Confirm Delete",
        content: "Are you sure you want to delete this user?",
        onOk: async () => {
          console.log("Delete user:", user.leave_id);
          try {
            const response = await this.$http.$delete(
              "https://86x07hia9j.execute-api.us-east-1.amazonaws.com/Dev/leave/delete_leave?leave_id=" +
                user.leave_id
            );

            console.log(response);
            if (response.message) {
              message.success(response.message);
            }
            location.reload();
          } catch (error) {
            console.error("Delete User Error:", error);
            message.error("Error deleting user. Please try again.");
          }
        },
      });
    },
    closeModal() {
      this.visible = false;
      this.selectedUser = null;
    },
    closeUpdateModal() {
      this.updateModalVisible = false;
      this.selectedLeave = null;
    },
    updateLeave(updatedLeave) {
      // Xử lý sau khi đơn xin nghỉ phép được cập nhật
      // updatedLeave là đối tượng đã được cập nhật
      console.log("Updated Leave:", updatedLeave);

      // Đóng modal cập nhật
      this.closeUpdateModal();
    },
    getStatusColor(status) {
      switch (status) {
        case "pending":
          return "status-pending";
        case "confirmed":
          return "status-confirmed";
        case "rejected":
          return "status-rejected";
        default:
          return "";
      }
    },
  },
};
</script>

<style scoped>
.status-pending {
  color: rgb(51, 51, 51);
  background-color: #ffd700;
  padding: 8px 12px;
  margin: 3px 3px;
  border-radius: 4px;
  display: inline-block;
}

.status-confirmed {
  color: white;
  background-color: #52c41a;
  padding: 8px 12px;
  margin: 3px 3px;
  border-radius: 4px;
  display: inline-block;
}

.status-rejected {
  color: white;
  background-color: #f5222d;
  padding: 8px 12px;
  margin: 3px 3px;
  border-radius: 4px;
  display: inline-block;
}
</style>
