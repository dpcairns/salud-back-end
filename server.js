require('dotenv').config();
const express = require('express');
const app = express();
const request = require('superagent');
const cors = require('cors');



app.use(cors());
//fetching database for class of Drinks
// This searches for all drinks containing specified liquer endpoint.
const getVodkaDrinks = async() => {
    const drinkApi = await request.get(`https://www.thecocktaildb.com/api/json/v2/${process.env.API_KEY}/filter.php?i=vodka`);
    return drinkApi.body.drinks.map(vodkaDrink => {
        
        return {
            name: vodkaDrink.strDrink,
            image: vodkaDrink.strDrinkThumb,
            id: vodkaDrink.idDrink  
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
const getTequilaDrinks = async() => {
    const drinkApi = await request.get(`https://www.thecocktaildb.com/api/json/v2/${process.env.API_KEY}/filter.php?i=tequila`);
    return drinkApi.body.drinks.map(tequilaDrink => {
        
        return {
            name: tequilaDrink.strDrink,
            image: tequilaDrink.strDrinkThumb, 
            id: tequilaDrink.idDrink 
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
            image: whiskeyDrink.strDrinkThumb,
            id: whiskeyDrink.idDrink   
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
            image: rumDrink.strDrinkThumb,
            id: rumDrink.idDrink   
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
            image: ginDrink.strDrinkThumb,
            id: ginDrink.idDrink   
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
const getScotchDrinks = async() => {
    const drinkApi = await request.get(`https://www.thecocktaildb.com/api/json/v2/${process.env.API_KEY}/filter.php?i=scotch`);
    return drinkApi.body.drinks.map(scotchDrink => {
        
        return {
            name: scotchDrink.strDrink,
            image: scotchDrink.strDrinkThumb,
            id: scotchDrink.idDrink   
        };
    });
};

app.get('/scotch', async(req, res, next) => {
    try {
        const allScotchDrinks = await getScotchDrinks();
        res.json(allScotchDrinks);
    } catch (err) {
        next(err);   
    }

});
const getDrinksId = async() => {
    const drinkApi = await request.get(`https://www.thecocktaildb.com/api/json/v2/${process.env.API_KEY}/lookup.php?i=178321`);
    return drinkApi.body.drinks.map(individualDrink => {
        
        return {
            Name: individualDrink.strDrink, 
            Image: individualDrink.strDrinkThumb,
            Ingredients:[individualDrink.strIngredient1, individualDrink.strIngredient2, individualDrink.strIngredient3, individualDrink.strIngredient4, individualDrink.strIngredient5, individualDrink.strIngredient6, individualDrink.strIngredient7, individualDrink.strIngredient8, individualDrink.strIngredient9, individualDrink.strIngredient10, individualDrink.strIngredient11, individualDrink.strIngredient12, individualDrink.strIngredient13, individualDrink.strIngredient14, individualDrink.strIngredient15],
            Measurement:[individualDrink.strMeasure1, individualDrink.strMeasure2, individualDrink.strMeasure3, individualDrink.strMeasure4, individualDrink.strMeasure5, individualDrink.strMeasure6, individualDrink.strMeasure7, individualDrink.strMeasure8, individualDrink.strMeasure9, individualDrink.strMeasure10, individualDrink.strMeasure11, individualDrink.strMeasure12, individualDrink.strMeasure13, individualDrink.strMeasure14, individualDrink.strMeasure15],
            Instructions: individualDrink.strInstructions   
        };
    });
};

app.get('/id', async(req, res, next) => {
    try {
        const allDrinksId = await getDrinksId();
        res.json(allDrinksId);
    } catch (err) {
        next(err);   
    }

});


//made a const called port and go to the port that we made in env OR (||) go to 5000
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('listening on port', port);
});
