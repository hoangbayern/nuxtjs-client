<template>
    <div>
      <a-button type="primary" @click="showModal">
        Open Modal
      </a-button>
      <a-modal v-model="visible" title="Basic Modal" @ok="handleOk">
        <a-form>
          <a-form-item label="Username" :rules="[{ required: true, message: 'Please enter username' }]">
            <a-input />
          </a-form-item>
          <a-form-item label="Email" :rules="[{ required: true, message: 'Please enter email' }]">
            <a-input/>
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
      };
    },
    methods: {
      showModal() {
        this.visible = true;
      },
      handleOk(e) {
        console.log(e);
        this.visible = false;
      },
    },
  };
  </script>
  