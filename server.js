require('dotenv').config();
const express = require('express');
const app = express();
const request = require('superagent');
const cors = require('cors');
const client = require('./lib/client');

client.connect();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
//fetching database for class of Drinks
// This searches for all drinks containing specified liquer endpoint.
const createAuthRoutes = require('./lib/auth/create-auth-routes.js');

const authRoutes = createAuthRoutes({
    selectUser(email) {
        return client.query(`
            SELECT id, email, hash 
            FROM users
            WHERE email = $1;
        `,
        [email]
        ).then(result => result.rows[0]);
    },
    insertUser(user, hash) {
        return client.query(`
            INSERT into users (email, hash)
            VALUES ($1, $2)
            RETURNING id, email;
        `,
        [user.email, hash]
        ).then(result => result.rows[0]);
    }
});

// before ensure auth, but after other middleware:
app.use('/auth', authRoutes);

// for every route, on every request, make sure there is a token
const ensureAuth = require('./lib/auth/ensure-auth.js');
app.use('/vodka', ensureAuth);
app.use('/gin', ensureAuth);
app.use('/rum', ensureAuth);
app.use('/tequila', ensureAuth);
app.use('/whiskey', ensureAuth);
app.use('/scotch', ensureAuth);
app.use('/random', ensureAuth);
app.use('/favorites', ensureAuth);

app.get('/favorites', async(req, res) => {
    try {
        const myQuery = `
        SELECT * FROM favorites 
        WHERE user_id=$1
        `;
        const favorites = await client.query(myQuery, [req.userId]);

        res.json(favorites.rows);
    }
    catch (e) {
        console.log(e);
    }
});

app.delete('/favorites/:id', async(req, res) => {
    try {
        const myQuery = `
        DELETE FROM favorites
        WHERE id=$1
        RETURNING *
        `;

        const favorites = await client.query(myQuery, [req.params.id]);

        res.json(favorites.rows);
    } catch (e) {
        console.log(e);
    }
});

app.post('/favorites', async(req, res) => {
    try {
        const {
            name,
            image,
        } = req.body;
        console.log("user_id", req.userId);
        const newFavorites = await client.query(`
        INSERT INTO favorites (name, image, user_id)
        values ($1, $2, $3)
        returning *
        `, [
            name, 
            image,
            req.userId
        ]);

        res.json(newFavorites.rows[0]);
    }
    catch (e) {
        console.log(e);
    }
});

// all these drink endpoints should be replaced by a single endpoint that takes the drunk type as a parameter
const getDrinks = async(drink) => {
    const drinkApi = await request.get(`https://www.thecocktaildb.com/api/json/v2/${process.env.API_KEY}/filter.php?i=${drink}`);
    return drinkApi.body.drinks.map(someDrink => {
        
        return {
            name: someDrink.strDrink,
            image: someDrink.strDrinkThumb,
            id: someDrink.idDrink   
        };
    });
};


app.get('/drink/:drink', async(req, res, next) => {
    try {
        const drinks = await getDrinks(req.params.drink);
        res.json(allDrinks);
    } catch (err) {
        next(err);   
    }


const getDrinksId = async(req) => {
    const drinkApi = await request.get(`https://www.thecocktaildb.com/api/json/v2/${process.env.API_KEY}/lookup.php?i=${req.params.myDrinkId}`);
    return drinkApi.body.drinks.map(individualDrink => {
        
        return {
            Name: individualDrink.strDrink, 
            Image: individualDrink.strDrinkThumb,
            // wow, this api gave you some pretty ugly data to work with, ha :)
            Ingredients: Object.keys(individualDrink)
                // filter out the non-ingredient keys
                .filter(key => !['idDrink', 'strInstructions', 'strDrink', 'strDrinkThumb'].includes(key))
                // make an array for each of the non-ingredient keys
                .map(filteredKey => individualDrink[filteredKey]),
            Instructions: individualDrink.strInstructions,
            id: individualDrink.idDrink   
        };
    });
};

app.get('/id/:myDrinkId', async(req, res, next) => {
    try {
        [req.params.myDrinkId];
        const allDrinksId = await getDrinksId(req);
        res.json(allDrinksId);
    } catch (err) {
        next(err);   
    }

});

const getPopularDrinks = async() => {

    const drinkApi = await request.get(`https://www.thecocktaildb.com/api/json/v2/${process.env.API_KEY}/popular.php`);
    return drinkApi.body.drinks.map(popularDrink => {
        
        return {
            name: popularDrink.strDrink,
            image: popularDrink.strDrinkThumb,
            id: popularDrink.idDrink  
        };
    });
};

app.get('/popular', async(req, res, next) => {
    try {
        const allPopularDrinks = await getPopularDrinks();
        res.json(allPopularDrinks);
    } catch (err) {
        next(err);   
    }

});

const getRandomDrinks = async() => {

    const drinkApi = await request.get(`https://www.thecocktaildb.com/api/json/v2/${process.env.API_KEY}/randomselection.php`);
    return drinkApi.body.drinks.map(randomDrink => {
        
        return {
            name: randomDrink.strDrink,
            image: randomDrink.strDrinkThumb,
            id: randomDrink.idDrink  
        };
    });
};

app.get('/random', async(req, res, next) => {
    try {
        const allRandomDrinks = await getRandomDrinks();
        res.json(allRandomDrinks);
    } catch (err) {
        next(err);   
    }

});

const getDrinkByName = async(req) => {
    const drinkApi = await request.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${req.params.myCocktail}`);
    console.log(drinkApi, 'heres the data');
    return drinkApi.body.drinks.map(individualDrink => {
        
        return {
            name: individualDrink.strDrink,
            image: individualDrink.strDrinkThumb, 
            id: individualDrink.idDrink
        };
    });
};

app.get('/name/:myCocktail', async(req, res, next) => {
    try {
        [req.params.myCocktail];
        const thisDrink = await getDrinkByName(req);
        res.json(thisDrink);
    } catch (err) {
        next(err);   
    }

});

//made a const called port and go to the port that we made in env OR (||) go to 5000
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('listening on port', port);
});