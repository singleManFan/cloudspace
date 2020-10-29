import React from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import CustomTabBar from '../../components/custom-tab-bar'
import Section from '../../components/section'

export default function Index() {
  return (
    <View className='index'>
      <CustomTabBar tabKey={0} />
        <Section></Section>
      </View>
    )
}
