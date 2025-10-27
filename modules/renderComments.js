import { comments } from './comments.js'
import { initLikeComments, initCommentsListener } from './initListeners.js'
import { renderLogin } from './renderLogin.js'
import { token, name } from './api.js'
import { initButtonComment } from './addButton.js'

export const renderComments = () => {
    const container = document.querySelector('.container')
    const commentsHtml = comments
        .map((comment, index) => {
            return `
            <li class="comment">
                <div class="comment-header">
                    <div>${comment.name}</div>
                    <div>${new Date(comment.date).toLocaleString('ru-RU', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}</div>
                </div>
                <div class="comment-body">
                    <div class="comment-text">
                        ${comment.comment}
                    </div>
                </div>
                <div class="comment-footer">
                    <div class="likes">
                        <span class="likes-counter" data-index="${index}">${comment.quantityLikes}</span>
                        <button class="like-button" data-index="${index}"></button>
                    </div>
                </div>
            </li>
        `
        })
        .join('')

    const addCommetnsHtml = `
            <div class="add-form">
                <input
                    type="text"
                    class="add-form-name"
                    placeholder="Введите ваше имя"
                    readonly
                    value="${name}"
                    id="name-input"
                />
                <textarea
                    type="textarea"
                    class="add-form-text"
                    placeholder="Введите ваш коментарий"
                    rows="4"
                    id="text-input"
                ></textarea>
                <div class="add-form-row">
                    <button class="add-form-button">Написать</button>
                </div>
            </div>
            <div class="form-loading" style="display: none; margin-top: 20px">Комментарий добавляется...</div>`

    const linkToLoginText = `<p>Чтобы отправить комментарий, <span class="link-login" style="text-decoration: underline; cursor: pointer;">войдите</span></p>`

    const baseHtml = `<ul class="comments">${commentsHtml}</ul>
        ${token ? addCommetnsHtml : linkToLoginText}`

    container.innerHTML = baseHtml
    if (token) {
        initButtonComment()
        initLikeComments()
        initCommentsListener()
    } else {
        document.querySelector('.link-login').addEventListener('click', () => {
            renderLogin()
        })
    }
}
