<template>
  <div class="edit-user-container">
    <h1>Edit User</h1>
    <form v-on:submit.prevent="editUser" class="edit-user-form">
      <div class="form-group">
        <label>Name:</label>
        <input type="text" v-model="user.name" placeholder="Enter first name">
      </div>
      <div class="form-group">
        <label>Lastname:</label>
        <input type="text" v-model="user.lastname" placeholder="Enter last name">
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="email" v-model="user.email" placeholder="Enter email address">
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="password" v-model="user.password" placeholder="Enter password">
      </div>
      <div class="button-group">
        <button type="submit" class="submit-button">Edit</button>
      </div>
    </form>
  </div>
</template>

<script>
import UsersService from '../../services/UsersService';
export default {
  data() {
    return {
      user: {
        name: '',
        lastname: '',
        email: '',
        password: '',
        status: 'active'
      }
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
  methods: {
    async editUser() {
      try {
        await UsersService.put(this.user);
        this.$router.push('/users');
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
.edit-user-container {
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

.edit-user-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: bold;
  color: #555;
  margin-bottom: 5px;
}

.form-group input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  font-size: 1em;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  border-color: #888;
}

.button-group {
  text-align: center;
  margin-top: 20px;
}

.submit-button {
  padding: 10px 20px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.submit-button:hover {
  background-color: #000;
  transform: translateY(-2px);
}
</style>
