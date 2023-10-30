import {useState, useEffect, FormEvent} from 'react'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'

import { db } from '../../Services/FirebaseConection';
import {
  doc,
  setDoc,
  getDoc

} from "firebase/firestore";
import { Header } from '../../components/Header';

export const Network = () => {
  const [facebook, setFacebook] = useState("")
  const [instagram, setInstagram] = useState("")
  const [youtube, setYoutube] = useState("")

  useEffect( () => {
    function loadLink(){
      const docRef = doc(db, "social", "links");
      getDoc(docRef)
      .then( (snapshot) => {
        if(snapshot.data() !== undefined){
          setFacebook(snapshot.data()?.facebook);
          setInstagram(snapshot.data()?.instagram);
          setYoutube(snapshot.data()?.youtube);
        }
      } )
      .catch( (error) => {
        console.log(error)
      } )
    }

    loadLink();

  }, [] )

  function handleSocial(e: FormEvent){
    e.preventDefault()

    setDoc(doc(db, "social", "links"), {
      facebook: facebook,
      instagram: instagram,
      youtube: youtube
    })
    .then( () => {
      setFacebook("");
      setInstagram("");
      setYoutube("");
      console.log("Cadastrado com sucesso!");
    } )
    .catch( (err) => {
      console.log("Erro ao cadastrar" + err);
    } )
  }

  return (
    <div className='flex flex-col items-center min-h-screen pb-7 px-2'>
      <Header/>
      <h1 className='text-white font-medium text-2xl mt-8 mb-4'>Minhas redes sociais</h1>

      <form 
        onSubmit={handleSocial}
        className="flex flex-col max-w-xl w-full"
      >
        <label className="text-white font-medium mt-2 mb-3">
          Link do facebook
        </label>
          <Input 
            placeholder='Digite a url do facebook'
            value={facebook}
            onChange={ (e) => setFacebook(e.target.value) }
            
        />
        
        <label className="text-white font-medium mt-2 mb-3">
          Link do Instagram
        </label>
          <Input 
            placeholder='Digite a url do Instagram'
            value={instagram}
            onChange={ (e) => setInstagram(e.target.value) }

          />
        
        <label className="text-white font-medium mt-2 mb-3">
          Link do Youtube
        </label>

          <Input 
            placeholder='Digite a url do Youtube'
            value={youtube}
            onChange={ (e) => setYoutube(e.target.value) }

        />
        

        <Button props='Salvar links'/>
      </form>
    </div>
  )
}
