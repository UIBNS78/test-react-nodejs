import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik'
import { NewCarSchema } from '../../../schemas/input-schema'
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import { AddCarAction } from '../../../redux/actions/car-action'

class AddCar extends Component {
    render() {
        const { handleSetAlert, addCar } = this.props
        return (
            <div style={{textAlign: 'center', marginTop: 20, marginBottom: 20}}>
                <Formik
                    initialValues={{name: '', autonomy: '', power: '', reload: ''}}
                    validationSchema={NewCarSchema}
                    onSubmit={(values, action) => {
                        addCar(values, handleSetAlert, action)
                    }}
                >
                    {formikProps => (
                        <>
                            <TextField
                                label="Nom de la voiture"
                                value={formikProps.values.name}
                                onChange={formikProps.handleChange('name')}
                                onBlur={formikProps.handleBlur('name')}
                                error={formikProps.touched.name && formikProps.errors.name ? true : false}
                                variant="outlined"
                                style={{marginRight: 5, width: 250}}
                            />
                            <TextField
                                label="Autonomie (Km)"
                                value={formikProps.values.autonomy}
                                onChange={formikProps.handleChange('autonomy')}
                                onBlur={formikProps.handleBlur('autonomy')}
                                error={formikProps.touched.autonomy && formikProps.errors.autonomy ? true : false}
                                variant="outlined"
                                style={{marginLeft: 5, marginRight: 5, width: 150}}
                            />
                            <TextField
                                label="Puissance (Ch)"
                                value={formikProps.values.power}
                                onChange={formikProps.handleChange('power')}
                                onBlur={formikProps.handleBlur('power')}
                                error={formikProps.touched.power && formikProps.errors.power ? true : false}
                                variant="outlined"
                                style={{marginLeft: 5, marginRight: 5, width: 150}}
                            />
                            <TextField
                                label="Recharge (Km/h)"
                                value={formikProps.values.reload}
                                onChange={formikProps.handleChange('reload')}
                                onBlur={formikProps.handleBlur('reload')}
                                error={formikProps.touched.reload && formikProps.errors.reload ? true : false}
                                variant="outlined"
                                style={{marginLeft: 5, width: 150}}
                            />
                            <Button 
                                onClick={formikProps.handleSubmit}
                                disabled={!formikProps.isValid}
                                variant="contained" 
                                color="primary" 
                                style={{marginTop: 10, marginLeft: 10}}
                            >Enregistrer</Button>
                        </>
                    )}
                </Formik>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addCar: (car, handleSetAlert, action) => dispatch(AddCarAction(car, handleSetAlert, action))
    }
}

export default connect(null, mapDispatchToProps)(AddCar)
