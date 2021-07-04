const initState = {
    cars: null
}

const carReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case 'CAR_LIST':
            return {
                ...state,
                cars: payload.cars
            }
            
        default:
            return {
                ...state
            }
    }
}

export default carReducer