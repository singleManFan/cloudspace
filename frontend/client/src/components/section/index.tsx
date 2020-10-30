import React, { useState } from "react";
import { View, Text, OpenData } from "@tarojs/components";
import useOpacityDisplay from "../../models/useOpacityDisplay";
import Card from "../card";
import Taro from "@tarojs/taro";

function Section() {
  const { isDisplay } = useOpacityDisplay();
  const websiteUrl = "https://github.com/singleManFan";
  const clipboardDataHandle = () => {
    Taro.setClipboardData({
      data: websiteUrl,
      success(res) {
        console.log(res);
      }
    });
  };
  return (
    <View
      className={[
        "section",
        "transition-opacity",
        isDisplay ? "render-page" : ""
      ].join(" ")}
    >
      <View className="container">
        <View className="columns">
          <View className="column order-2">
            <Card>
              <View className="content-meta">
                <Text className="content-meta-item">3天前发表</Text>
                <Text className="content-meta-item">3天前更新</Text>
                <Text className="content-meta-item">
                  1分钟读完（大约123个字）
                </Text>
              </View>
              <View className="h1">Hello World</View>
              <View className="mk-content">
                <View className="p">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Repudiandae culpa natus esse eum corrupti vitae ad explicabo,
                  in labore dolor beatae maxime qui amet aliquid ut velit.
                  Numquam, adipisci blanditiis Lorem ipsum, dolor sit amet
                  consectetur adipisicing elit. Non quasi earum commodi enim,
                  quas in. Excepturi laudantium numquam at nulla vero
                  consequuntur ipsum perferendis, rem minima. Repudiandae
                  aperiam ad dolore! Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Rem fugit dolorum officia magni perferendis,
                  ex doloremque nostrum! Et, dignissimos, itaque eius temporibus
                  placeat officiis eos minus quia porro, neque pariatur. ...
                </View>
              </View>
            </Card>
          </View>
          <View className="column">
            <Card>
              <View className="level-item">
                <View style={{ textAlign: "center", width: "100%" }}>
                  <View className="avatar">
                    <OpenData type="userAvatarUrl" />
                  </View>
                  <View className="username">
                    <OpenData type="userNickName" />
                  </View>
                  <View className="motto">独身男子</View>
                  <View className="location">
                    <OpenData type="userCity" />-{" "}
                    <OpenData type="userProvince" />
                  </View>
                  <View className="level">
                    <View className="levle-item">
                      <View>
                        <View className="heading">简记</View>
                        <View className="title">0</View>
                      </View>
                    </View>
                    <View className="levle-item">
                      <View>
                        <View className="heading">小册</View>
                        <View className="title">0</View>
                      </View>
                    </View>
                    <View className="levle-item">
                      <View>
                        <View className="heading">关注者</View>
                        <View className="title">0</View>
                      </View>
                    </View>
                  </View>
                  <View className="levle">
                    <View
                      className="level-item button is-rounded is-primary"
                      onClick={() => clipboardDataHandle()}
                    >
                      <Text className="btn-preorder__text">关注我</Text>
                      <Text className="btn-preorder--glitch"></Text>
                    </View>
                  </View>
                  <View className="level">
                    <View className="levle-item">
                      <View></View>
                    </View>
                    <View className="levle-item">
                      <View></View>
                    </View>
                    <View className="levle-item">
                      <View></View>
                    </View>
                  </View>
                </View>
              </View>
            </Card>
          </View>
          <View className="column">
            <Card>
              <View className="notification is-danger">
                工程根目录下创建 <Text className="code">.evn</Text>{" "}
                文件填充内容， <Text className="code">ENV_ID</Text> 你的云环境ID{" "}
                <Text className="code">TCB_SECRET_ID</Text> 你的访问密钥{" "}
                <Text className="code">TCB_SECRET_KEY</Text> 你的访问密钥
              </View>
            </Card>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Section;
