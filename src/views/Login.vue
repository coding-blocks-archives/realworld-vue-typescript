<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <router-link to="/register"> Need an account? </router-link>
          </p>

          <ul class="error-messages" v-if="loginError">
            <li>{{ loginError }}</li>
          </ul>

          <form>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="email"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                v-model="password"
                placeholder="Password"
              />
            </fieldset>
            <button
              @click="login()"
              class="btn btn-lg btn-primary pull-xs-right"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import users from '@/store/modules/users';

@Component
export default class Login extends Vue {
  email = '';
  password = '';
  loginError = '';

  login() {
    users
      .login({
        email: this.email,
        password: this.password,
      })
      .then(() => this.$router.push('/'))
      .catch((err) => {
        console.error(err);
        this.loginError = 'Invalid username or password';
      });
  }
}
</script>
