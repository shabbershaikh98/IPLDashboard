// Write your code here
// Write your code here
import {Link} from 'react-router-dom'

import './index.css'

const TeamCard = props => {
  const {details} = props
  const {id, name, teamImgUrl} = details
  return (
    <Link to={`/team-matches/${id}`} className="item-link">
      <li className="team-card-container">
        <img className="team-image" src={teamImgUrl} alt={name} />
        <p className="team-name">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
