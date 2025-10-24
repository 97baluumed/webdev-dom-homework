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
            .then((response) => {
                if (response.status === 201) {
                    return response.json()
                } else {
                    if (response.status === 400) {
                        throw new Error(
                            'Вы допустили ошибку. Имя и комментарий должны быть не короче 3х символов',
                        )
                    }
                    if (response.status === 500) {
                        throw new Error('Ошибка сервера. Попробуйте позже')
                    }
                    throw new Error('Что-то пошло не так')
                }
            })
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
            .catch((error) => {
                if (error.message === 'Failed to fetch') {
                    alert('Отсутствует соединение с интернетом')
                } else {
                    alert(error.message)
                }
            })
            .catch((error) => {
                alert(error.message)
            })

            .finally(() => {
                addButton.ariaDisabled = false
                addButton.textContent = 'Написать'
            })
    })
}
