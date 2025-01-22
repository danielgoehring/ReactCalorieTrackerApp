import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Meal from './Meal';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';

function MealList(props) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [showFoodSearch, setShowFoodSearch] = useState(false);

  const toggleFoodSearch = () => {
    if (showFoodSearch === false) {
      setShowFoodSearch(true);
    } else {
      setShowFoodSearch(false);
    }
  };

  const handlePreviewFoodItem = (e) => {
    e.preventDefault();
    if (
      inputValue === '' ||
      props.amount === '' ||
      props.selectedQuery === ''
    ) {
      setSubmitAttempted(true);
    } else {
      setSubmitAttempted(false);
      props.previewFoodItem(e);
    }

    // if (showFoodSearch === false) {
    //   setShowFoodSearch(true);
    // } else {
    //   setShowFoodSearch(false);
    // }

    setShowFoodSearch((prevShowFoodSearch) => !prevShowFoodSearch);
  };

  return (
    <>
      <section className="container-01">
        <div className="container-02">
          <div className="container-03">
            <div className="container-1">Name</div>
            <div className="container-2">
              <div className="container-3">
                <div>Calories</div>
                <div>(kcal)</div>
              </div>
              <div className="container-3">
                <div>Carbs</div>
                <div>(g)</div>
              </div>
              <div className="container-3">
                <div>Protein</div>
                <div>(g)</div>
              </div>
              <div className="container-3">
                <div>Fat</div>
                <div>(g)</div>
              </div>
            </div>
          </div>
        </div>

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

        {showFoodSearch ? (
          <form onSubmit={handlePreviewFoodItem}>
            <div className="formContainerMain">
              <div className="formContainerMain2">
                <Typography
                  style={{
                    paddingBottom: '10px',
                    fontFamily: 'Roboto Mono, monospace',
                  }}
                >
                  Search Food
                </Typography>
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
                    props.foodLookup(value);
                    setInputValue(value);
                    props.setSelectedQuery(value);

                    if (!value) {
                      setOpen(false);
                    }
                  }}
                  options={props.queryResults}
                  style={{ width: 300, fontFamily: 'Roboto Mono, monospace' }}
                  popupIcon={null}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search"
                      variant="outlined"
                      InputProps={{
                        ...params.InputProps,
                        style: {
                          borderColor: '#c7c7c7',
                        },
                      }}
                    />
                  )}
                />
              </div>
              <div style={{}}>
                <Typography
                  style={{
                    paddingBottom: '10px',
                    fontFamily: 'Roboto Mono, monospace',
                  }}
                >
                  Select Qty (Ounces)
                </Typography>
                <Select
                  label="Enter Number of Ounces"
                  value={props.amount}
                  onChange={(e) => props.setAmount(e.target.value)}
                  style={{
                    width: 300,
                    border: '1px solid #c7c7c7',
                    padding: '10px',
                    borderRadius: '5px',
                    fontFamily: 'Roboto Mono, monospace',
                  }}
                  input={
                    <Input
                      style={{ border: '1px solid #c7c7c7' }}
                      disableUnderline
                    />
                  }
                  displayEmpty
                  placeholder="oz"
                  MenuProps={{
                    PaperProps: {
                      style: { maxHeight: 220 },
                    },
                  }}
                >
                  {[...Array(101).keys()].map((i) => (
                    <MenuItem value={i} key={i}>
                      {i}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div style={{ marginTop: '30px' }}>
                <Button
                  style={{
                    backgroundColor: '#20545c',
                    fontFamily: 'Roboto Mono, monospace',
                  }}
                  variant="contained"
                  color="primary"
                  align="left"
                  type="submit"
                >
                  Add Food
                </Button>
              </div>
            </div>
            <div style={{ marginBottom: '80px', marginTop: '60px' }}>
              {submitAttempted && (
                <p
                  style={{
                    fontSize: '20px',
                    color: '#c2272e',
                    marginTop: '10px',
                  }}
                >
                  Search for new food item
                </p>
              )}
            </div>
          </form>
        ) : (
          <div>
            <button className="toggleFoodSearchBtn" onClick={toggleFoodSearch}>
              Add Food +
            </button>
          </div>
        )}
      </section>
    </>
  );
}

export default MealList;
