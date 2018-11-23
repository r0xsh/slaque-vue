<template>
   <div class="ui middle aligned center aligned grid">
  <div class="column">
    <h2 class="ui yellow image header">
      <img src="/slack.svg" class="image">
      <div class="content">
        Login to your account
      </div>
    </h2>
    <form @submit.prevent="login()" class="ui large form">
      <div class="ui stacked segment">
        <div class="field">
          <div class="ui left icon input">
            <i class="user icon"></i>
            <input type="text" name="username" v-model="username" placeholder="Username">
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
            <i class="lock icon"></i>
            <input type="password" name="password" v-model="password" placeholder="Password">
          </div>
        </div>
        <button type="submit" class="ui fluid large yellow submit button">Login</button>
      </div>

      <div class="ui error message"></div>

    </form>
    <div class="ui segment">
    <div class="ui fluid medium basic yellow button">New to us ?</div>
    </div>
  </div>
</div>
</template>

<script>

import {mapActions} from 'vuex'

export default {
    data() {
      return {
        username: 'admin',
        password: 'admin'
      }
    },

    methods: {
			...mapActions([
				'setToken'
			]),
        async login() {
          
          let req = await fetch('/api/login_check', {
							method: 'POST',
							headers: {
      					'Accept': 'application/json',
      					'Content-Type': 'application/json'
    					},
							body: JSON.stringify({
							username: this.username,
							password: this.password
							})
					})
					let data = await req.json()
					this.setToken(data.token)
					this.$router.push({name:'channel', params:{chan:'général'}})
        }
    }

}
</script>

<style scoped>
    .grid {
      height: 100%;
    }
    .image {
      margin-top: -100px;
    }
    .column {
      max-width: 450px;
    }
</style>

