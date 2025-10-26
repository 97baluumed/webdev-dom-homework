const host = 'https://wedev-api.sky.pro/api/v2/maxim-novozhilov'
const authToken = 'https://wedev-api.sky.pro/api/user'

export let token = ''
export const updateToken = (newToken) => {
    token = newToken
}

export let name = ''
export const updateName = (newName) => {
    name = newName
}

export const fetchComments = () => {
    return fetch(host + '/comments', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            if (response.status === 200) {
                return response.json()
            } else {
                if (response.status === 500) {
                    throw new Error('Ошибка сервера. Попробуйте позже')
                }
                throw new Error('Что-то пошло не так')
            }
        })
        .then((responseData) => {
            const appComments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    comment: comment.text,
                    date: comment.date,
                    quantityLikes: comment.likes,
                    likes: comment.isLiked,
                }
            })

            return appComments
        })
}

export const postComments = (comment, name) => {
    return fetch(host + '/comments', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            text: comment,
            name,
        }),
    }).then((response) => {
        if (response.status === 401) {
            throw new Error('Вы не прошли авторизацию')
        }
        return response.json()
    })
}

export const login = (login, password) => {
    return fetch(authToken + '/login', {
        method: 'POST',
        body: JSON.stringify({
            login: login,
            password: password,
        }),
    })
}

export const registration = (name, login, password) => {
    return fetch(authToken, {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            login: login,
            password: password,
        }),
    })
}
