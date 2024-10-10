<template>
  <div class="create-user-container">
    <div class="create-user-box">
      <h1 class="title">Create User</h1>
      <form v-on:submit.prevent="createUser">
        <div class="input-group">
          <label for="name" class="input-label">Name</label>
          <input type="text" id="name" v-model="user.name" required class="input-field" />
        </div>
        <div class="input-group">
          <label for="lastname" class="input-label">Lastname</label>
          <input type="text" id="lastname" v-model="user.lastname" required class="input-field" />
        </div>
        <div class="input-group">
          <label for="email" class="input-label">Email</label>
          <input type="email" id="email" v-model="user.email" required class="input-field" />
        </div>
        <div class="input-group">
          <label for="password" class="input-label">Password</label>
          <input type="password" id="password" v-model="user.password" required class="input-field" />
        </div>
        <button type="submit" class="create-button">Create User</button>
      </form>
    </div>
  </div>
</template>

<script>
import UsersService from "../../services/UsersService";

export default {
  data() {
    return {
      user: {
        name: "",
        lastname: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async createUser() {
      try {
        // Submit new user data to the API via UsersService
        await UsersService.post(this.user);
        // Redirect to the user list page upon success
        this.$router.push("/login");
      } catch (err) {
        // Log errors to the console if any issue arises
        console.log("Error:", err);
      }
    },
  },
};
</script>

<style scoped>
.create-user-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #f3b8d1, #b9dff5, #d0b9f5);
}

.create-user-box {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.input-group {
  margin-bottom: 1rem;
}

.input-label {
  display: block;
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 0.3rem;
  text-align: left;
}

.input-field {
  width: 100%;
  padding: 0.7rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.3s;
}

.input-field:focus {
  border-color: #8EC5FC;
}

.create-button {
  background: linear-gradient(135deg, #8EC5FC, #E0C3FC);
  color: white;
  padding: 0.7rem;
  font-size: 1rem;
  font-weight: bold;
  border: 1px solid #E0C3FC;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
  width: 100%;
  margin-top: 1rem;
}

.create-button:hover {
  background: white;
  color: #8EC5FC;
}
</style>
