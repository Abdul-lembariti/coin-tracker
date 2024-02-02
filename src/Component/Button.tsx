import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { back, isDarkAtom } from '../atom'

const Button = styled.button`
  width: 50px;
  height: 50px;
  background: transparent;
  border: 4px solid #ffffff17;
  border-radius: 50px;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 20px;
  left: 20px;
  cursor: pointer;
`

function PrevButton() {
  const path = useRecoilValue(back)
  const darkMode = useRecoilValue(isDarkAtom)
  return (
    <Button>
      <Link to={path}>
        <FontAwesomeIcon
          size="2x"
          color={!darkMode ? 'black' : ''}
          icon={faArrowAltCircleLeft}
        />
      </Link>
    </Button>
  )
}

export default PrevButton
