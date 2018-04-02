import { bind, wire } from 'hyperhtml'
import { request } from 'graphql-request'

const query = `{
  Movie(title: "Inception") {
    releaseDate
    actors {
      name
    }
  }
}`

request('https://api.graph.cool/simple/v1/movies', query).then(data => {
  const actors = data.Movie && data.Movie.actors
  bind(document.body) `${
    actors.map(
      actor =>
        wire() `<li>${actor.name}</li>`
      )
  }`
})
