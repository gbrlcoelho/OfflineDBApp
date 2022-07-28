import React from 'react'
import {TouchableOpacityProps} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'

import {Container, Title} from './styles'

type Props = TouchableOpacityProps & {
  title: string
  isActive?: boolean
}

export function MenuItem({title, isActive = false, ...rest}: Props) {
  return (
    <Container isActive={isActive} {...rest} accessibilityRole={'none'}>
      <Entypo name={title === 'Soft Skills' ? 'user' : 'tools'} color='#FFF' size={24} />
      <Title>{title}</Title>
    </Container>
  )
}
