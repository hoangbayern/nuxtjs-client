<template>
  <div>
    <a-button type="primary" @click="showModal">
      Create leave application
    </a-button>
    <a-modal v-model="visible" width="700" title="Create" @ok="handleOk">
      <a-form ref="formModel" v-model="form">
        <a-form-item label="Name User" :rules="[{ required: true, message: 'Please select user' }]">
          <a-select v-model="form.selectedUserId" placeholder="Select user">
            <a-select-option v-for="user in userList" :key="user.user_id" :value="user.user_id">
              {{ user.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Start Date" :rules="[{ required: true, message: 'Please enter start date' }]">
          <a-date-picker v-model="form.startDate" />
        </a-form-item>
        <a-form-item label="End Date" :rules="[{ required: true, message: 'Please enter end date' }]">
          <a-date-picker v-model="form.endDate" />
        </a-form-item>
        <a-form-item label="Reason" :rules="[{ required: true, message: 'Please enter reason' }]">
          <a-textarea v-model="form.reason" />
        </a-form-item>
        <a-form-item label="Status" :rules="[{ required: true, message: 'Please select status' }]">
          <a-select v-model="form.status" placeholder="Select status">
            <a-select-option value="pending">Pending</a-select-option>
            <a-select-option value="confirmed">Confirmed</a-select-option>
            <a-select-option value="rejected">Rejected</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      form: {
        selectedUserId: null,
        startDate: null,
        endDate: null,
        reason: null,
        status: null,
      },
      userList: [],
      createdUser: {
        user_id: null,
        name: null,
      },
    };
  },
  methods: {
    async showModal() {
      try {
        const response = await this.$http.$get('https://86x07hia9j.execute-api.us-east-1.amazonaws.com/Dev/list_users');
        this.userList = response.Items || [];
      } catch (error) {
        console.error('Error fetching user list:', error);
      }

      this.visible = true;
    },
    handleOk() {
      this.$refs.formModel.validate(valid => {
        if (valid) {
          // Find the selected user based on user_id
          const selectedUser = this.userList.find(user => user.user_id === this.form.selectedUserId);

          // Update createdUser with the selected user's information
          this.createdUser.user_id = selectedUser.user_id;
          this.createdUser.name = selectedUser.name;

          console.log('Created User:', this.createdUser);
          console.log('Start Date:', this.form.startDate);
          console.log('End Date:', this.form.endDate);
          console.log('Reason:', this.form.reason);
          console.log('Status:', this.form.status);

          // Close modal
          this.visible = false;
        }
      });
    },
  },
};
</script>
