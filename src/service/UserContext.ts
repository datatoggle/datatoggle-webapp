import {RestApi} from './restapi/RestApi'

export class UserContext {
  readonly fullName: string
  readonly email: string
  readonly api: RestApi

  constructor(authToken: string, fullName: string, email: string) {
    this.fullName = fullName
    this.email = email
    this.api = new RestApi(authToken)
  }

}
