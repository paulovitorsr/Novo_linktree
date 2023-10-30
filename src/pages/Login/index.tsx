import {FormEvent, useState} from 'react'
import {useNavigate, Link} from 'react-router-dom';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import {Auth} from "../../Services/FirebaseConection";
import { signInWithEmailAndPassword } from 'firebase/auth';

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  function handleLogin(e: FormEvent){
    e.preventDefault()

    if(email === '' || password === '') {
      alert("Preencha todos os campos!")
      return;
    }

    signInWithEmailAndPassword(Auth, email, password)
    .then( () => {  

      navigate("/admin", {replace: true});

    } ) 
    .catch( (err) => {
      console.log("Erro ao fazer login");
      console.log(err)
    } )

    setEmail("");
    setPassword("");
  }

  return (
    <div className="flex w-full flex-col text-center h-screen items-center justify-center">
      <Link to="/">
        <h1 className="mt-11 text-white mb-7 font-bold text-5xl">
          Dev
          <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">Links</span>
        </h1>
      </Link>

      <form onSubmit={handleLogin} className="flex flex-col w-full max-w-xl px-2">
        <Input
          placeholder='Digite seu E-mail'
          type='email'
          value={email}
          onChange={ (e) => setEmail(e.target.value) }
        />

        <Input
          placeholder='Digite sua senha'
          type='password'
          value={password}
          onChange={ (e) => setPassword(e.target.value) }
        />

        <Button props="Acessar"/>
      </form>

    </div>
  )
}
