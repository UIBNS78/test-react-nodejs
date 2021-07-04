import React, { Component } from 'react'
import { urls } from '../../global'
import CarItem from './car-item'
import axios from 'axios'
import CarSkeleton from '../skeleton/car-skeleton'
import { connect } from 'react-redux'

export class CarList extends Component {
    
    componentDidMount = () => {
        axios.get(urls.get.listCar).then(response => {
            const { status, data } = response
            if (status === 200) {
                if (data.success) {
                    this.props.dispatch({type: 'CAR_LIST', payload: { cars: data.cars }})
                }
            }
        })
    }
    
    render() {
        const { cars } = this.props
        return (
            <>
                {
                    cars && cars.length > 0 ? cars.map(car => (
                        <CarItem car={car} />
                    )) : <CarSkeleton />
                }  
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        cars: state.carReducer.cars
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch: payload => dispatch(payload)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarList)
