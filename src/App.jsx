import React from 'react'
import './App.css'
import rateSources from './rateSources'
import QuoteView from './components/QuoteView'

class App extends React.Component {
  state = {
    currency: '',
    rate: '',
    nominal: ''
  }

  mounted = false
  
  intervalId = null

  componentDidMount() {
    this.mounted = true
    this.fetchNewRate()
    this.intervalId = setInterval(this.fetchNewRate, 10 * 1000)
  }

  componentWillUnmount() {
    this.mounted = false
    clearInterval(this.intervalId)
  }

  fetchNewRate = async () => {
    for (let i = 0; i < rateSources.length; i++) {
      try {
        let eur = await rateSources[i].func()
        if (!this.mounted) {
          break
        }
        this.setState({
          currency: eur.currency,
          rate: eur.rate,
          nominal: eur.nominal
        })
        break
      } catch(error) {
        console.error('error when fetching: ', error)
        continue
      }
    }
  }

  render() {
    return (
      <div className="App">
        <QuoteView currency={this.state.currency} rate={this.state.rate} nominal={this.state.nominal} />
      </div>
    )
  }
}

export default App