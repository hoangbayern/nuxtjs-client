<template>
    <div>
      <h1 style="margin-left: 32px; margin-top: 32px;">List Users</h1>
      <div class="button-container">
        <a-button type="primary" class="create-user-button"><nuxt-link to="/users/create">Create User</nuxt-link></a-button>
    </div>
      <user-table :users="users" />
    <ShowModal />
    </div>
  </template>
  
  <script>
  import ShowModal from '../../components/ShowModal.vue';
import UserTable from '../../components/UserTable.vue';


  
  export default {
    components: {
    'user-table': UserTable,
    ShowModal
},
    data() {
      return {
        users: [],
      };
    },
    async asyncData({ $http }) {
      try {
        const response = await $http.$get('https://86x07hia9j.execute-api.us-east-1.amazonaws.com/Dev/list_users');
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