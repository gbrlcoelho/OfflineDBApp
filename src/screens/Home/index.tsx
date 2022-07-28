import React, {useRef, useState, useEffect} from 'react'
import {FlatList, Alert} from 'react-native'
import BottomSheet from '@gorhom/bottom-sheet'
import {Menu, MenuTypeProps} from '../../components/Menu'
import {Skill} from '../../components/Skill'
import {Button} from '../../components/Button'
import {Container, Title, Input, Form, FormTitle} from './styles'
import {database} from '../../database'
import {SkillModel} from '../../database/model/skillModel'
import {Q} from '@nozbe/watermelondb'

export function Home() {
  const [type, setType] = useState<MenuTypeProps>('soft')
  const [name, setName] = useState('')
  const [skills, setSkills] = useState<SkillModel[]>([])
  const [editSkill, setEditSkill] = useState<SkillModel>({} as SkillModel)

  const bottomSheetRef = useRef<BottomSheet>(null)

  const handleSave = async () => {
    if (editSkill.id) {
      await database.write(async () => {
        await editSkill.update((data) => {
          data.name = name
          data.type = type
        })
      })
      Alert.alert(`${type.charAt(0).toUpperCase() + type.slice(1)} Skill - ${name} updated!`)
      setEditSkill({} as SkillModel)
    } else {
      await database.write(async () => {
        await database.get<SkillModel>('skills').create((data) => {
          data.name = name
          data.type = type
        })
      })
      Alert.alert(`${type.charAt(0).toUpperCase() + type.slice(1)} Skill - ${name} created!`)
    }

    bottomSheetRef.current?.collapse()
    setName('')
    getData()
  }

  const getData = async () => {
    const skillColection = database.get<SkillModel>('skills')
    const response = await skillColection.query(Q.where('type', type)).fetch()
    setSkills(response)
  }

  const handleRemove = async (item: SkillModel) => {
    await database.write(async () => {
      await database.get('skills').find(item.id)
      item.destroyPermanently()
    })
    getData()
    Alert.alert('Skill removed!')
  }

  const handleEdit = async (item: SkillModel) => {
    setEditSkill(item)
    setName(item.name)
    bottomSheetRef.current?.expand()
  }

  useEffect(() => {
    getData()
  }, [type])

  return (
    <Container>
      <Title>About me</Title>
      <Menu type={type} setType={setType} />

      <FlatList
        data={skills}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <Skill data={item} onEdit={() => handleEdit(item)} onRemove={() => handleRemove(item)} />}
      />

      <BottomSheet ref={bottomSheetRef} index={0} snapPoints={['3%', '30%']}>
        <Form>
          <FormTitle>Skill</FormTitle>

          <Input placeholder='New skill...' onChangeText={setName} value={name} />

          <Button title='Save' onPress={handleSave} />
        </Form>
      </BottomSheet>
    </Container>
  )
}
