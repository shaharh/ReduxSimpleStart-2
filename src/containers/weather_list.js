import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindStat} from 'redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';


class WeatherList extends Component {
  renderWeather(cityData) {
    const name = cityData.city.name;
    const {lon, lat} = cityData.city.coord;
    const temps = cityData.list.map(weather => weather.main.temp);
    const pressure = cityData.list.map(weather => weather.main.pressure);
    const humidity = cityData.list.map(weather => weather.main.humidity);
    return (
      <tr key={cityData.city.id}>
        <td><GoogleMap lon={lon} lat={lat} /></td>
        <td><Chart data={temps} color="purple" units="K" /></td>
        <td><Chart data={pressure} color="blue" units="hPa" /></td>
        <td><Chart data={humidity} color="green" units="%" /></td>
      </tr>
    )
  }
  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temprature (K)</th>
            <th>Pressure (hPa)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weather.map(this.renderWeather)}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps({weather}) { //=== (state.weather)
  return {weather}; // === {weather: weather}
}

export default connect(mapStateToProps)(WeatherList);
