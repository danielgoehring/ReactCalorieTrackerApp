import React from 'react';

function TotalCalories(props) {
    return (
        <div>
            <div></div>
            <p style={{fontSize: '30px', marginBottom: '0'}}>Daily Calories: <div style={{fontSize: '46px', color: props.totalCalories < 500 ? '#c2272e' : 'green'}}>{props.totalCalories}</div></p>
            {props.totalCalories <= 0 && (
            <p style={{ fontSize: '20px', color: '#c2272e', marginTop: '10px'}}>You don't have calories left</p>
            )}
        </div>
    )
}

export default TotalCalories;