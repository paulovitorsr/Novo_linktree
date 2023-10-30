import { Link } from "react-router-dom";

export const Error = () => {
  return (
    <div className="flex flex-col justify-center items-center text-white w-full min-h-screen">
        <h1 className="font-bold text-4xl mb-4">Página não encontrada: Error 404</h1>
        <p className="italic text-1xl mb-4">Você caiu em uma página que não existe</p>
        <Link to="/" className="bg-gray-50/20 py-1 px-4 rounded">
            Voltar para Home
        </Link>
    </div>
  )
}
