import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  // we want data to be fetched when page loads, thus use useEffect
  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch(process.env.REACT_APP_DATABASE_MEALS_URL);

      // if there is an error code, an error will be thrown by the fetchMeals function
      if (!response.ok) {
        throw new Error("Something went wrong!"); //when error is thrown the code hereafter isn't executed
      }

      const responseData = await response.json();

      // what we get back as data from firebase is object, so to convert it to array-

      const loadedMeals = [];

      // go through every nested object in the responseData object, by the specific key, that is the id, m1, m2 so on...and push a new object into the loadedMeals array
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    }

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.mealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;
