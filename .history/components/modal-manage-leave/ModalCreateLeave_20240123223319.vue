<template>
    <div>
      <a-button type="primary" @click="showModal">
        Create leave application
      </a-button>
      <a-modal v-model="visible" title="Create" @ok="handleOk">
        <a-form ref="form">
          <a-form-item label="Name User" :rules="[{ required: true, message: 'Please select user' }]">
            <a-select v-model="selectedUserId" placeholder="Select user">
              <a-select-option v-for="user in userList" :key="user.user_id" :value="user.user_id">
                {{ user.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="Start Date" :rules="[{ required: true, message: 'Please enter start date' }]">
            <a-date-picker v-model="startDate" />
          </a-form-item>
          <a-form-item label="End Date" :rules="[{ required: true, message: 'Please enter end date' }]">
            <a-date-picker v-model="endDate" />
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
        selectedUserId: null,
        startDate: null,
        endDate: null,
        userList: [],
      };
    },
    methods: {
      async showModal() {
        // Call the API to get the list of users
        try {
          const response = await this.$http.$get('https://86x07hia9j.execute-api.us-east-1.amazonaws.com/Dev/list_users');
        //   console.log(response);
          this.userList = response.Items || [];
        } catch (error) {
          console.error('Error fetching user list:', error);
        }
  
        this.visible = true;
      },
      handleOk() {
        // Validate and handle form submission
        this.$refs.form.validate(valid => {
          if (valid) {
            // Perform your action here
            console.log('User_ID:', this.selectedUserId);
            console.log('Start Date:', this.startDate);
            console.log('End Date:', this.endDate);
  
            // Close modal
            this.visible = false;
          }
        });
      },
    },
  };
  </script>
  