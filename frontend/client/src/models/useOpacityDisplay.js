import { useState, useEffect } from "react";
import Taro from '@tarojs/taro'
import { createModel } from "hox"

function useOpacityDisplay() {
  const [isDisplay, setIsDisplay] = useState(false);
  useEffect(() => {
    Taro.nextTick(() => setIsDisplay(true))
  }, [])
  return {
    isDisplay,
    setIsDisplay
  };
}

export default useOpacityDisplay
