<template>
  <div>
    <div class="nv-navbar">
      <ul class="nav-left">
        <li><router-link :to="{ name: 'products' }">Perfume</router-link></li>
        <li><router-link :to="{ name: 'allproduct' }">Product</router-link></li>
      </ul>
      <ul class="nav-right">
        <li><router-link :to="{ name: 'login' }">Login</router-link></li>
        <li><router-link :to="{ name: 'users' }" class="signup-button">Users</router-link></li>
        <li><a v-on:click.prevent="logout" href="#">Logout</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>
<style scoped>
.nv-navbar {
  background: linear-gradient(135deg, #f3b8d1, #b9dff5, #d0b9f5); /* Gradient background */
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Space between left and right sections */
  padding: 0 40px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2); /* Enhanced shadow for depth */
}

.nav-left,
.nav-right {
  list-style: none;
  display: flex;
  gap: 30px; /* Spacing between items */
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
}

.nav-left li a,
.nav-right li a {
  text-decoration: none;
  color: white;
  font-size: 1.1em;
  transition: color 0.3s ease;
}

.nav-right li .signup-button {
  border: 1px solid white;
  padding: 5px 15px;
  border-radius: 20px;
  color: white;
  font-size: 1em;
  font-weight: 300;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.nav-right li .signup-button:hover {
  background-color: white;
  color: #8EC5FC; /* Button hover effect */
}

.nav-right li a:hover,
.nav-left li a:hover {
  color: #d8b4e2; /* Slight color change on hover */
}

.clearfix {
  clear: left;
}
</style>

