<template>
  <div v-if="!this.$store.state.isLoggedIn">
    <b-form-input v-model="username"
                  type="text"
                  placeholder="Username"/>
    <b-form-input v-model="password"
                  type="password"
                  placeholder="Password"/>
    <b-button @click="postLogin()">Login</b-button>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    postLogin() {
      let url = process.env.API_URL + "/api/login/"
      let data = {
        username: this.username,
        password: this.password
      }
      this.$axios.post(url, data, {
        withCredentials: true
      })
      .then( () => {
          this.$store.commit('logIn')
        })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>