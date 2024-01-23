<template>
    <div>
      <h1 style="margin-left: 32px; margin-top: 32px;">Leave List</h1>
      <div class="button-container">
        <modal-create-leave/>
    </div>
      <leave-table :users="users" />
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
      };
    },
    async asyncData({ $http }) {
      try {
        const response = await $http.$get('https://86x07hia9j.execute-api.us-east-1.amazonaws.com/Dev/leave/all_leave');
        // console.log(response);
        return { users: response.Items };
      } catch (error) {
        console.error('API Error:', error);
        return { users: [] };
      }
    },
  };
  </script>
  <style scoped>
  .button-container{
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
  margin-right: 32px;
}
  </style>