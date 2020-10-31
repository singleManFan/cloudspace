import React, { useState } from "react";
import Taro, { usePageScroll } from "@tarojs/taro";
import { View } from "@tarojs/components";
import CustomTabBar from "../../components/custom-tab-bar";
import Footer from "../../components/footer";
import BackToTop from "../../components/back-to-top";
import Section from "../../components/section";
import _ from "lodash";

export default function Index(props) {
  const [showBackToTop, setShowBackTop] = useState(false);
  const [oldScrollTop, setOldScrollTop] = useState(0);

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

  return (
    <View>
      <View className="index">
        <CustomTabBar tabKey={props.tabKey} />
        <Section>{props.children}</Section>
        <Footer />
      </View>
      <BackToTop backToTop={backToTop} isShow={showBackToTop} />
    </View>
  );
}
