import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Logout(props) {
  const navigate = useNavigate()

  useEffect(() => {
    props.setIsLogged(null)
    navigate('/login')
  }, [])
}

export default Logout