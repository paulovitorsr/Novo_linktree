import React from 'react'

import { Link } from 'react-router-dom'
import {BiLogOut} from 'react-icons/bi';

import { Auth } from '../../Services/FirebaseConection';
import { signOut } from 'firebase/auth';

export const Header = () => {

    async function handleLogout() {
        await signOut(Auth);
    }

  return (
    <header className="w-full max-w-2xl mt-4 px-1">
        <nav className="w-full bg-white h-12 flex items-center justify-between rounded-md px-3">
            <div className='flex gap-4 font-medium'>
                <Link to="/">
                    Home
                </Link>
                <Link to="/admin">
                    Links
                </Link>
                <Link to="/admin/social">
                    Redes sociais
                </Link>

            </div>

            <button onClick={handleLogout}>
                <BiLogOut size={28} color="#db2629" />
            </button>
        </nav>
    </header>
  )
}
