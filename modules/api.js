const host = 'https://wedev-api.sky.pro/api/v1/maxim-novozhilov'

export const fetchComments = () => {
    return fetch(host + '/comments', {
        method: 'GET',
    })
        .then((response) => {
            return response.json()
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
        }),
    })
}
