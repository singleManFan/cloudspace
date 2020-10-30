import React from "react";
import { View, Text } from "@tarojs/components";

function Footer() {
  return (
    <View className="footer">
      <View className="contanier">
        © 2020 YangFan Powered by <Text className="anchor">Taro3</Text>{" "}
        &nbsp;&amp;&nbsp; <Text className="anchor">CloudBase</Text>
      </View>
    </View>
  );
}

export default Footer;
