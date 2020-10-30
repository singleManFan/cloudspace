import React, { useState } from "react";
import Taro from "@tarojs/taro";
import { View, ScrollView } from "@tarojs/components";
import CustomTabBar from "../../components/custom-tab-bar";
import Footer from "../../components/footer";
import BackToTop from "../../components/back-to-top";
import Section from "../../components/section";
import _ from "lodash";

export default function Index(props) {
  const [showBackToTop, setShowBackTop] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [oldScrollTop, setOldScrollTop] = useState(0);

  const debounceScorllHandle = _.debounce(scrollTop => {
    setOldScrollTop(scrollTop);
  }, 300);

  const onScrollHandle = e => {
    if (e.detail.scrollTop < 50 && showBackToTop) {
      setShowBackTop(false);
    }
    if (oldScrollTop > e.detail.scrollTop && e.detail.scrollTop !== 0) {
      // 上滚
      setShowBackTop(true);
    }
    debounceScorllHandle(e.detail.scrollTop);
  };

  const backToTop = () => {
    setScrollTop(oldScrollTop);
    Taro.nextTick(() => {
      setScrollTop(0);
    });
  };

  return (
    <View>
      <ScrollView
        onScroll={e => onScrollHandle(e)}
        className="scroll-view"
        scrollTop={scrollTop}
        scrollY
      >
        <View className="index">
          <CustomTabBar tabKey={props.tabKey} />
          <Section>
          {props.children}
          </Section>
        <Footer />
        </View>
      </ScrollView>
      <BackToTop backToTop={backToTop} isShow={showBackToTop} />
    </View>
  );
}
