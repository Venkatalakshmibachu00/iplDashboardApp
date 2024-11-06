// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {
    teamCardList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamsList()
  }

  getTeamsList = async () => {
    try {
      const url = `https://apis.ccbp.in/ipl`
      const options = {
        method: 'GET',
      }
      const response = await fetch(url, options)
      const data = await response.json()
      const dataList = data.teams

      const updatedData = dataList.map(eachTeam => ({
        id: eachTeam.id,
        name: eachTeam.name,
        teamImageUrl: eachTeam.team_image_url,
      }))

      this.setState({teamCardList: updatedData, isLoading: false})
    } catch (error) {
      console.log(`DB Error : ${error.message}`)
    }
  }

  renderLoader = () => (
    <div testid="loader" className="loader-container">
      <Loader type="Rings" color="#00BFFF" height={80} width={80} />
    </div>
  )

  renderTeamsList = () => {
    const {teamCardList} = this.state
    return (
      <ul className="team-list-items">
        {teamCardList.map(team => (
          <TeamCard key={team.id} teamData={team} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="app-container">
        <div className="ipl-container">
          <div className="header-container">
            <img
              className="ipl-logo"
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
            />
            <h1 className="header-heading">IPL Dashboard</h1>
          </div>
          {isLoading ? this.renderLoader() : this.renderTeamsList()}
        </div>
      </div>
    )
  }
}

export default Home
