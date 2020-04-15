import React from 'react'

import request from 'superagent'

import Punchline from './Punchline'

const apiUrl = 'https://official-joke-api.appspot.com/jokes/random'
/* e.g. 
{"id":14,"type":"knock-knock","setup":"Knock knock. \n Who's there? \n Little old lady. \n Little old lady who?","punchline":"I didn't know you could yodel!"} */

class Jokes extends React.Component {
  state = {
    type: '',
    setup: '',
    punchline: ''
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

  
  render() {
    return(
      <>
        <span>[type: {this.state.type}]</span>
        <h4>{this.state.setup}</h4>

        {/* TEST: <p>{this.state.punchline}</p> */}
        <Punchline punchline={this.state.punchline} />

        {/* TODO: SHOW punchline link */}

        <button onClick={this.refreshPage}>Refresh</button>
      </>
    )
  }
}

export default Jokes