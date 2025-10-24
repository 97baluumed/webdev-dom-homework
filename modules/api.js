const host = 'https://wedev-api.sky.pro/api/v1/masim-novozhilov'

export const fetchComments = () => {
    return fetch(host + '/comments', {
        method: 'GET',
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
        body: JSON.stringify({
            text: comment,
            name,
            //forceError: true,
        }),
    })
}
