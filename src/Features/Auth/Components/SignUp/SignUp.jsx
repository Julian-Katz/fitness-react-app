import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signUpAsync, selectError } from "../../authSlice";
import { useSelector } from "react-redux";

function SignUp() {
    const disptach = useDispatch();
    const error = useSelector(selectError);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        disptach(signUpAsync({ email, password }));
    }

    return (
        <div>
            <h1>Registrieren</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>

                <button type="submit">Registrieren</button>
            </form>
            <p>{error}</p>
        </div>
    );
};

export default SignUp;
