require('dotenv').config();
const express = require('express');
const app = express();
const request = require('superagent');
const cors = require('cors');



app.use(cors());

const getVodkaDrinks = async() => {
    const drinkApi = await request.get(`https://www.thecocktaildb.com/api/json/v2/${process.env.API_KEY}/filter.php?i=vodka`);
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
//fetching database for class
const getTequilaDrinks = async() => {
    const drinkApi = await request.get(`https://www.thecocktaildb.com/api/json/v2/${process.env.API_KEY}/filter.php?i=tequila`);
    return drinkApi.body.drinks.map(tequilaDrink => {
        
        return {
            name: tequilaDrink.strDrink,
            image: tequilaDrink.strDrinkThumb  
        };
    });
};

app.get('/tequila', async(req, res, next) => {
    try {
        const allTequilaDrinks = await getTequilaDrinks();
        res.json(allTequilaDrinks);
    } catch (err) {
        next(err);   
    }

});
const getWhiskeyDrinks = async() => {
    const drinkApi = await request.get(`https://www.thecocktaildb.com/api/json/v2/${process.env.API_KEY}/filter.php?i=whiskey`);
    return drinkApi.body.drinks.map(whiskeyDrink => {
        
        return {
            name: whiskeyDrink.strDrink,
            image: whiskeyDrink.strDrinkThumb  
        };
    });
};

app.get('/whiskey', async(req, res, next) => {
    try {
        const allWhiskeyDrinks = await getWhiskeyDrinks();
        res.json(allWhiskeyDrinks);
    } catch (err) {
        next(err);   
    }

});
const getRumDrinks = async() => {
    const drinkApi = await request.get(`https://www.thecocktaildb.com/api/json/v2/${process.env.API_KEY}/filter.php?i=rum`);
    return drinkApi.body.drinks.map(rumDrink => {
        
        return {
            name: rumDrink.strDrink,
            image: rumDrink.strDrinkThumb  
        };
    });
};

app.get('/rum', async(req, res, next) => {
    try {
        const allRumDrinks = await getRumDrinks();
        res.json(allRumDrinks);
    } catch (err) {
        next(err);   
    }

});
const getGinDrinks = async() => {
    const drinkApi = await request.get(`https://www.thecocktaildb.com/api/json/v2/${process.env.API_KEY}/filter.php?i=gin`);
    return drinkApi.body.drinks.map(ginDrink => {
        
        return {
            name: ginDrink.strDrink,
            image: ginDrink.strDrinkThumb  
        };
    });
};

app.get('/gin', async(req, res, next) => {
    try {
        const allGinDrinks = await getGinDrinks();
        res.json(allGinDrinks);
    } catch (err) {
        next(err);   
    }

});
const getcotchDrinks = async() => {
    const drinkApi = await request.get(`https://www.thecocktaildb.com/api/json/v2/${process.env.API_KEY}/filter.php?i=scotch`);
    return drinkApi.body.drinks.map(scotchDrink => {
        
        return {
            name: scotchDrink.strDrink,
            image: scotchDrink.strDrinkThumb  
        };
    });
};

app.get('/scotch', async(req, res, next) => {
    try {
        const allscotchDrinks = await getscotchDrinks();
        res.json(allscotchDrinks);
    } catch (err) {
        next(err);   
    }

});
//made a const called port and go to the port that we made in env OR (||) go to 5000
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('listening on port', port);
});
