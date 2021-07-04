const mainEndpoint = `http://localhost:3001`

export const urls = {
    get: {
        listCar: `${mainEndpoint}/list-car`
    },
    post: {
        login: `${mainEndpoint}/auth/login`,
        signup: `${mainEndpoint}/auth/signup`,
        addComment: `${mainEndpoint}/add-comment`,
        removeComment: `${mainEndpoint}/remove-comment`,
    }
}

export const messages = {
    errorRequest: 'Une erreur inattendue s\'est produit lors de la requête.',
}