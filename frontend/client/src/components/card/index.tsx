import React from "react";
import { View } from "@tarojs/components";

function Card(props) {
  return (
    <View className="card">
      <View className="card-content">{props.children}</View>
    </View>
  );
}

export default Card;
