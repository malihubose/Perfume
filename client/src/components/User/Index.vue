<template>
  <div class="users-container">
    <h1>Users</h1>
    <div v-if="users.length">
      <div class="user-count"><b>Members:</b> {{ users.length }}</div>
      <div v-for="user in users" :key="user.id" class="user-card">
        <div class="user-details">
          <div><b>ID:</b> {{ user.id }}</div>
          <div><b>Username:</b> {{ user.name }} {{ user.lastname }}</div>
          <div><b>Email:</b> {{ user.email }}</div>
        </div>
        <div class="button-group">
          <button class="view-button" @click="navigateTo('/user/' + user.id)">View</button>
          <button class="edit-button" @click="navigateTo('/user/edit/' + user.id)">Edit</button>
          <button class="delete-button" @click="deleteUser(user)">Delete</button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No users found</p>
    </div>
  </div>
</template>

<script>
import UsersService from "@/services/UsersService";
export default {
  data() {
    return {
      users: []
    };
  },
  async created() {
    try {
      this.users = (await UsersService.index()).data;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteUser(user) {
      let result = confirm("คุณต้องการลบข้อมูลใช่หรือไม่?");
      if (result) {
        try {
          await UsersService.delete(user);
          this.refreshData();
        } catch (err) {
          console.log(err);
        }
      }
    },
    async refreshData() {
      try {
        this.users = (await UsersService.index()).data;
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
/* Main container styling */
.users-container {
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

/* User count styling */
.user-count {
  font-size: 1.2em;
  color: #555;
  margin-bottom: 20px;
  text-align: center;
}

/* Individual user card styling */
.user-card {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s;
}

.user-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.user-details {
  margin-bottom: 10px;
  color: #555;
}

.user-details div {
  margin: 5px 0;
  font-size: 1em;
}

/* Button group styling */
.button-group {
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.3s, transform 0.2s;
}

/* Individual button styles */
.view-button {
  background-color: #4caf50;
  color: white;
}

.view-button:hover {
  background-color: #45a049;
  transform: translateY(-2px);
}

.edit-button {
  background-color: #ffa500;
  color: white;
}

.edit-button:hover {
  background-color: #ff8c00;
  transform: translateY(-2px);
}

.delete-button {
  background-color: #f44336;
  color: white;
}

.delete-button:hover {
  background-color: #d32f2f;
  transform: translateY(-2px);
}
</style>
