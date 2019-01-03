import {
  getModule,
  Module,
  MutationAction,
  VuexModule,
} from 'vuex-module-decorators';
import store from '@/store';
import { Profile, User, UserSubmit, UserForUpdate } from '../models';
import { fetchProfile, fetchUser, loginUser, updateUser, setJWT } from '../api';

@Module({
  namespaced: true,
  name: 'users',
  store,
  dynamic: true,
})
class UsersModule extends VuexModule {
  user: User | null = null;
  profile: Profile | null = null;

  get username() {
    return (this.user && this.user.username) || null;
  }

  @MutationAction
  async login(userSubmit: UserSubmit) {
    const user = await loginUser(userSubmit);
    setJWT(user.token)
    return { user };
  }

  @MutationAction
  async loadProfile(username: string) {
    const profile = await fetchProfile(username);
    return { profile };
  }

  @MutationAction
  async loadUser() {
    const user = await fetchUser()
    return { user }
  }

  @MutationAction
  async updateSelfProfile(userUpdateFields: UserForUpdate) {
    const user = await updateUser(userUpdateFields)
    return { user }
  }
}

export default getModule(UsersModule);
