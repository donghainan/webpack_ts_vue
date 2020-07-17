import Http from '../utils/service/http'
import API from '../api/index'
declare module 'vue/types/vue' {
  interface Vue {
    $http: Http
    $api: API
  }
}
