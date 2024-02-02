import React, { useState } from 'react'
import { Heading } from '../components/Heading'
import { SubHeading } from '../components/SubHeading';
import axios from "axios"
import { Button } from '../components/Button'
import { BottomWarning } from '../components/BottomWarning'
import { InputBox } from '../components/InputBox'
import "../index.css"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 


export const Signup = () => {
  const navigate = useNavigate(); 


  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function handleClick() {
    const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
      firstName,
      lastName,
      username, 
      password
    });
    localStorage.setItem('token', response.data.token);

    navigate("/dashboard");


  }

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"}/>
          <SubHeading label={"Enter your information to create account"}/>
          <InputBox onChange={e => setFirstName(e.target.value)} label={"firstName"} placeholder={"John"}/>
          <InputBox onChange={e => setLastName(e.target.value)} label={"lastName"} placeholder={"sen"}/>
          <InputBox onChange={e => setUsername(e.target.value)} label={"email"} placeholder={"John@example.com"}/>
          <InputBox onChange={e => setPassword(e.target.value)} label={"password"} placeholder={"123456789"}/>
          <Button label={"Signup"} onClick={handleClick}/>
          
          <BottomWarning label={"Already have an account"} buttonText={"Signin"} to={"/Signin"}/>
        </div>
      </div>
    </div>
  )
}
