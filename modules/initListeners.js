import { renderComments } from './renderComments.js'
import { comments } from './comments.js'

const commentInput = document.querySelector('.add-form-text')

export const initLikeComments = () => {
    for (const likeElement of document.querySelectorAll('.like-button')) {
        const index = likeElement.dataset.index

        if (comments[index].likes) {
            likeElement.classList.add('-active-like')
        }

        likeElement.addEventListener('click', (event) => {
            event.stopPropagation()
            const index = likeElement.dataset.index

            if (comments[index].likes) {
                comments[index].quantityLikes--
                comments[index].likes = false
                likeElement.classList.remove('-active-like')
            } else {
                comments[index].quantityLikes++
                comments[index].likes = true
                likeElement.classList.add('-active-like')
            }

            renderComments()
        })
    }
}

export const initCommentsListener = () => {
    const commentsElements = document.querySelectorAll('.comment')

    for (const commentElement of commentsElements) {
        commentElement.addEventListener('click', (event) => {
            if (event.target.closest('.like-button')) return
            const commentText =
                commentElement.querySelector('.comment-text').innerText
            const commentName = commentElement.querySelector(
                '.comment-header div:first-child',
            ).innerText

            commentInput.value = `Ответ пользователю ${commentName}: ${commentText} > `
        })
    }
}
