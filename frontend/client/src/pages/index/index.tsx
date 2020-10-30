import React,{useState,useEffect}from "react";
import Taro from "@tarojs/taro";
import "./index.scss";
import { View, Text, OpenData,Image, Button } from "@tarojs/components";

import Layout from "../../components/layout";
import Card from "../../components/card";

export default function Index() {
  const [avatarUrl,setAvatarurl] = useState('')
  let [followers,setFollowers] = useState(0)

  const getUserInfoHandle = (res) => {
    if(!res.detail.userInfo || avatarUrl) return;
    try {
      Taro.setStorageSync('userInfo',res.detail.userInfo )
    } catch (e) { }

    setFollowers(followers+1)
    setAvatarurl(res.detail.userInfo.avatarUrl)
  }

  useEffect(() => {
    try {
      const userInfo = Taro.getStorageSync('userInfo')
      if (userInfo) {
        // Do something with return value
        setAvatarurl(userInfo.avatarUrl)
      }
    } catch (e) {
      // Do something when catch error
    }
  })

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
    <Layout tabKey={0}>
        <View className="columns">
          <View className="column">
            <Card>
              <View className="level-item">
                <View style={{ textAlign: "center", width: "100%" }}>
                  <View className="avatar glath-wrap">
                    {
                      avatarUrl ? (<><Image style={{width: "100%",height: "100%"}} src={avatarUrl}></Image>
                      <View style={{background: `url(${avatarUrl})`}} className="glith-anims"></View></>) : <OpenData type='userAvatarUrl'/>
                    }
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
                  <View className="title">{followers}</View>
                      </View>
                    </View>
                  </View>
                  <View className="levle">
                    <View
                      className="level-item button is-rounded is-primary glath-wrap"
                      onClick={() => clipboardDataHandle()}
                    >
                      <Text className={avatarUrl ? "":"btn-preorder__text"}>关注我</Text>
                      {avatarUrl ? null :<Text className="btn-preorder--glitch"></Text> }
                      <Button className="getUserInfoBtn" open-type='getUserInfo' onGetUserInfo={(e)=> getUserInfoHandle(e)}>按钮</Button>
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
    </Layout>
  );
}
