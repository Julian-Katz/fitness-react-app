import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signUpAsync, selectError } from "../../authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../../../Components/Card";
import './SignUp.scoped.css'

function SignUp() {
    const disptach = useDispatch();
    const navigate = useNavigate();
    const error = useSelector(selectError);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();
      const resultAction = await disptach(signUpAsync({ email, password }));
      if (signUpAsync.fulfilled.match(resultAction)) {
        navigate("/");
      }
    }
    const buttons = (
      <>
        <button type="submit" className='button' onClick={handleSubmit} >Registrieren</button>
      </>
    )

    return (
        <div className="start-container">
          <Card buttons={buttons}>
            <h1>Registrieren</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
            </form>
            <p>{error}</p>
          </Card>
        </div>
    );
};

export default SignUp;
