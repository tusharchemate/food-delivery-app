import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItems/MealItem";


const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  useEffect( () => {

    const fetchMeals = async () => {
      const res =  await fetch('https://food-delivery-4adc0-default-rtdb.firebaseio.com/meals.json');
      const responceData = await res.json();

      const loadedMeals = [];
      console.log(loadedMeals);

      for(let key in responceData) {
        loadedMeals.push({
          id:key,
          name:responceData[key].name,
          price:responceData[key].price,
          description: responceData[key].description
        })
      }
      setMeals(loadedMeals);
    }
    fetchMeals();
  },[])

  const mealList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    ></MealItem>
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
