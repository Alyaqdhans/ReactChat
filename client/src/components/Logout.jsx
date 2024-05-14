import { useNavigate } from 'react-router-dom'

function Logout(props) {
  const navigate = useNavigate()

  props.setIsLogged(null)
  navigate('/login')
}

export default Logout