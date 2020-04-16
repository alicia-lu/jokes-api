import React from 'react'
import request from 'superagent'

import Punchline from './Punchline'


const apiUrl = 'https://official-joke-api.appspot.com/jokes/random'
/* e.g. 
{"id":14,"type":"knock-knock","setup":"Knock knock. \n Who's there? \n Little old lady. \n Little old lady who?","punchline":"I didn't know you could yodel!"} */

class Jokes extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
        type: '',
        setup: '',
        punchline: '',
        showPunchline: false
      }

    this.showPunchline = this.showPunchline.bind(this)
  }

  componentDidMount() {
    request.get(apiUrl)
      .then(res => {
        //see what is received:
        // console.log(res.body)
        const { type, setup, punchline } = res.body
        this.setState({
          type,
          setup,
          punchline,
        })
      })
  }

  refreshPage() {
   window.location.reload(false);
  }

  showPunchline() {
    // console.log("something")
    this.setState({
      showPunchline: true
    })
  }

  
  render() {
    return(
      <div className="joke container">
        <h1>Joke Time!</h1>
        <p>[type: {this.state.type}]</p>
        <button onClick={this.refreshPage}>New Joke</button>
        <h4>{this.state.setup}</h4>

        {/* TEST: <p>{this.state.punchline}</p> */}
      
        <a href="#" onClick={this.showPunchline}>Answer</a>
        {this.state.showPunchline 
           ? <Punchline 
                punchline={this.state.punchline} 
                showPunchline={this.showPunchline}
            /> 
          : ""
        }
      </div>
    )
  }
}

export default Jokes