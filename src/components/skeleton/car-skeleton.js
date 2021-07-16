import React from 'react'
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';

function CarSkeleton() {
    return (
        <>
            {
                [1, 2, 3, 4, 5, 6].map(n => (
                    <Card key={n} style={{marginBottom: 20}}>
                        <CardContent>
                            <Skeleton height={60} />
                            <Skeleton />
                        </CardContent>
                        <Divider />
                        <div style={{padding: 20, marginBottom: 20, display: 'flex'}}>
                            <Skeleton variant="circle"  width={40} height={40} />
                            <div style={{marginLeft: 10, width: '100%'}}>
                                <Skeleton />
                                <Skeleton />
                            </div>
                        </div>
                    </Card>
                ))
            }
        </>
    )
}

export default CarSkeleton
