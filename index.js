import { renderComments } from './modules/renderComments.js'
import { initButtonComment } from './modules/addButton.js'
import { updateComments } from './modules/comments.js'
import { fetchComments } from './modules/api.js'

document.querySelector('.container').innerHTML =
    'Комментарии загружаются. Пожалуйста подождите...'

fetchComments().then((data) => {
    updateComments(data)
    renderComments()
})

initButtonComment()
