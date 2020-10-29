import React from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

import CustomTabBar from '../../components/custom-tab-bar'

export default function Index () {
  return (
      <View className='index'>
        <CustomTabBar  tabKey={4}/>
        更新
      </View>
    )
}
