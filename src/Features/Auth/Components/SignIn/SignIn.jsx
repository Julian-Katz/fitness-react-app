import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signInAsync, selectError } from "../../authSlice";
import { useNavigate } from "react-router-dom";
import Card from "../../../../Components/Card";
import './SignIn.scoped.css'


function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectError);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    const resultAction = await dispatch(signInAsync({ email, password }));
    if (signInAsync.fulfilled.match(resultAction)) {
      navigate("/");
    }
  };

  const buttons = (
    <>
      <button type="submit" className='button' onClick={handleSubmit} >Anmelden</button>
    </>
  )

  return (
    <div className="start-container">
      <Card buttons={buttons}>
        <div className="header">
        <h2>Anmelden</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
        </form>
        <p>{error}</p>
      </Card>
    </div>
  );
}

export default LogIn;
