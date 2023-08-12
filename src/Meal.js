import React from 'react';

function Meal(props) {
  return (
    <div>
      <div className="mealFontSize">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="macroContainer">
            <div className="calorieContainer2">
              {props.mealName} {props.amount} oz
            </div>
            <div className="containerMacros">
              <div className="calorieContainer">
                <div className="calorieSize">{props.calories}</div>
              </div>

              <div className="calorieContainer">
                <div className="calorieSize">{props.carbs}</div>
              </div>
              <div className="calorieContainer">
                <div className="calorieSize">{props.protein}</div>
              </div>
              <div className="calorieContainer">
                <div className="calorieSize">{props.fat}</div>
              </div>
              <div className="removeMealContainer">
                <button
                  className="removeBtn calorieSize"
                  onClick={props.removeMeal}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Meal;
