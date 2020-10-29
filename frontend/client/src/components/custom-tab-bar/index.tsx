import React, { useState} from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'

import useRenderComModel from '../../models/useRenderCom'

// images
import logoPng from '../../assets/img/duckling.png'
import homeSvg from '../../assets/img/home.svg'
import coffeeSvg from '../../assets/img/coffee.svg'
import xiaoceSvg from '../../assets/img/xiaoce.svg'
import liuyanSvg from '../../assets/img/liuyan.svg'
import updateSvg from '../../assets/img/time.svg'

// image active
import homeSvgAc from '../../assets/img/active/home.svg'
import coffeeSvgAc from '../../assets/img/active/coffee.svg'
import xiaoceSvgAc from '../../assets/img/active/xiaoce.svg'
import liuyanSvgAc from '../../assets/img/active/liuyan.svg'
import updateSvgAc from '../../assets/img/active/time.svg'

const tabBar = [
    {
      text: "首页",
      id: 0,
      icon: homeSvg,
    activeIcon: homeSvgAc,
      path: "/pages/index/index"
    },
    {
      text: "简记",
      id: 1,
      icon: coffeeSvg,
      activeIcon: coffeeSvgAc,
      path: "/pages/jianji/jianji"
    },
    {
      text: "小册",
      id: 2,
      icon: xiaoceSvg,
      activeIcon: xiaoceSvgAc,
      path: "/pages/xiaoce/xiaoce"
    },
    {
      text: "留言",
      id: 3,
      icon: liuyanSvg,
      activeIcon: liuyanSvgAc,
      path: "/pages/liuyan/liuyan"
    },
    {
      text: "更新",
      id: 4,
      icon: updateSvg,
      activeIcon: updateSvgAc,
      path: "/pages/gengxin/gengxin"
    },
  ]

interface Props {
  tabKey: number
}

export default function TabBar(props: Props) {
  const { isRenderCom} = useRenderComModel()
  const { tabKey } = props

  const switchTabBar = (url) => {
    Taro.switchTab({
      url,
    })
  }

    return (
      <View className='tab-bar'>
        <View className='tab-bar-brand justify-content-center'>
          <Image
            className="logo"
            src={logoPng}
          />
        </View>
        <View className="tab-bar-menu justify-content-center">
          {
            tabBar.map((item) => (<View onClick={() => switchTabBar(item.path)} className={["tab-bar-menu-item",item.id === tabKey ? "is-active": ""].join(" ")}>
              <Image className="tab-bar-icon" src={ item.id === tabKey  ? item.activeIcon : item.icon}></Image>
              <Text>{item.text}</Text>
            </View>))
          }
        </View>
      </View>
    )
}
