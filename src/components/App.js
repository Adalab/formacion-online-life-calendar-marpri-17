import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MoodList from './MoodList';
import EditorForm from './EditorForm';
import '../stylesheets/App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actualDate: "",
      userData: [{
        "2019-10-25": "bad"
      }, {
        "2019-10-29": "good",
        "message": "Having"
      }, {
        "2019-10-28": "bad"
      },
      {
        "2019-10-31": "good",
        "message": "It's Hallowen!"
      }]
    }

    this.handleSaveData = this.handleSaveData.bind(this);
    this.getActualDate = this.getActualDate.bind(this);
    this.renderFormDay = this.renderFormDay.bind(this);
    this.renderMoodList = this.renderMoodList.bind(this);
  }

  getActualDate() {
    const date = new Date();
    const getDay = date.getDate();
    const getMonth = date.getMonth() + 1;
    const getYear = date.getFullYear();
    const currentDay = getYear + "-" + getMonth + "-" + getDay;
    console.log(currentDay)
    const savedData = JSON.parse(localStorage.getItem("LSuserData"));
    console.log(savedData)
    savedData ? this.setState({
      actualDate: currentDay,
      userData: savedData
    }) :
      this.setState({
        actualDate: currentDay,
      })
  }

  componentDidMount() {
    this.getActualDate();

  }

  handleSaveData(newDayConfiguredByUser) {
    const { userData } = this.state;
    const newUserData = userData.concat(newDayConfiguredByUser);
    console.log(newUserData)
    this.setState({
      userData: newUserData
    }, () => localStorage.setItem("LSuserData", JSON.stringify(this.state.userData)))

  }

  renderMoodList() {
    return (<MoodList userData={this.state.userData} />)
  }

  renderFormDay() {
    return (<EditorForm actualDate={this.state.actualDate} userData={this.state.userData} handleSaveData={this.handleSaveData} />)
  }

  render() {
    return (
      <div className="App">
        {(this.state.actualDate) ?
          <Switch>
            <Route exact path="/" render={this.renderMoodList} />
            <Route exact path="/today" render={this.renderFormDay} />
          </Switch> : "Cargando"
        }
      </div>
    );
  }
}

export default App;
