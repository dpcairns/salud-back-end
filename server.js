require('dotenv').config();
const express = require('express');
const app = express();
const request = require('superagent');
const cors = require('cors');



app.use(cors());

const getVodkaDrinks = async() => {
    const drinkApi = await request.get(`https://www.thecocktaildb.com/api/json/v2/${process.env.API_KEY}/filter.php?i=vodka}`);
    return drinkApi.body.drinks.map(vodkaDrink => {
        
        return {
            name: vodkaDrink.strDrink,
            image: vodkaDrink.strDrinkThumb  
        };
    });
};

app.get('/vodka', async(req, res, next) => {
    try {
        const allVodkaDrinks = await getVodkaDrinks();
        res.json(allVodkaDrinks);
    } catch (err) {
        next(err);   
    }

});
//made a const called port and go to the port that we made in env OR (||) go to 5000
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('listening on port', port);
});
