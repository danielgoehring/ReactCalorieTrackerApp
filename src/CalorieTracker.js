import React, { useState } from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import MealList from './MealList';
import TotalCalories from './TotalCalories';
import caloriecounterLogo from './assets/caloriecounterLogo.png';




function CalorieTracker() {

    const [name, setName] = useState("");
    const [selectedQuery, setSelectedQuery] = useState("");
    const [foodPreview, setFoodPreview] = useState(null);
    const [amount, setAmount] = useState("");
    const [data, setData] = useState(null);
    const [totalcals, setTotalcals] = useState(2500);
    const [calories, setCalories] = useState(0);
    const [carbs, setCarbs] = useState(0);
    const [protein, setProtein] = useState(0);
    const [fat, setFat] = useState(0);
    const [query_results, setQueryResults] = useState([]);

    const [foodItems, setFoodItems] = useState([]);
    
    

    function removeMeal(indexToRemove) {
        const mealToRemove = foodItems[indexToRemove];
        setFoodItems(prevFoodItems => prevFoodItems.filter((_, index) => index !== indexToRemove));
        setTotalcals(prevTotalcals => {
        let newTotalcals = prevTotalcals + parseFloat(mealToRemove.calories);
        // Check if the new total exceeds the initial total
        if (newTotalcals > 2500) {
            newTotalcals = 2500;
        }
        return newTotalcals;
    });
    }
    


    async function fetchAPI() {
        const APP_ID = "7020f5e0";
        const APP_KEY = "132102389cb716fbe45af39b17af701a"
        const baseURL = `https://api.edamam.com/api/food-database/v2/parser?ingr=${name}&app_id=${APP_ID}&app_key=${APP_KEY}`;
        const response = await fetch(baseURL);
        const data = await response.json();
        setData(data);
        console.log(data);
        console.log(data.parsed[0].food.nutrients.FAT);

    }

    async function foodLookup(query) {
        const APP_ID = "7020f5e0";
        const APP_KEY = "132102389cb716fbe45af39b17af701a"
        const baseURL = `https://api.edamam.com/auto-complete?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
        const response = await fetch(baseURL, { method: 'get', mode: 'cors', headers: {
            "Content-Type": "application/json"
        }, });
        const data = await response.json()
        console.log(data);
        setQueryResults(data)
        
        
    }

    async function previewFoodItem(e) {
        e.preventDefault();
        const APP_ID = "7020f5e0";
        const APP_KEY = "132102389cb716fbe45af39b17af701a"
        const baseURL = `https://api.edamam.com/api/food-database/v2/parser?ingr=${selectedQuery}&app_id=${APP_ID}&app_key=${APP_KEY}`;
        const response = await fetch(baseURL);
        const data = await response.json();
        console.log(data)
        setFoodPreview(data);
        
        const numServings = (1 / 4) * (amount / 1);
        const calories = Math.round(data.parsed[0].food.nutrients.ENERC_KCAL * numServings).toFixed(1);
        const carbs = Math.round(data.parsed[0].food.nutrients.CHOCDF * numServings).toFixed(1);
        const protein = Math.round(data.parsed[0].food.nutrients.PROCNT * numServings).toFixed(1);
        const fat = Math.round(data.parsed[0].food.nutrients.FAT * numServings).toFixed(1);

        setCalories(calories);
        setCarbs(carbs);
        setProtein(protein);
        setFat(fat);
        setTotalcals(totalcals-calories);
        

        const newFoodItem = {
            name: data.hints[0].food.label,
            amount,
            calories,
            carbs,
            protein,
            fat,
        };
    
        setFoodItems(prevFoodItems => [...prevFoodItems, newFoodItem]);
        setSelectedQuery("");
        setAmount("");


    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setName("");
        fetchAPI();
    }

    return (
        <>
            <CssBaseline />
            
            <div className="header_container">
            <img src={caloriecounterLogo} alt="Example" />
            </div>
            

            <Container>
                <TotalCalories totalCalories={totalcals}/>
                <MealList 
                previewFoodItem={previewFoodItem} 
                foodPreview={foodPreview} 
                setSelectedQuery={setSelectedQuery} 
                setName={setName} 
                queryResults={query_results} 
                setAmount={setAmount} 
                foodLookup={foodLookup} 
                handleSubmit={handleSubmit} 
                name={name} amount={amount} 
                data={data}  
                calories={calories} 
                carbs={carbs} 
                protein={protein} 
                fat={fat} 
                setTotalcals={setTotalcals}
                selectedQuery={selectedQuery}
                foodItems={foodItems}
                removeMeal={removeMeal}/>
            </Container>
        </>
    )
}

export default CalorieTracker;