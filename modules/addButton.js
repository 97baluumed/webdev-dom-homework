import { renderComments } from './renderComments.js'
import { updateComments } from './comments.js'
import { sanitizeHtml } from './sanitize.js'
import { postComments } from './api.js'

// const commentsList = document.querySelector('.comments')
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

        postComments(
            sanitizeHtml(trimmedName),
            sanitizeHtml(trimmedComment),
        ).then((data) => {
            updateComments(data)
            renderComments()
            nameInput.value = ''
            commentInput.value = ''
        })

        // const name = sanitizeHtml(trimmedName)
        // const commentText = sanitizeHtml(trimmedComment)

        // const currentDate = new Date()
        // const formattedDate = currentDate.toLocaleString('ru-RU', {
        //     year: 'numeric',
        //     month: '2-digit',
        //     day: '2-digit',
        //     hour: '2-digit',
        //     minute: '2-digit',
        // })

        // const newComments = {
        //     name: name,
        //     text: commentText,
        // }

        // fetch('https://wedev-api.sky.pro/api/v1/maxim-novozhilov/comments', {
        //     method: 'POST',
        //     body: JSON.stringify(newComments),
        // })
        //     .then((response) => {
        //         return response.json()
        //     })
        //     .then((data) => {
        //         updateComments(data.сomments)
        //         renderComments()
        //     })

        // commentsList.innerHTML += newComments

        // renderComments()
    })
}
