import { useState } from "react"

function App() {
    const [message, setMessage] = useState("aucun message")
  const displayMsg=  async ()=>{
    try {
    const response =await fetch("http://localhost:8000")
    const data = await response.json()
    setMessage(data.message)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="grid h-screen w-full place-content-center">
      <button onClick={displayMsg}>fetch</button>
      <p>{message}</p>
    </div>
  )
}

export default App
