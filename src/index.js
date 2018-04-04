import { bind, wire } from 'hyperhtml'
import { query } from './request'
import index from './index.gql'

let list = []
let loading = false

function timeFormatter(string) {
  let date = new Date(string)
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
}

function getList() {
  loading = true
  render()
  query(index, list[list.length - 1]).then(data => {
    const newList = data.reddit && data.reddit.subreddit && data.reddit.subreddit.newListings || []
    list = [...list, ...newList]
    loading = false
    render()
  })
}

function render() {
  bind(document.body.querySelector('.yue')) `${
    list.map(
      li =>
        wire() `<li>
          <a href="${li.url}">${li.title}</a>
          <p><small><em>Score: ${li.score}</em> - ${li.author.username} - ${timeFormatter(li.author.createdISO)}</small></p>
        </li>`
    )}
    ${loading ? 'Loading...' : wire() `<a href="javascript:;" onclick=${getList}>Load More</a>`}
  `
}

getList()