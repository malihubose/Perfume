<template>
  <div class="user-details-container">
    <h1>Show User</h1>
    <div class="user-info">
      <p><span>ID:</span> {{ user.id }}</p>
      <p><span>Name:</span> {{ user.name }}</p>
      <p><span>Lastname:</span> {{ user.lastname }}</p>
      <p><span>Email:</span> {{ user.email }}</p>
      <p><span>Password:</span> {{ user.password }}</p>
    </div>
  </div>
</template>

<script>
import UsersService from "@/services/UsersService";

export default {
  data() {
    return {
      user: {}
    };
  },
  async created() {
    try {
      const userId = this.$route.params.userId;
      this.user = (await UsersService.show(userId)).data;
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style scoped>
.user-details-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  font-size: 2em;
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.user-info p {
  font-size: 1em;
  color: #555;
  margin: 10px 0;
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.user-info span {
  font-weight: bold;
  color: #333;
  display: inline-block;
  width: 100px;
}
</style>
