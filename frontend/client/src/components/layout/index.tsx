import React, { useState,useEffect } from "react";
import Taro, { usePageScroll } from "@tarojs/taro";
import { View } from "@tarojs/components";
import CustomTabBar from "../../components/custom-tab-bar";
import Footer from "../../components/footer";
import BackToTop from "../../components/back-to-top";
import Section from "../../components/section";
import Dialog from "../../components/dialog"
import _ from "lodash";

export default function Index(props) {
  const [showBackToTop, setShowBackTop] = useState(false);
  const [oldScrollTop, setOldScrollTop] = useState(0);
  const [isDialog,setIsDialog] = useState(true)

  useEffect(() => {
    if(props.tabKey === 0) {
      try {
       const dialog =  Taro.getStorageSync('dialog')
       if(dialog === false) {
        setIsDialog(false)
       }
      } catch (e) {}
    }
  },[props.tabKey])

  const debounceScorllHandle = _.debounce(scrollTop => {
    setOldScrollTop(scrollTop);
  }, 300);

  const onPageScroll = res => {
    if (res.scrollTop < 50 && showBackToTop) {
      setShowBackTop(false);
    }
    if (oldScrollTop > res.scrollTop && res.scrollTop !== 0) {
      // 上滚
      setShowBackTop(true);
    }
    debounceScorllHandle(res.scrollTop);
  };

  usePageScroll(onPageScroll);

  const backToTop = () => {
    Taro.pageScrollTo({
      scrollTop: 0
    });
  };

  const toggleDialog = () => {
    setIsDialog(false)
    try {
      Taro.setStorageSync('dialog',false)
    } catch (e) {}
  }

  return (
    <View>
      <View className="index">
        <CustomTabBar tabKey={props.tabKey} />
        <Section>{props.children}</Section>
        <Footer tabKey={props.tabKey} closed={isDialog}/>
      </View>
      <BackToTop backToTop={backToTop} isShow={showBackToTop} />
      {(props.tabKey === 0 && isDialog) ? <Dialog clickDialog={toggleDialog}/> : null}
    </View>
  );
}
