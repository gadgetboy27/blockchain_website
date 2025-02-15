import React, { Component } from 'react';
// import logo from '../logo.png';
import './App.css';
import Web3 from 'web3'

class App extends Component {

  async componentWillMount() {
    // Load Web3
    let web3 = new Web3('https://mainnet.infura.io/v3/75763fda3ace427a80c5efc1fed3f194')

    // Fetch latest block
    let latestBlock = await web3.eth.getBlock('latest')
    console.log('latest block', latestBlock)
    this.setState({
      blockNumber: latestBlock.number,
      difficulty: latestBlock.difficulty
    })

    // Fetch Gas price
    let gasPrice = await web3.eth.getGasPrice()
    console.log('gasPrice', gasPrice)
    this.setState({
      gasPrice: gasPrice
    })

    // Fetch latest 10 blocks
    let block
    let latestBlocks = []
    for (let i = 0; i < 10; i++) {
      block = await web3.eth.getBlock(latestBlock.number - i)
      console.log(block)
      latestBlocks.push(block)
    }
    this.setState({
      latestBlocks: latestBlocks
    })
    
  }

  constructor(props) {
    super(props)
    this.state = {
      blockNumber: 0,
      difficulty: 0,
      gasPrice: 0,
      latestBlocks: []
    }
  }


  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="https://www.cooldaddydesign.com"
            target="_blank"
            rel="noopener noreferrer">
          
            CoolDaddy ETH Dapp
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto" style={{ width: '800px' }}>
                <h4>Ethereum Blockchain Explorer</h4>
                <div className="row">
                  <div className="col-4">
                    <div className="bg-light pt-5 pb-4 m-1">
                      <h5>Latest Block</h5>
                      <p>{this.state.blockNumber}</p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="bg-light pt-5 pb-4 m-1">
                      <h5>Difficulty</h5>
                      <p>{this.state.difficulty}</p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="bg-light pt-5 pb-4 m-1">
                      <h5>Gas Price</h5>
                      <p>{this.state.gasPrice}</p>
                    </div>
                  </div>

                </div>

                <div className="row">
                  <div className="col-lg-12 mt-3">

                    <div className="card">
                      <div className="card-header">
                        <h5>Latest Blocks</h5>
                      </div>
                      <div className="card-body">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Hash</th>
                              <th scope="col">Miner</th>
                              <th scope="col">Timestamp</th>
                            </tr>
                          </thead>
                          <tbody>
                            { this.state.latestBlocks.map((block, key) => {
                              var myDate = new Date();
                              
                              return (
                                <tr key={key} >
                                  <th scope="row">{block.number}</th>
                                  <td>{block.hash.substring(0,20)}...</td>
                                  <td>{block.miner.substring(0,20)}...</td>
                                  <td>{(myDate.toLocaleString())}</td>
                                </tr>
                              )
                            }) }
                          </tbody>
                        </table>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
