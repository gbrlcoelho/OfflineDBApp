import React from 'react'
import {StatusBar} from 'react-native'
import {Home} from './src/screens/Home'
import {gestureHandlerRootHOC} from 'react-native-gesture-handler'

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={'transparent'} translucent barStyle={'light-content'} />
      <Home />
    </>
  )
}

export default gestureHandlerRootHOC(App)
