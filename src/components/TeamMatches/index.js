// Write your code here
// Write your code here

import {Component} from 'react'

import './index.css'

import Loader from 'react-loader-spinner'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {
    bannerUrl: '',
    latestMatch: {},
    recentMatchesList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamMatchDetails()
  }

  getTeamMatchDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const updatedData = {
      bannerUrl: data.team_banner_url,
      latestMatchDetails: data.latest_match_details,
      recentMatches: data.recent_matches,
    }

    const {latestMatchDetails} = updatedData

    const formattedLatestmatchDetails = {
      umpires: latestMatchDetails.umpires,
      result: latestMatchDetails.result,
      id: latestMatchDetails.id,
      date: latestMatchDetails.date,
      venue: latestMatchDetails.venue,
      manOfTheMatch: latestMatchDetails.man_of_the_match,
      competingTeam: latestMatchDetails.competing_team,
      competingTeamLogo: latestMatchDetails.competing_team_logo,
      firstInnings: latestMatchDetails.first_innings,
      secondInnings: latestMatchDetails.second_innings,
      matchStatus: latestMatchDetails.match_status,
    }
    console.log(formattedLatestmatchDetails)

    const {recentMatches} = updatedData
    const formatedRecentMatches = recentMatches.map(each => ({
      umpires: each.umpires,
      result: each.result,
      id: each.id,
      date: each.date,
      venue: each.venue,
      manOfTheMatch: each.man_of_the_match,
      competingTeam: each.competing_team,
      competingTeamLogo: each.competing_team_logo,
      firstInnings: each.first_innings,
      secondInnings: each.second_innings,
      matchStatus: each.match_status,
    }))
    console.log(formatedRecentMatches)

    this.setState({
      bannerUrl: updatedData.bannerUrl,
      latestMatch: formattedLatestmatchDetails,
      recentMatchesList: formatedRecentMatches,
      isLoading: false,
    })
  }

  render() {
    const {bannerUrl, latestMatch, recentMatchesList, isLoading} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params

    return (
      <div className={id}>
        {isLoading ? (
          <div testid="loader" className="loader-container">
            <Loader type="Oval" color="#ffffff" height="50" />
          </div>
        ) : (
          <div>
            <img src={bannerUrl} alt="team banner" className="team-banner" />
            <LatestMatch details={latestMatch} />
            <ul className="recent-matches-list">
              {recentMatchesList.map(each => (
                <MatchCard matchData={each} key={each.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}
export default TeamMatches
