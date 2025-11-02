import { login, updateToken, updateName } from './api.js'
import { renderRegistration } from './renderRegistration.js'
import { fetchAndRenderComments } from '../index.js'

export const renderLogin = () => {
    const container = document.querySelector('.container')

    const loginHtml = `            
        <section class="add-form">
            <h1>Форма входа</h1>
            <input 
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
                <button class="add-form-button-main button-main" type="submit" style="cursor: pointer;">Войти</button>
                <u class="add-form-button-link registry" style="text-decoration: underline; cursor: pointer;"> Зарегистрироваться</u>
            </fieldset>
        </section>`

    container.innerHTML = loginHtml

    document.querySelector('.registry').addEventListener('click', () => {
        renderRegistration()
    })

    const loginEl = document.querySelector('#login')
    const passwordEl = document.querySelector('#password')
    const submitButtonEl = document.querySelector('.button-main')

    submitButtonEl.addEventListener('click', () => {
        login(loginEl.value, passwordEl.value)
            .then((response) => {
                if (response.status === 201) {
                    return response.json()
                } else {
                    if (response.status === 400) {
                        throw new Error('Неверный логин или пароль')
                    }
                    throw new Error(
                        'Не верно введены логин или пароль. Проверьте еще раз и попробуйте снова',
                    )
                }
            })
            .then((data) => {
                updateToken(data.user.token)
                updateName(data.user.name)
                fetchAndRenderComments()
            })
            .catch((error) => {
                alert(error.message)
            })
    })
}
