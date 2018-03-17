import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { DrizzleProvider } from 'drizzle-react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

// Layouts
import App from './App'
import HomeContainer from './layouts/home/HomeContainer'
import LoadingContainer from './layouts/loading/LoadingContainer'

// Pages
import ApplyContainer from './pages/apply'
import ReviewContainer from './pages/review'
import MyInfoContainer from './pages/myInfo'
import ProjectsContainer from './pages/projects'

// Contracts
import ComplexStorage from './../build/contracts/ComplexStorage.json'
import SimpleStorage from './../build/contracts/SimpleStorage.json'
import TutorialToken from './../build/contracts/TutorialToken.json'
import Given from './../build/contracts/Given.json'

// Redux Store
import store from './store'

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store)

// Set Drizzle options.
const options = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://localhost:8545'
    }
  },
  contracts: [
    ComplexStorage,
    SimpleStorage,
    TutorialToken,
    Given
  ],
  events: {
    SimpleStorage: ['StorageSet']
  }
}

const muiTheme = getMuiTheme({
  tabs: {
    backgroundColor: 'clear',
    textColor: 'black',
    selectedTextColor: 'gray'
  },
  inkBar: {
    backgroundColor: 'gray'
  }
})

ReactDOM.render((
      <DrizzleProvider options={options}>
        <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={store}>
          <LoadingContainer>
            <Router history={history}>
              <Route path="/" component={App}>
                <IndexRoute component={HomeContainer} />
                {/*<IndexRoute component={MyInfoContainer} />*/}
                <Route path="apply" component={ApplyContainer} />
                <Route path="review" component={ReviewContainer}/>
                <Route path="myInfo" component={MyInfoContainer}/>
                <Route path="projects" component={ProjectsContainer} />
              </Route>
            </Router>
          </LoadingContainer>
        </Provider>
        </MuiThemeProvider>
      </DrizzleProvider>
  ),
  document.getElementById('root')
);
