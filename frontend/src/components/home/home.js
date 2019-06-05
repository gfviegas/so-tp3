import React, { Component} from 'react'
import axios from 'axios'

// Assets
import logo from '../../assets/images/logo.svg'
import './home.sass'

class Home extends Component {
  state = { message: '' }

  async componentDidMount () {
    try {
      const message = JSON.stringify(await this.callApi())
      this.setState({message})
    } catch (e) {
      console.error(e)
      this.setState({message: 'Erro na API!'})
    }
  }

  async callApi () {
    console.info('Call APi called')
    const response = await axios.get('/api/')
    const body = response.data

    if (response.status !== 200 && response.status !== 204) throw Error(body.message)

    return body
  }

  render () {
    return (
      <div className='app'>
        <header className='app-header'>
          <img src={logo} className='app-logo' alt='logo' />
          <p> Mensagem da API: {this.state.message} </p>
        </header>
      </div>
    )
  }
}


export default Home
