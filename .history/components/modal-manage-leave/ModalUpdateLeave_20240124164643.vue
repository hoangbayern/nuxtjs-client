<template>
    <a-modal
      :title="`Update Leave`"
      v-model="visible"
      @ok="handleUpdate"
      @cancel="handleCancel"
    >
      <a-form ref="updateForm" :model="updatedLeave">
  
        <a-form-item label="User_ID" :rules="[{ required: true, message: 'Please select user' }]">
          <a-select v-model="updatedLeave.user_id" placeholder="Select user" :default-value="updatedLeave.name"> 
            <a-select-option v-for="user in userList" :key="user.user_id" :value="user.user_id">
              {{ user.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Start Date" :rules="[{ required: true, message: 'Please enter start date' }]">
  <a-date-picker v-model="updatedLeave.start_date" format="YYYY-MM-DD" />
</a-form-item>
<a-form-item label="End Date" :rules="[{ required: true, message: 'Please enter end date' }]">
  <a-date-picker v-model="updatedLeave.end_date" format="YYYY-MM-DD" />
</a-form-item>
      <a-form-item label="Reason" :rules="[{ required: true, message: 'Please enter reason' }]">
        <a-textarea v-model="updatedLeave.leave_reason" />
      </a-form-item>
      <a-form-item label="Status" :rules="[{ required: true, message: 'Please select status' }]">
        <a-select v-model="updatedLeave.status" placeholder="Select status">
          <a-select-option value="pending">Pending</a-select-option>
          <a-select-option value="confirmed">Confirmed</a-select-option>
          <a-select-option value="rejected">Rejected</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Author" :rules="[{ required: true, message: 'Please enter author' }]">
        <a-input v-model="updatedLeave.author" />
      </a-form-item>
  
        <template #footer>
          <div>
            <a-button @click="handleCancel">Cancel</a-button>
            <a-button type="primary" @click="handleUpdate">Update</a-button>
          </div>
        </template>
      </a-form>
    </a-modal>
  </template>
  
  <script>
  export default {
    props: {
      visible: Boolean,
      leave: Object,
    },
    data() {
      return {
        updatedLeave: { ...this.leave },
        userList: [],
      };
    },
    async created() {
      // Gọi API để lấy danh sách user và gán vào userList
      await this.fetchUserList();
    },
    methods: {
      async fetchUserList() {
        try {
          const response = await this.$http.$get(
            'https://86x07hia9j.execute-api.us-east-1.amazonaws.com/Dev/list_users'
          );
          this.userList = response.Items || [];
        } catch (error) {
          console.error('Error fetching user list:', error);
        }
      },
      handleUpdate() {
        // Gọi phương thức updateLeave trong thành phần cha và truyền đối tượng cập nhật
        this.$emit('updateLeave', this.updatedLeave);
  
        // Đóng modal
        this.handleCancel();
      },
      handleCancel() {
        // Đóng modal khi nhấn Cancel
        this.$emit('cancel');
      },
    },
  };
  </script>
  