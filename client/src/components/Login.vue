<template>
  <div class="login-container">
    <div class="login-box">
      <h1 class="title">User Login</h1>
      <form v-on:submit.prevent="onLogin">
        <div class="input-group">
          <label for="email" class="input-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            v-model="email"
            required
            class="input-field"
          />
        </div>
        <div class="input-group">
          <label for="password" class="input-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            v-model="password"
            required
            class="input-field"
          />
        </div>
        <button type="submit" class="login-button">Login</button>
        <div class="error" v-if="error">{{ error }}</div>
        <div class="links">
          <a><router-link :to="{ name: 'user-create' }" class="signup-button">Create Your Account</router-link></a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AuthenService from "../services/AuthenService";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async onLogin() {
      try {
        const response = await AuthenService.login({
          email: this.email,
          password: this.password,
        });

        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);

        this.$router.push({
          name: "users",
        });
      } catch (error) {
        console.log(error);
        this.error = error.response.data.error;
        this.email = "";
        this.password = "";
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #f3b8d1, #b9dff5, #d0b9f5);
}

.login-box {
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
  border-color: linear-gradient(135deg, #8EC5FC, #E0C3FC);
}

.login-button {
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

.login-button:hover {
  background: white;
  color: #8EC5FC;
}

.error {
  color: red;
  margin-top: 0.5rem;
}

.links {
  margin-top: 1rem;
  font-size: 0.9rem;
}

.forgot-link,
.create-account-link {
  color: linear-gradient(135deg, #f3b8d1, #b9dff5, #d0b9f5);
  text-decoration: none;
  display: block;
  margin-top: 0.5rem;
}

.forgot-link:hover,
.create-account-link:hover {
  text-decoration: underline;
}
</style>
