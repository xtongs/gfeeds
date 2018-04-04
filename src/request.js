import { request } from 'graphql-request'
import { print } from 'graphql/language/printer'

export const query = (file, after) => {
  return new Promise((resolve, reject) => {
    request('https://www.graphqlhub.com/graphql', print(file), {
      after: after && after.fullnameId
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}
