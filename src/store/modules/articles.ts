import { Module, VuexModule, getModule, Mutation, Action } from "vuex-module-decorators";
import store from '@/store'
import { Article } from '../models';
import * as api from '@/store/api'

@Module({
  dynamic: true,
  namespaced: true,
  name: 'articles',
  store
})
class ArticlesModule extends VuexModule {
  globalFeed: Article[] = []
  userFeed: Article[] = []

  @Mutation
  setGlobalFeed(articles: Article[]) {
    this.globalFeed = articles
  }

  @Action({commit: 'setGlobalFeed'})
  async refreshGlobalFeed() {
    const globalFeed = await api.getGlobalFeed()
    return globalFeed.articles
  }
}


export default getModule(ArticlesModule)
