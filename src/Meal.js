import React from 'react';

function Meal(props) {
    return (
        <div>
            <div>
                <p style={{fontSize: '32px', fontWeight: 'bold', marginBottom: '10px'}}>{props.mealName} {props.amount} oz</p>
            </div>
            <div style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '40px'}}>Calories: {props.calories} kcal</div>
            <div >
                <div className="foodinfo">
                    <div style={{
                        fontSize: '28px',
                        border: '2px solid #b6e3c2',
                        borderRadius: '50%',
                        backgroundColor: '#b6e3c2',
                        color: 'white',
                        display: 'inline-block',
                        padding: '80px 40px',
                        textAlign: 'center',
                        marginBottom: '20px',
                        marginLeft: '20px',
                        marginRight: '20px',

                    }}>
                        <div style={{marginBottom: '20px'}}>Carbohydrates:</div>
                        <div >{props.carbs} g</div>
                    </div>
                    <div style={{
                        fontSize: '28px',
                        border: '2px solid #b6e3c2',
                        borderRadius: '50%',
                        backgroundColor: '#b6e3c2',
                        color: 'white',
                        display: 'inline-block',
                        padding: '80px 80px',
                        textAlign: 'center',
                        marginBottom: '20px',
                        marginLeft: '20px',
                        marginRight: '20px',
                    }}>
                        <div  style={{marginBottom: '20px'}}>Protein:</div>
                        <div>{props.protein} g</div>
                    </div>
                    <div style={{
                        fontSize: '28px',
                        border: '2px solid #b6e3c2',
                        borderRadius: '50%',
                        backgroundColor: '#b6e3c2',
                        color: 'white',
                        display: 'inline-block',
                        padding: '80px 90px',
                        textAlign: 'center',
                        marginBottom: '20px',
                        marginLeft: '20px',
                        marginRight: '20px',
                    }}>
                        <div  style={{marginBottom: '20px'}}>Fat:</div>
                        <div>{props.fat} g</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Meal;

