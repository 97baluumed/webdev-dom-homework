import { renderComments } from './renderComments.js'
import { comments } from './comments.js'
import { sanitizeHtml } from './sanitize.js'
import { updateComments } from './comments.js'

//const commentsList = document.querySelector('.comments')
const addButton = document.querySelector('.add-form-button')
const nameInput = document.querySelector('.add-form-name')
const commentInput = document.querySelector('.add-form-text')
let originalNameColor = nameInput.style.backgroundColor
let originalCommentColor = commentInput.style.backgroundColor

export const initButtonComment = () => {
    addButton.addEventListener('click', () => {
        const trimmedName = nameInput.value.trim()
        const trimmedComment = commentInput.value.trim()

        if (!trimmedName || trimmedName.length < 3) {
            nameInput.style.backgroundColor = 'red'
            setTimeout(() => {
                nameInput.style.backgroundColor = originalNameColor
            }, 2000)
            return
        }

        if (!trimmedComment || trimmedComment.length < 3) {
            commentInput.style.backgroundColor = 'red'
            setTimeout(() => {
                commentInput.style.backgroundColor = originalCommentColor
            }, 2000)
            return
        }

        const name = sanitizeHtml(trimmedName)
        const commentText = sanitizeHtml(trimmedComment)

        const currentDate = new Date()
        const formattedDate = currentDate.toLocaleString('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        })

        comments.push({
            name: name,
            comment: commentText,
            date: formattedDate,
            quantityLikes: 0,
            likes: false,
        })

        const newComments = {
            имя: trimmedName,
            текст: trimmedComment,
        }

        fetch('https://wedev-api.sky.pro/api/v1/maxim-novozhilov/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newComments),
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                updateComments(data.comments)
            })

        fetch('https://wedev-api.sky.pro/api/v1/maxim-novozhilov/comments', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                updateComments(data.comments)
                renderComments()
            })

        nameInput.value = ''
        commentInput.value = ''

        renderComments()
    })
}
