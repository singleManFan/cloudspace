import React from "react";
import { View } from "@tarojs/components";
import useOpacityDisplay from "../../models/useOpacityDisplay";

import Taro from "@tarojs/taro";

function Section(props) {
  const { isDisplay } = useOpacityDisplay();
  
  return (
    <View
      className={[
        "section",
        "transition-opacity",
        isDisplay ? "render-page" : ""
      ].join(" ")}
    >
      <View className="container">
        {props.children}
      </View>
    </View>
  );
}

export default Section;
