import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import MealList from './MealList';
import TotalMacros from './TotalMacros';

function CalorieTracker() {
  const [name, setName] = useState('');
  const [selectedQuery, setSelectedQuery] = useState('');
  const [foodPreview, setFoodPreview] = useState(null);
  const [amount, setAmount] = useState('');
  const [data, setData] = useState(null);
  const [totalcals, setTotalcals] = useState(2500);
  const [totalcarbs, setTotalcarbs] = useState(193);
  const [totalfat, setTotalfat] = useState(87);
  const [totalprotein, setTotalprotein] = useState(230);
  const [calories, setCalories] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [protein, setProtein] = useState(0);
  const [fat, setFat] = useState(0);
  const [query_results, setQueryResults] = useState([]);

  const [foodItems, setFoodItems] = useState([]);

  const [progress2, setProgress2] = useState(100);
  const [progress3, setProgress3] = useState(100);
  const [progress4, setProgress4] = useState(100);

  //updates progress bars
  useEffect(() => {
    const subtractValue = (carbs / 193) * 100;
    setProgress2((prevProgress) => prevProgress - subtractValue);
  }, [carbs]);

  useEffect(() => {
    const subtractValueFat = (fat / 87) * 100;
    setProgress3((prevProgress) => prevProgress - subtractValueFat);
  }, [fat]);

  useEffect(() => {
    const subtractValueProtein = (protein / 230) * 100;
    setProgress4((prevProgress) => prevProgress - subtractValueProtein);
  }, [protein]);

  // adds back progress bars and subtracted macros when meal is removed
  function removeMeal(indexToRemove) {
    const mealToRemove = foodItems[indexToRemove];

    setProgress2(
      (prevProgress) => prevProgress + mealToRemove.subtractedCarbsValue,
    );
    setProgress3(
      (prevProgress) => prevProgress + mealToRemove.subtractedFatValue,
    );
    setProgress4(
      (prevProgress) => prevProgress + mealToRemove.subtractedProteinValue,
    );

    setTotalcarbs(
      (prevTotalcarbs) => prevTotalcarbs + parseFloat(mealToRemove.carbs),
    );
    setTotalfat((prevTotalfat) => prevTotalfat + parseFloat(mealToRemove.fat));
    setTotalprotein(
      (prevTotalprotein) => prevTotalprotein + parseFloat(mealToRemove.protein),
    );
    setFoodItems((prevFoodItems) =>
      prevFoodItems.filter((_, index) => index !== indexToRemove),
    );
    setTotalcals((prevTotalcals) => {
      let newTotalcals = prevTotalcals + parseFloat(mealToRemove.calories);
      // Check if the new total exceeds the initial total
      if (newTotalcals > 2500) {
        newTotalcals = 2500;
      }
      return newTotalcals;
    });
  }

  async function fetchAPI() {
    const APP_ID = '7020f5e0';
    const APP_KEY = '132102389cb716fbe45af39b17af701a';
    const baseURL = `https://api.edamam.com/api/food-database/v2/parser?ingr=${name}&app_id=${APP_ID}&app_key=${APP_KEY}`;
    const response = await fetch(baseURL);
    const data = await response.json();
    setData(data);
    console.log(data);
    console.log(data.parsed[0].food.nutrients.FAT);
  }

  async function foodLookup(query) {
    const APP_ID = '7020f5e0';
    const APP_KEY = '132102389cb716fbe45af39b17af701a';
    const baseURL = `https://api.edamam.com/auto-complete?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
    const response = await fetch(baseURL, {
      method: 'get',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
    setQueryResults(data);
  }

  async function previewFoodItem(e) {
    e.preventDefault();
    const APP_ID = '7020f5e0';
    const APP_KEY = '132102389cb716fbe45af39b17af701a';
    const baseURL = `https://api.edamam.com/api/food-database/v2/parser?ingr=${selectedQuery}&app_id=${APP_ID}&app_key=${APP_KEY}`;
    const response = await fetch(baseURL);
    const data = await response.json();
    console.log(data);
    setFoodPreview(data);

    const numServings = (1 / 4) * (amount / 1);
    const calories = Math.round(
      data.parsed[0].food.nutrients.ENERC_KCAL * numServings,
    ).toFixed(1);
    const carbs = Math.round(
      data.parsed[0].food.nutrients.CHOCDF * numServings,
    ).toFixed(1);
    const protein = Math.round(
      data.parsed[0].food.nutrients.PROCNT * numServings,
    ).toFixed(1);
    const fat = Math.round(
      data.parsed[0].food.nutrients.FAT * numServings,
    ).toFixed(1);

    setCalories(calories);
    setCarbs(carbs);
    setProtein(protein);
    setFat(fat);
    setTotalcals(totalcals - calories);
    setTotalfat(totalfat - fat);
    setTotalcarbs(totalcarbs - carbs);
    setTotalprotein(totalprotein - protein);

    const newFoodItem = {
      name: data.hints[0].food.label,
      amount,
      calories,
      carbs,
      protein,
      fat,
      subtractedCarbsValue: (carbs / 193) * 100, // <-- Added this
      subtractedFatValue: (fat / 87) * 100, // <-- Added this
      subtractedProteinValue: (protein / 230) * 100, // <-- Added this
    };

    setFoodItems((prevFoodItems) => [...prevFoodItems, newFoodItem]);
    setSelectedQuery('');
    setAmount('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setName('');
    fetchAPI();
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: '#113136',
          marginBottom: '20px',
          padding: '0 20px',
        }}
      >
        <CssBaseline />

        <div style={{ backgroundColor: '#113136', marginBottom: '20px' }}>
          <h1
            style={{
              marginTop: '0',
              padding: '30px 0', // Adjust padding for smaller screens
              color: 'white',
              fontSize: '36px', // Reduce font size for smaller screens
              textAlign: 'center',
            }}
          >
            Calorie Counter
          </h1>
        </div>
        <TotalMacros
          totalCalories={totalcals}
          totalCarbs={totalcarbs}
          totalFat={totalfat}
          totalProtein={totalprotein}
          carbs={carbs}
          protein={protein}
          fat={fat}
          progress2={progress2}
          progress3={progress3}
          progress4={progress4}
        />
      </div>
      <MealList
        previewFoodItem={previewFoodItem}
        foodPreview={foodPreview}
        setSelectedQuery={setSelectedQuery}
        setName={setName}
        queryResults={query_results}
        setAmount={setAmount}
        foodLookup={foodLookup}
        handleSubmit={handleSubmit}
        name={name}
        amount={amount}
        data={data}
        calories={calories}
        carbs={carbs}
        protein={protein}
        fat={fat}
        setTotalcals={setTotalcals}
        selectedQuery={selectedQuery}
        foodItems={foodItems}
        removeMeal={removeMeal}
      />
    </div>
  );
}

export default CalorieTracker;
