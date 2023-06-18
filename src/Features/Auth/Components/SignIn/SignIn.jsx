import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signInAsync, selectError } from "../../authSlice";
import { useNavigate } from "react-router-dom";


function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectError);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(signInAsync({ email, password }));
    if (signInAsync.fulfilled.match(resultAction)) {
      navigate("/");
    }
  };

  return (
    <div>
      <h1>Anmelden</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Anmelden</button>
      </form>
      <p>{error}</p>
    </div>
  );
}

export default LogIn;
