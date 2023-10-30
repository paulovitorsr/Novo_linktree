import {useEffect, useState} from 'react'
import { Social } from '../../components/Social'

import {FaFacebook, FaInstagram, FaYoutube} from 'react-icons/fa';
import { db } from '../../Services/FirebaseConection';
import {
  getDocs,
  getDoc,
  collection,
  query,
  orderBy,
  doc
} from "firebase/firestore";

interface linkProp{
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

interface socialProp{
  facebook: string;
  instagram: string;
  youtube: string;
}

export const Home = () => {
  const [links, setLinks] = useState<linkProp[]>([]);
  const [social, setSocail] = useState<socialProp>();

  useEffect( () =>{
    function loadLinks(){
      const linkRef = collection(db, "links");
      const queryRef = query(linkRef, orderBy("created", "asc"));

      getDocs(queryRef)
      .then( (snapshot) => {
        const lista = [] as linkProp[];

        snapshot.forEach( (doc) => {
          lista.push({
            id: doc.id,
            name: doc.data().name,
            url: doc.data().url,
            bg: doc.data().bg,
            color: doc.data().color
          })

          setLinks(lista);

        } )
      } )
      .catch( (error) => {
        console.log("Não foi possível carregar seus links" + error)
      } )
    }

    loadLinks();

  }, [])

  useEffect( () => {
    function loadSocial(){
      const docRef = doc(db, "social", "links");
        getDoc(docRef)
        .then( (snapshot) => {
          if(snapshot.data() !== undefined){
            setSocail({
              facebook: snapshot.data()?.facebook,
              instagram: snapshot.data()?.instagram,
              youtube: snapshot.data()?.youtube
            })
          }
        } )
        .catch( (err) => {
          console.log("Erro" + err)
        } )
    }

    loadSocial();

  }, [] )

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="md:text-4xl text-3xl font-bold text-white">Paulo Vitor</h1>
      <span className="text-gray-50 mb-5 mt-3">Veja meus links 👇</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        {links.map( (item) => (
          <section 
            className="mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer" 
            style={{ backgroundColor: item.bg }}
            key={item.id}
          >
            <a href={item.url} target='_blank'>
              <p className="text-base md:text-lg" style={{ color: item.color }}>
                {item.name}
              </p>
            </a>
          </section>
        ) )}

        {social && Object.keys(social).length > 0 && (
          <footer className="flex justify-center gap-3 my-4">
            <Social url={social.facebook}>
              <FaFacebook size={35} color="#fff" />
            </Social>
            <Social url={social.instagram}>
              <FaInstagram size={35} color="#fff" />
            </Social>
            <Social url={social.youtube}>
              <FaYoutube size={35} color="#fff" />
            </Social>
          </footer>
        )}
        
      </main>
    </div>
  )
}
