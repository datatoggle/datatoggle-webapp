import {RestApi} from './restapi/RestApi'
import firebase from 'firebase/app'

export class UserContext {
  readonly user: firebase.User | null
  readonly api: RestApi

  constructor(user: firebase.User | null) {
    this.user = user
    this.api = new RestApi(user)
  }

}
