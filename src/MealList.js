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

    function changeCals() {
        props.setTotalcals(2500);
      }
    
    return (
        <>
        <Container >
            <Typography>Search Food</Typography>
            <form onSubmit={props.previewFoodItem}>
        
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
                    
                <Button style={{marginBottom: '40px', backgroundColor: '#399952'}} variant="contained" color="primary" align="left" type="submit">Add Food</Button>
            </form>
            
            {props.foodPreview ? <> <Meal 
                mealName={props.foodPreview.hints[0].food.label} 
                amount={props.amount} 
                calories={props.calories} 
                carbs={props.carbs} 
                protein={props.protein} 
                fat={props.fat} />
                <Button style={{marginBottom: '40px', backgroundColor: '#399952'}} variant="contained" color="primary" align="left" type="submit" onClick={changeCals}>Reset Calories</Button>
                
                </> : null}


            
        </Container>
        </>
    )
}

export default MealList;