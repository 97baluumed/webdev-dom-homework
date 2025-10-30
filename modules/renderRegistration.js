import { registration, updateToken, updateName, fetchComments } from './api.js'
import { renderComments } from './renderComments.js'
import { updateComments } from './comments.js'
import { renderLogin } from './renderLogin.js'

export const renderRegistration = () => {
    const container = document.querySelector('.container')

    const loginHtml = `            
        <section class="add-form">
            <h1>Форма регистрации</h1>
            <input 
                type="text" 
                class="add-form-name"
                placeholder="Введите Имя" 
                id="name" 
                required
            /><input 
                type="text" 
                class="add-form-name"
                placeholder="Введите логин" 
                id="login" 
                required
            />
            <input
                type="password" 
                class="add-form-name"
                placeholder="Введите пароль" 
                id="password"
                required
            ></input>
            <fieldset class="add-form-registry">
                <button class="add-form-button-main button-main" type="submit" style="cursor: pointer;">Зарегистрироваться</button>
                <u class="add-form-button-link entry" style="text-decoration: underline; cursor: pointer;"> Войти</u>
            </fieldset>
        </section>`

    container.innerHTML = loginHtml

    document.querySelector('.entry').addEventListener('click', () => {
        renderLogin()
    })

    const nameEl = document.querySelector('#name')
    const loginEl = document.querySelector('#login')
    const passwordEl = document.querySelector('#password')
    const submitButtonEl = document.querySelector('.button-main')

    submitButtonEl.addEventListener('click', () => {
        registration(nameEl.value, loginEl.value, passwordEl.value)
            .then((response) => {
                if (response.status === 201) {
                    return response.json()
                } else {
                    if (response.status === 400) {
                        throw new Error(
                            'Пользователь с таким логином уже существует',
                        )
                    }
                    throw new Error(
                        'Не верно введены данные. Проверьте еще раз и попробуйте снова',
                    )
                }
            })
            .then((data) => {
                updateToken(data.user.token)
                updateName(data.user.name)
                fetchComments().then((data) => {
                    updateComments(data)
                    renderComments()
                })
            })
            .catch((error) => {
                alert(error.message)
            })
    })
}
