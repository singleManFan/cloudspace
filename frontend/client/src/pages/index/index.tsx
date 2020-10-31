import React, { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import "./index.scss";
import {
  View,
  Text,
  OpenData,
  Image,
  Button,
  Input,
  Label,
  Form
} from "@tarojs/components";

import Layout from "../../components/layout";
import Card from "../../components/card";
import bianjiSvg from "../../assets/img/bianji.svg";
import doneSvg from "../../assets/img/done.svg";

export default function Index() {
  const mottoPlaceHodler = "请填写你的个性签名";
  const [avatarUrl, setAvatarurl] = useState("");
  let [followers, setFollowers] = useState(0);
  let [motto, setMotto] = useState(mottoPlaceHodler);
  let [editMotto, setEditMotto] = useState(false);
  let [homePage, setHomePage] = useState("");
  let [douyin, setDouyin] = useState("");

  const clickCacheHandle = () => {
    Taro.showModal({
      title: "这是一个危险操作！！！",
      content: "缓存清除后数据将彻底丢失，你确定这样做吗？",
      confirmText: "确认清除",
      cancelText: "再考虑下",
      success: function(res) {
        if (res.confirm) {
          try {
            Taro.clearStorageSync();
          } catch (e) {
            // Do something when catch error
          }
        } else if (res.cancel) {
          console.log("用户点击取消");
        }
      }
    });
  };

  const getUserInfoHandle = res => {
    if (!res.detail.userInfo) return;
    try {
      Taro.setStorageSync("userInfo", res.detail.userInfo);
    } catch (e) {}

    setAvatarurl(res.detail.userInfo.avatarUrl);
  };

  const clipboardDataHandle = () => {
    Taro.setClipboardData({
      data: homePage,
      success() {
        setFollowers(1);
      }
    });
  };

  const inputMottoHandle = e => {
    setMotto(e.detail.value);
  };

  const formSubmit = e => {
    if (e.detail.value.homePage) {
      setHomePage(e.detail.value.homePage);
      try {
        Taro.setStorageSync("homePage", e.detail.value.homePage);
      } catch (e) {}
    }

    if (e.detail.value.douyin) {
      setDouyin(e.detail.value.douyin);
      try {
        Taro.setStorageSync("douyin", e.detail.value.douyin);
      } catch (e) {}
    }

    Taro.showToast({
      title: "创建成功",
      icon: "success",
      duration: 2000
    });
  };

  // effect
  useEffect(() => {
    try {
      const userInfo = Taro.getStorageSync("userInfo");
      const motto = Taro.getStorageSync("motto");
      const homePage = Taro.getStorageSync("homePage");
      const douyin = Taro.getStorageSync("douyin");

      if (userInfo) {
        // Do something with return value
        setAvatarurl(userInfo.avatarUrl);
      }

      if (motto) {
        setMotto(motto);
      }

      if (homePage) {
        setHomePage(homePage);
      }

      if (douyin) {
        setDouyin(douyin);
      }
    } catch (e) {
      // Do something when catch error
    }
  }, []);

  useEffect(() => {
    if (!editMotto && motto !== mottoPlaceHodler) {
      try {
        Taro.setStorageSync("motto", motto);
      } catch (e) {}
    }
  }, [editMotto]);

  return (
    <Layout tabKey={0}>
      <View className="columns">
        <View className="column">
          <Card>
            <View className="setting title">通告卡</View>
            <View>
              Cloudpress
              是一款免费的随笔记事工具，支持离线使用，方便随时随地、快速记录，回顾闲散时光的点点滴滴🥰。
            </View>
          </Card>
        </View>
        <View className="column">
          <Card>
            <View className="setting title">个人资料卡</View>
            <View style={{ marginBottom: "0.5rem" }}>
              将在下方为你的个人主页创建关注按钮
            </View>
            <View className="notification is-danger">
              <Form onSubmit={e => formSubmit(e)}>
                <View className="filed-area">
                  <Label className="label">个人主页:</Label>
                  <Input
                    maxlength={60}
                    className="filed-input"
                    placeholder="个人主页地址"
                    name="homePage"
                    cursor={0}
                  />
                </View>
                <View className="filed-area">
                  <Label className="label">抖音号:</Label>
                  <Input
                    maxlength={60}
                    className="filed-input"
                    placeholder="抖音号"
                    name="douyin"
                    cursor={0}
                  />
                </View>
                <View className="btn-area">
                  <View className="level-item button is-rounded is-primary btn-preorder__text">
                    <Text className={avatarUrl ? "" : "btn-preorder__gjzlk"}>
                      创建资料库
                    </Text>
                    {avatarUrl ? null : (
                      <Text className="btn-preorder--glitch"></Text>
                    )}
                    <Button
                      formType="submit"
                      className="getUserInfoBtn"
                      open-type="getUserInfo"
                      onGetUserInfo={e => getUserInfoHandle(e)}
                    >
                      获取用户信息
                    </Button>
                  </View>
                </View>
              </Form>
            </View>
          </Card>
        </View>
        <View className="column">
          <Card>
            <View className="level-item">
              <View style={{ textAlign: "center", width: "100%" }}>
                <View className="avatar btn-preorder__text">
                  {avatarUrl ? (
                    <>
                      <Image
                        style={{ width: "100%", height: "100%" }}
                        src={avatarUrl}
                      ></Image>
                      <View
                        style={{ background: `url(${avatarUrl})` }}
                        className="glith-anims"
                      ></View>
                    </>
                  ) : (
                    <OpenData type="userAvatarUrl" />
                  )}
                </View>
                <View className="username">
                  <OpenData type="userNickName" />
                </View>
                {douyin ? (
                  <View className="motto">抖音号 - {douyin}</View>
                ) : null}
                <View className="motto">
                  {editMotto ? (
                    <View
                      className="edit-msg"
                      onClick={() => setEditMotto(false)}
                    >
                      <Input
                        name="motto"
                        value={motto}
                        maxlength={60}
                        className="motto-input"
                        type="text"
                        placeholder="个性签名"
                        focus
                        cursor={motto.length}
                        onInput={e => {
                          inputMottoHandle(e);
                        }}
                      />
                      <Image className="done-motto" src={doneSvg}></Image>
                    </View>
                  ) : (
                    <View
                      onClick={() => setEditMotto(true)}
                      className="show-msg"
                    >
                      <Text>{motto}</Text>
                      <Image className="edit-motto" src={bianjiSvg}></Image>
                    </View>
                  )}
                </View>
                <View className="location">
                  <OpenData type="userCity" />- <OpenData type="userProvince" />
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
                {homePage ? (
                  <View className="levle">
                    <View
                      className="level-item button is-rounded is-primary btn-preorder__text"
                      onClick={() => clipboardDataHandle()}
                    >
                      <Text>关注我</Text>
                    </View>
                  </View>
                ) : null}
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
            <View className="setting title">工具卡</View>
            <View className="tools">
              <View
                onClick={() => clickCacheHandle()}
                className="level-item button is-rounded is-primary btn-preorder__text is-danger"
              >
                清除工具缓存
              </View>
            </View>
          </Card>
        </View>
      </View>
    </Layout>
  );
}
