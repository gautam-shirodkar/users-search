import { ResultModel } from "./result.model";

export function getTestUsers (): ResultModel[] {
  return [
    {avatar_url: 'https://avatars.githubusercontent.com/u/21823?v=4', login: 'Gautam', type: 'User'},
    {avatar_url: 'https://avatars.githubusercontent.com/u/8397274?v=4', login: 'gautamkrishnar', type: 'User'},
    {avatar_url: 'https://avatars.githubusercontent.com/u/187822?v=4', login: 'GautamGupta', type: 'User'},
    {avatar_url: 'https://avatars.githubusercontent.com/u/2015126?v=4', login: 'gmittal', type: 'User'},
    {avatar_url: 'https://avatars.githubusercontent.com/u/973145?v=4', login: 'RATTLESNAKE-VIPER', type: 'User'},
    {avatar_url: 'https://avatars.githubusercontent.com/u/773293?v=4', login: 'gautamk', type: 'User'}
  ]
}
