<template>
    <a-modal
      :title="`Update Leave`"
      v-model="visible"
      @ok="handleUpdate"
      @cancel="handleCancel"
    >
      <a-form ref="updateForm" :model="updatedLeave">
        <a-form-item label="User_ID" :rules="[{ required: true, message: 'Please select user' }]">
          <a-select v-model="updatedLeave.user_id" placeholder="Select user"> 
            <a-select-option v-for="user in userList" :key="user.user_id" :value="user.user_id">
              {{ user.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Start Date" :rules="[{ required: true, message: 'Please enter start date' }]">
          <a-date-picker v-model="updatedLeave.start_date" format="DD-MM-YYYY" />
        </a-form-item>
        <a-form-item label="End Date" :rules="[{ required: true, message: 'Please enter end date' }]">
          <a-date-picker v-model="updatedLeave.end_date" format="DD-MM-YYYY" />
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
  import moment from 'moment';
  
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
  
          // Kiểm tra và định dạng lại ngày tháng từ API nếu cần
          this.userList = response.Items.map(user => {
            if (user.start_date) {
              user.start_date = moment(user.start_date, 'DD-MM-YYYY').format('DD-MM-YYYY');
            }
            if (user.end_date) {
              user.end_date = moment(user.end_date, 'DD-MM-YYYY').format('DD-MM-YYYY');
            }
            return user;
          }) || [];
        } catch (error) {
          console.error('Error fetching user list:', error);
        }
      },
      handleUpdate() {
        
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
  