import { useEffect, useState } from "react"
import supabase from "../utils/supabase"


export default function MyMeals({navigate, user}) {
    const [meals, setMeals] = useState([]);
    useEffect(() => {
        async function getMyMeals() {
            const { data, error } = await supabase
            .from("potluck_meals")
            .select()
            .eq("user_id", user.id);
            console.log(data);
            if(!error) {
                setMeals(data);
            }
        }
        getMyMeals();
    }, [])


    const mealsElements = meals.map(meal => (
        <div key={meal.id}>
            <h3>{meal.meal_name} serves: {meal.serves}</h3>
        </div>
    ))

    return (
        <div>
            <h1>My Meals for {user && user.email}</h1>
            <p>{user && user.id}</p>
            <div>
                {mealsElements}
            </div>
        </div>
    )
}