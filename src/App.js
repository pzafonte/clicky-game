import React, { Component } from 'react';
import { Row, CardPanel, Col } from 'react-materialize';
import { faGithubAlt, faNodeJs, faReact, faChrome, faLinux, faApple, faReddit, faWindows, faFirefox, faNpm, faAws, faDev} from '@fortawesome/free-brands-svg-icons'
import Card from './components/Card';
import Nav from './components/Nav';

class App extends Component {
  state = {
    icons: [faGithubAlt, faNodeJs, faReact, faChrome, faLinux, faApple, faReddit, faWindows, faFirefox, faNpm, faAws, faDev].sort(this.randomize),
    clicked: [],
    score: 0,
    highScore: 0,
    correct: undefined,
    gameWon: false
  }

  randomize = () => Math.random() > .5 ? -1 : 1

  clickHandler = iconName => {
    if (this.state.clicked.indexOf(iconName) === -1) {
      let score = this.state.clicked.length + 1,
        clicked = score === this.state.icons.length ? [] : [...this.state.clicked, iconName]

      this.setState({
        icons: this.state.icons.sort(this.randomize),
        clicked: clicked,
        score: score,
        highScore: Math.max(this.state.highScore, score),
        correct: true,
        gameWon: score === this.state.icons.length
      })
    } else {
      this.setState({
        icons: this.state.icons.sort(this.randomize),
        clicked: [],
        score: 0,
        correct: false,
        gameWon: false
      })
    }
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <Nav correct={this.state.correct} gameWon={this.state.gameWon} score={this.state.score} highScore={this.state.highScore} />
          <Row>
            <Col s={12}>
              <CardPanel className="center">
                <p>Each unique image clicked earns you points. Don't click the same image more than once!</p>
              </CardPanel>
            </Col>
          </Row>
        </div>
        <div className="container">
          <Row>
            {this.state.icons.map(icon => <Card correct={this.state.correct} key={icon.iconName} icon={icon} clickHandler={this.clickHandler} />)}
          </Row>
        </div>
      </div>


    );
  }



}

export default App;
