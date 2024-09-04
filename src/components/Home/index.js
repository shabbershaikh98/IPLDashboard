// Write your code here
// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {teamsData: [], isLoading: true}

  componentDidMount() {
    this.getTeamCardDetails()
  }

  getTeamCardDetails = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    console.log(data)
    const statusCode = await response.statusCode
    console.log(statusCode)
    const {teams} = data
    const updatedData = teams.map(each => ({
      name: each.name,
      id: each.id,
      teamImgUrl: each.team_image_url,
    }))
    console.log(updatedData)
    this.setState({teamsData: updatedData, isLoading: false})
  }

  render() {
    const {isLoading, teamsData} = this.state
    console.log(isLoading)

    return (
      <div className="home-container">
        <div className="logo-title-container">
          <img
            className="ipllogo"
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
          />
          <h1 className="title">IPL Dashboard</h1>
        </div>
        <div className="teamcards-list-container">
          {isLoading ? (
            <div testid="loader">
              <Loader
                type="Oval"
                color="#ffffff"
                height={50}
                width={50}
                alt="loader"
              />
            </div>
          ) : (
            <ul className="list">
              {teamsData.map(each => (
                <TeamCard key={each.id} details={each} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default Home
