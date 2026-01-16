import { useState } from "react";
import supabase from "../utils/supabase";

export default function SignIn({user, setUser, navigate}) {
    const [hasError, setHasError] = useState(false);


    async function handleSubmit(e) {
        e.preventDefault();
        console.log(e);
        const username = e.target.elements.username.value;
        const password = e.target.elements.password.value;

        console.log(username, password);

        const { data, error } = await supabase.auth.signInWithPassword({
            email: username,
            password: password,
        });

        console.log(data, error);

        //const user = data.user;
        setUser(data.user);
        navigate("home")


    }

    let welcomeMessage = "";
    if (user) {
        welcomeMessage = (
            <div>
                Welcome: {user.email}
            </div>
        );
    }

    return (
        <div>
            <h1>Sign In to Potluck Heaven</h1>
            {hasError && <div>Error!</div>}
            {welcomeMessage}
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Email/Phone:</label>
                    <input type="text" name="username" id="username" placeholder="user@example.com" />
                    <br />
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" />
                    <br />
                    <input type="submit" value="Sign In" />
                </form>
            </div>
        </div>
    );
}
