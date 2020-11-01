import React from "react";
import { View, Text } from "@tarojs/components";

function Footer(props: {tabKey?: number,closed?:boolean}) {
  return (
    <View className="footer">
      <View className={["contanier",props.tabKey === 0 && props.closed ? "dialog-padding-bottom": ""].join(" ")}>
        © 2020 YangFan Powered by <Text className="anchor">Taro3</Text>{" "}
        &nbsp;&amp;&nbsp; <Text className="anchor">CloudBase</Text>
      </View>
    </View>
  );
}

export default Footer;
