<template>
  <span class="go-back">
    <button @click="goback">Go Back</button>
  </span>
</template>

<script>
  export default{
    methods: {
      goback() {
        return this.$router.go(-1)

      }
    }
  };
</script>
