import React from 'react'
import {StatusBar} from 'react-native'
import {Home} from './src/screens/Home'
import {GestureHandlerRootView} from 'react-native-gesture-handler'

const App = () => {
  return (
    <>
      <GestureHandlerRootView style={{flex: 1}}>
        <StatusBar backgroundColor={'transparent'} translucent barStyle={'light-content'} />
        <Home />
      </GestureHandlerRootView>
    </>
  )
}

export default App
