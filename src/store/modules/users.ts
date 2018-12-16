import { getModule, Module, MutationAction, VuexModule } from 'vuex-module-decorators';
import store from '@/store';
import { Profile, User, UserSubmit } from '../models';
import { fetchProfile, loginUser } from '../api';

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
    return { user };
  }

  @MutationAction
  async loadProfile(username: string) {
    const profile = await fetchProfile(username);
    return { profile };
  }
}

export default getModule(UsersModule);
