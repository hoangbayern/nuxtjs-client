<!-- components/Header.vue -->
<template>
  <a-layout-header>
    <a-menu theme="dark" mode="horizontal" :selected-keys="selectedKeys">
      <a-menu-item key="/"><nuxt-link to="/">Home</nuxt-link></a-menu-item>
      <a-menu-item key="/list-users" v-if="isLoggedIn"><nuxt-link to="/list-users">List Users</nuxt-link></a-menu-item>
      <a-menu-item key="/register"><nuxt-link to="/register">Register</nuxt-link></a-menu-item>
      <a-menu-item key="/login" v-if="!isLoggedIn"><nuxt-link to="/login">Login</nuxt-link></a-menu-item>
      <a-menu-item v-if="isLoggedIn" @click="handleLogout">Logout ({{ username }})</a-menu-item>
    </a-menu>
  </a-layout-header>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('auth', ['isLoggedIn', 'username']),
    selectedKeys() {
      return [this.$route.path];
    },
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('auth/logout')
        .then(() => {
          // Chuyển hướng sau khi đăng xuất thành công
          this.$router.push('/login');
        })
        .catch((error) => {
          console.error('Lỗi đăng xuất:', error);
        });
    },
  },
};
</script>

<style scoped>
a-layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #001529;
  padding: 0 20px;
}

a-menu-item {
  margin: 0;
}

a-menu {
  line-height: 64px;
}

a-menu-item:hover {
  border-bottom: 2px solid #1890ff;
}

a-menu-item a {
  color: white;
}

a-menu-item a:hover {
  color: #1890ff;
}
</style>
