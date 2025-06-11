import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Aquí va la llamada al backend
    alert(`Iniciando sesión con: ${email}`)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h2 className="text-3xl font-bold mb-4">Iniciar Sesión</h2>
      <form className="flex flex-col gap-4 w-80" onSubmit={handleSubmit}>
        <input
          className="p-2 rounded bg-gray-800 border border-gray-700"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="p-2 rounded bg-gray-800 border border-gray-700"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="p-2 bg-yellow-500 rounded text-black font-bold hover:bg-yellow-400">
          Entrar
        </button>
      </form>
    </div>
  )
}
