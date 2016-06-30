import React from 'react'
import Map, {GoogleApiWrapper} from 'google-maps-react'
import {searchNearby} from 'utils/googleApiHelpers'
import Header from 'components/Header/Header'

import styles from './styles.module.css'

export class Container extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      places: [],
      pagination: null
    }
  }

  onReady(mapProps, map) {
    searchNearby(
      this.props.google,
      map,
      {
        location: map.center,
        radius: '500',
        types: ['cafe']
      }
    ).then((results, pagination) => {
      this.setState({
        places: results,
        pagination
      })
    }).catch((status) => {
      console.log('error fetching nearby', status)
    })
  }
  
  render() {
    return (
        <Map
          google={this.props.google}
          onReady={this.onReady.bind(this)}
          visible={false}>
 {/*         className={styles.wrapper}>*/}
          <Header />
          <div className={styles.content}>
          {this.state.places.map(place => {
            return (<div key={place.id}>{place.name}</div>)
          })}
</div>
        </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: __GAPI_KEY__
})(Container)