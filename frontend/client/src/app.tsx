import React, { useEffect } from 'react'
import Taro from '@tarojs/taro'
import './app.scss'

import useRenderComModel from './models/useRenderCom'

function App(props: any) {
  const RenderComState = useRenderComModel()

  useEffect(() => {
    // 页面挂载显示组件
    RenderComState.setIsRenderCom(true)

   // 运行时判断
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init()
    }
    }, [])

  return (props.children)
}

export default App
