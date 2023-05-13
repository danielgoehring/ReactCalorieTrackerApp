import React from 'react';

function Meal(props) {
    return (
        <div>
            
            <div className="mealFontSize">
                <div>
                    <div className="ounce-amount" >{props.mealName} {props.amount} oz</div>
                </div>
                <div className="macroContainer">
                <div className="mealContainer" >
                    <div >
                    <div className="calorieContainer" >
                        <div className="twenty calorieSize" >Calories:</div>
                        <div className="calorieSize">{props.calories} kcal</div>
                    </div>
                    </div>
                    

                    <div className="carbContainer" >
                        <div className="carbstyle calorieSize" >Carbs:</div>
                        <div className="calorieSize">{props.carbs} g</div>
                    </div>
                    <div className="proteinContainer" >
                        <div className="twenty calorieSize" >Protein:</div>
                        <div className="calorieSize">{props.protein} g</div>
                    </div>
                    <div className="fatContainer" >
                        <div className="twenty calorieSize" >Fat:</div>
                        <div className="calorieSize">{props.fat} g</div>
                    </div>
                </div>
                <div className="removeMealContainer" >
                    <button className="removeBtn calorieSize" onClick={props.removeMeal}>Remove Meal</button>
                </div>
                </div>
            </div>
        </div>
       
    )
}

export default Meal;

