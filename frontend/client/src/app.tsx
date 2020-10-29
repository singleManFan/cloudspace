import React, { useEffect } from 'react'
import Taro from '@tarojs/taro'
import './app.scss'

function App(props: any) {


  useEffect(() => {
    // 运行时判断
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init()
    }
    }, [])

  return (props.children)
}

export default App
