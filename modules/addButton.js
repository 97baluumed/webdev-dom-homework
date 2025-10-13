import { renderComments } from './renderComments.js'
import { updateComments } from './comments.js'
import { sanitizeHtml } from './sanitize.js'
import { postComments, fetchComments } from './api.js'

const addButton = document.querySelector('.add-form-button')
const nameInput = document.querySelector('.add-form-name')
const commentInput = document.querySelector('.add-form-text')
let originalNameColor = nameInput.style.backgroundColor
let originalCommentColor = commentInput.style.backgroundColor

export const initButtonComment = () => {
    addButton.addEventListener('click', () => {
        const trimmedName = nameInput.value.trim()
        const trimmedComment = commentInput.value.trim()

        if (!trimmedName) {
            nameInput.style.backgroundColor = 'red'
            setTimeout(() => {
                nameInput.style.backgroundColor = originalNameColor
            }, 2000)
            return
        }

        if (!trimmedComment) {
            commentInput.style.backgroundColor = 'red'
            setTimeout(() => {
                commentInput.style.backgroundColor = originalCommentColor
            }, 2000)
            return
        }

        postComments(sanitizeHtml(trimmedName), sanitizeHtml(trimmedComment))
            .then(() => {
                addButton.ariaDisabled = true
                addButton.textContent = 'Отправка комментария...'
                return fetchComments()
            })
            .then((data) => {
                updateComments(data)
                renderComments()
                nameInput.value = ''
                commentInput.value = ''
                addButton.ariaDisabled = false
                addButton.textContent = 'Написать'
            })
    })
}
