import classes from './AvailableMeals.module.css';
import Card from "../../UI/Card";
import MealItem from "../MealItem/MealItem";
import {useEffect, useState} from "react";
import useHttp from "../../../hooks/useHttp";

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const {fetchHttpRequest, error: httpError, isLoading} = useHttp();

    useEffect(() => {
        const fetchDataHandler = (meals) => {
            let loadedMeals = [];
            for (let key in meals) {
                loadedMeals.push({
                    id: key,
                    name: meals[key].name,
                    description: meals[key].description,
                    price: meals[key].price
                });
            }
            setMeals(loadedMeals);
        };
        fetchHttpRequest({url: '/meals.json'}, fetchDataHandler);
    }, [fetchHttpRequest]);

    const mealsList = meals.map(meal => {
        return (
            <MealItem
                id={meal.id}
                key={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
            />
        );
    });

    if (isLoading) {
        return (
            <section className={classes.mealsIsLoading}>
                <p>is loading.....</p>
            </section>
        );
    }
    ;

    if (httpError) {
        return (
            <section className={classes.mealsIsError}>
                <p>Fetch Error</p>
            </section>
        );
    }

    return <section className={classes.meals}>
        <Card>
            <ul>
                {mealsList}
            </ul>
        </Card>
    </section>;
};

export default AvailableMeals;
