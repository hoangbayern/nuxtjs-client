<template>
    <a-modal :title="`Leave Edit`" v-model="visible" @cancel="closeModal" @ok="updateUser">
      <a-form :model="editedUser">
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
  </template>
  
  <script>
  import { Modal, Form, Input } from "ant-design-vue";
  
  export default {
    components: {
      "a-modal": Modal,
      "a-form": Form,
      "a-input": Input,
      "a-form-item": Form.Item,
    },
    props: {
      user: {
        type: Object,
        default: () => ({}),
      },
      visible: Boolean,
    },
    data() {
      return {
        editedUser: { ...this.user },
      };
    },
    methods: {
      closeModal() {
        this.$emit("close");
      },
      updateUser() {
        this.$emit("update", this.editedUser);
      },
    },
  };
  </script>
  
  <style scoped></style>
  