import { useNavigate } from 'react-router-dom'

function Logout(props) {
  const navigate = useNavigate()

  const handleLogout = () => {
    props.socket.emit("leave")
    props.setIsLogged(null)
    navigate('/login')
  }

  setTimeout(() => {
    handleLogout()
  }, 1000);
  
  return (
    <h1 className='text-center'>Logging out...</h1>
  )
}

export default Logout