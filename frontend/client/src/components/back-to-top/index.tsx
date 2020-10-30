import React from "react";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";

function BackToTop(props: { isShow: boolean; backToTop: () => void }) {
  const goBackHandle = () => {
    props.backToTop();
  };

  return (
    <View
      onClick={() => goBackHandle()}
      className={["back-to-top", props.isShow ? "show-back-to-top" : ""].join(
        " "
      )}
    ></View>
  );
}

export default BackToTop;
