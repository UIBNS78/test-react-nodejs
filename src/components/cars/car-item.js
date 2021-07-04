import React from 'react'
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import PowerIcon from '@material-ui/icons/Power';
import Battery30Icon from '@material-ui/icons/Battery30';
import CommentItem from './comment-item';
import InputComment from './input-comment';
import { useSelector } from 'react-redux'

function CarItem({car}) {

    const user = useSelector(state => state.authReducer.user)
    
    return (
        <Card style={{marginBottom: 20, paddingBottom: 20}}>
            <CardContent>
                <Typography variant="h2" style={{textAlign: 'center'}}>{ car.name }</Typography>
                <div style={{marginTop: 10, textAlign: 'center'}}>
                    <Typography style={{marginLeft: 10}}variant="overline">Autonomie: </Typography>
                    <Chip
                        icon={<Battery30Icon />}
                        label={`${car.autonomy} Km`}
                        style={{marginRight: 10}}
                        color="secondary"
                        variant="outlined"
                    />
                    <Typography style={{marginLeft: 10}}variant="overline">Puissance: </Typography>
                    <Chip
                        icon={<StarIcon />}
                        label={`${car.power} Ch`}
                        style={{marginRight: 10}}
                        variant="outlined"
                    />
                    <Typography style={{marginLeft: 10}}variant="overline">Recharge: </Typography>
                    <Chip
                        icon={<PowerIcon />}
                        label={`${car.reload} Km/h`}
                        style={{marginRight: 10}}
                        color="primary"
                        variant="outlined"
                    />
                </div>
            </CardContent>
            <Divider />
            
            {/* Comments */}
            { car.comments.length > 0 && car.comments.map(comment => <CommentItem comment={comment} />) }
            
            {/* Input */}
            { user && <InputComment idCar={car._id} /> }
        </Card>
    )
}

export default CarItem
