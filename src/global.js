const mainEndpoint = `http://localhost:3001`

export const urls = {
    get: {
        listCar: `${mainEndpoint}/list-car`,
        listUser: `${mainEndpoint}/user/get-user`,
        removeCar: id => `${mainEndpoint}/remove-car/${id}`,
    },
    post: {
        login: `${mainEndpoint}/user/login`,
        signup: `${mainEndpoint}/user/signup`,
        addCar: `${mainEndpoint}/add-car`,
        addComment: `${mainEndpoint}/add-comment`,
        removeComment: `${mainEndpoint}/remove-comment`,
        updateUser: `${mainEndpoint}/user/update-user`,
        updateUserPass: `${mainEndpoint}/user/update-user-pass`, 
    }
}

export const messages = {
    errorRequest: 'Une erreur inattendue s\'est produit lors de la requête.',
}