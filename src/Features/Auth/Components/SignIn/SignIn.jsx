import React from "react";
import { useState } from "react";
import axios from "../../../../axiosURL";

function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("/signin", { email, password }, { withCredentials: true })
        .then((res) => {
            console.log(res);

        }).catch((err) => {
            setResponse(err.response.data);
        });
    }

    return (
        <div>
            <h1>Anmelden</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>

                <button type="submit">Anmelden</button>
            </form>
            <p>{response}</p>
        </div>
    );
};

export default LogIn;