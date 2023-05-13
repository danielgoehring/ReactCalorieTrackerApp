import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Meal from './Meal';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from "@mui/material/Autocomplete";

function MealList(props) {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [submitAttempted, setSubmitAttempted] = useState(false);

    const handlePreviewFoodItem = (e) => {
        e.preventDefault();
        if (inputValue === "" || props.amount === "" || props.selectedQuery === "") {
            setSubmitAttempted(true);
        } else {
            setSubmitAttempted(false);
            props.previewFoodItem(e);
        }
    }
    



    // function changeCals() {
    //     props.setTotalcals(2500);
    //   }
    
    return (
        <>
        <Container >
            <Typography>Search Food</Typography>
            <form onSubmit={handlePreviewFoodItem}>
        
                <Container style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px', marginBottom: '20px'}}>

                    <Autocomplete
                        
                        open={open}
                        onOpen={() => {
                            if (inputValue) {
                                setOpen(true);
                            }
                        }}
                        onClose={() => setOpen(false)}
                        inputValue={inputValue}
                        onInputChange={(e, value, reason) => {
                            props.foodLookup(value)
                            setInputValue(value);
                            props.setSelectedQuery(value)

                            if (!value) {
                                setOpen(false);
                            }
                        }}
                        options={props.queryResults}
                        style={{ width:300}}
                        popupIcon={null}
                        renderInput={(params) => (
                            <TextField {...params} label="Search" variant="outlined" />
                        )}
                    />
                </Container>
                <Container style={{marginBottom: '40px'}}>
                    <Typography style={{marginBottom: '20px', marginTop: '40px'}}>Select Ounces</Typography>
                    
                    <Select label ="Enter Number of Ounces" value={props.amount} onChange={(e) => props.setAmount(e.target.value)}
                                style={{ width:300}}
                                displayEmpty
                                placeholder="oz"
                                MenuProps={{
                                PaperProps: {
                                    style: { maxHeight: 220},
                                },
                                }}>
                        {[...Array(101).keys()].map(i => (
                            <MenuItem value={i}>{i}</MenuItem>
                        ))}
                    </Select>
                </Container>
                    
                <Button style={{marginBottom: '40px', backgroundColor: '#399952'}} variant="contained" color="primary" align="left" type="submit" >Add Food</Button>
                {submitAttempted && (
                <p style={{ fontSize: '20px', color: '#c2272e', marginTop: '10px'}}>Search for new food item</p>
)}
            </form>
            
            {props.foodItems.map((item, index) => (
                <Meal 
                    key={index}
                    mealName={item.name} 
                    amount={item.amount} 
                    calories={item.calories} 
                    carbs={item.carbs} 
                    protein={item.protein} 
                    fat={item.fat} 
                    removeMeal={() => props.removeMeal(index)}
                />
            ))}


            
        </Container>
        </>
    )
}

export default MealList;