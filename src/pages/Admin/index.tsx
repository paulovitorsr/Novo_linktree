import {useState, useEffect, FormEvent} from 'react'

import { db } from '../../Services/FirebaseConection';
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc
} from "firebase/firestore";

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'

import {FiTrash2} from "react-icons/fi";

interface linkProp{
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

export const Admin = () => {
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [textColorInput, setTextColorInput] = useState("#000");
  const [bgColorInput, setBgtColorInput] = useState("#EC411C");
  const [links, setLinks] = useState<linkProp[]>([]);

  //Buscando no banco de dados
  useEffect( () => {
    const linkRef = collection(db, "links");
    const queryRef = query(linkRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      const lista = [] as linkProp[];

      snapshot.forEach( (doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color
        })
      } )

      setLinks(lista);

    })

    return () => {
      unsub()
    }

  }, [] )

  //Cadastrando no banco de dados
  function handleCadastro(e: FormEvent){
    e.preventDefault();

    if(nameInput === "" || urlInput === ""){
      alert("Preencha todos os campos!")
      return;
    }


    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlInput,
      bg: bgColorInput,
      color: textColorInput,
      created: new Date()
    })
    .then( () => {
      setNameInput("");
      setUrlInput("");
      setTextColorInput("#000");
      setBgtColorInput("#EC411C");
      console.log("Cadastrado com sucesso");
    } )
    .catch( (err) => {
      console.log("Erro ao cadastrar no banco" + err)
    } )

  }

   //Excluindo link do banco
    async function handleDeleteLink(id: string){
      const docRef = doc(db, "links", id);
      await deleteDoc(docRef);
    }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header/>

      <form onSubmit={handleCadastro} className="flex flex-col mt-8 w-full max-w-xl">
        <label className="text-white font-medium mt-2 mb-2">
          Nome do Link
        </label>
          <input 
            placeholder='Nome do link'
            type='text'
            value={nameInput}
            onChange={ (e) => setNameInput(e.target.value) }
            className='rounded-md border-0 px-2 py-2'
            
          />

        <label className="text-white font-medium mt-2 mb-2">
          URL do link
        </label>
          <input 
            placeholder='Digite a URL'
            type='url'
            className='rounded-md border-0 px-2 py-2'
            value={urlInput}
            onChange={ (e) => setUrlInput(e.target.value) }
          />

        <section className='flex gap-2 mt-4 mb-2'>
          <div>
            <label className='flex gap-2 items-center justify-center text-white'>
              Fundo do link
              <Input 
                type="color"
                value={bgColorInput}
                onChange={ (e) => setBgtColorInput(e.target.value) }
              />
            </label>
          </div>

          <div>
            <label className='flex gap-2 items-center justify-center text-white'>
              Cor do link
              <Input 
                type="color"
                value={textColorInput}
                onChange={ (e) => setTextColorInput(e.target.value) }
              />
            </label>
          </div>
        </section>

        {nameInput !== "" && (
          <div className="flex items-center justify-start flex-col mt-6 mb-7 p-1 border-gray-100/25 border rounded-md">
            <h2 className="text-white font-medium mt-2 mb-3">Veja como está ficando</h2>
            <article 
              className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
              style={{marginBottom: 8, marginTop: 8, backgroundColor: bgColorInput}}
            >
              <p style={{color: textColorInput, fontWeight: 'bold'}}>{nameInput}</p>
            </article>
          </div>
        )}

        <Button props="Cadastrar"/>

      </form>

      <h2 className="font-bold text-white mb-4 text-2xl">
        Meus links
      </h2>

      {links.map( (link) => (
        <article 
          key={link.id}
          className="flex items-center justify-between w-11/12 max-w-xl rounded-md py-3 px-2 mb-2 select-none"
          style={{ backgroundColor: link.bg,  color: link.color}}
        >
          <p>{link.name}</p>
          <div>
            <button 
              className="border border-dashed p-1 rounded bg-zinc-900"
              onClick={ () => handleDeleteLink(link.id) }
            >
              <FiTrash2 size={18} color="#fff"/>
            </button>
          </div>
        </article>
      ) )}

    </div>
  )
}
