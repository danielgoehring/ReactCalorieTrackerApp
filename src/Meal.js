import React from 'react';

function Meal(props) {
  return (
    <section>
      <div className="mealFontSize">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="macroContainer">
            <div className="calorieContainer2">
              {props.mealName} {props.amount} oz
            </div>
            <div className="containerMacros">
              <div>
                <div className="calorieContainer">
                  <div>{props.calories}</div>
                </div>

                <div className="calorieContainer">
                  <div>{props.carbs}</div>
                </div>
                <div className="calorieContainer ">
                  <div>{props.protein}</div>
                </div>
                <div className="calorieContainer">
                  <div>{props.fat}</div>
                </div>
              </div>

              <div className="removeMealContainer">
                <button className="removeBtn " onClick={props.removeMeal}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Meal;
