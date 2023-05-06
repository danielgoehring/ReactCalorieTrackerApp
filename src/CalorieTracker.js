import React, { useState } from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import MealList from './MealList';
import TotalCalories from './TotalCalories';
import { Typography } from '@mui/material';


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
        const calories = (data.parsed[0].food.nutrients.ENERC_KCAL * numServings).toFixed(1);
        const carbs = (data.parsed[0].food.nutrients.CHOCDF * numServings).toFixed(1);
        const protein = (data.parsed[0].food.nutrients.PROCNT * numServings).toFixed(1);
        const fat = (data.parsed[0].food.nutrients.FAT * numServings).toFixed(1);

        setCalories(calories);
        setCarbs(carbs);
        setProtein(protein);
        setFat(fat);
        setTotalcals(totalcals-calories);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setName("");
        fetchAPI();
    }

    return (
        <>
            <CssBaseline />
            
            <div style={{ marginTop: '100px', marginBottom: '100px' }}>
                <Typography style={{ letterSpacing: '7px', marginBottom: '20px' }} variant="h1">CalorieCounter</Typography>
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
                setTotalcals={setTotalcals}/>

            </Container>
        </>
    )
}

export default CalorieTracker;