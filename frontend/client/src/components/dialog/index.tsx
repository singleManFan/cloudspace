import React,{useState} from "react"
import {View} from "@tarojs/components"


function Dialog(props: {clickDialog:() => void}) {
  const [isClicked,setIsClicked] = useState(false)

  const onClickHandle =() => {
    // props.clickDialog()
    setIsClicked(true)
  }

  const transitionEndHandle = () => {
    props.clickDialog()
  }

  return (<View onTransitionEnd={()=> transitionEndHandle()} className={["dialog",(isClicked) ? "opacity-0": ""].join(" ")}>
  <View className="message">
        Cloudpress
        是一款免费的随笔记事工具，支持离线使用，方便随时随地、快速记录，回顾闲散时光的点点滴滴。
  </View>
  <View className="compliance" onClick={() => onClickHandle()}>我知道了!</View>
</View>)
}

export default Dialog
