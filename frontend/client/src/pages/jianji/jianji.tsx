import React, { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import "./index.scss";
import { View, Textarea, Image, Text } from "@tarojs/components";
import Layout from "../../components/layout";
import Card from "../../components/card";
import bianjiSvg from "../../assets/img/bianji-copy.svg";
import shanchuSvg from "../../assets/img/shanchu.svg";
import cancleSvg from "../../assets/img/cancel.svg";
import moment from "moment";
import _ from "lodash";

interface Record {
  content: string;
  publishDate: string;
  updateDate: string;
  id: number;
  editable: boolean;
}

export default function Index() {
  const initRecords: Record[] = [];
  const [records, setRecords] = useState(initRecords);
  const [content, setContent] = useState("");

  useEffect(() => {
    try {
      const records = Taro.getStorageSync("records");
      if (records) {
        setRecords(records);
      }
    } catch (e) {}
  }, []);

  const inputHanlde = e => {
    setContent(e.detail.value);
  };

  const publishHandle = () => {
    if (!content) return;
    const newData = _.cloneDeep(records);
    newData.unshift({
      content,
      publishDate: moment(Date.now()).format("YYYY/MM/DD hh:mm A"),
      updateDate: moment(Date.now()).format("YYYY/MM/DD hh:mm A"),
      id: records.length + 1,
      editable: false
    });
    setContent("");
    setRecords(newData);
    try {
      Taro.setStorageSync("records", newData);
    } catch (e) {}
  };

  const editHandle = obj => {
    const newData = _.cloneDeep(records);
    const match = newData.find(item => item.id === obj.id);
    if (match) {
      match.editable = !match.editable;
    }
    setRecords(newData);
  };

  const saveHandle = obj => {
    const newData = _.cloneDeep(records);
    const match = newData.find(item => item.id === obj.id);
    if (match) {
      if (!match.content) {
        // 内容不存在，删除
        newData.splice(newData.indexOf(match), 1);
      } else {
        match.editable = false;
        match.updateDate = moment(Date.now()).format("YYYY/MM/DD hh:mm A");
      }
    }
    setRecords(newData);
    try {
      Taro.setStorageSync("records", newData);
    } catch (e) {}
  };

  return (
    <Layout tabKey={1}>
      <View className="columns">
        <View className="column jianjika">
          <Card>
            <View className="level">
              <View className="title" style="font-size: 1em;">
                简记卡
              </View>
            </View>
            <View className="level">
              <Textarea
                onInput={e => inputHanlde(e)}
                placeholder="写点什么呢 ..."
                maxlength={999}
                className="jianji-edit"
                value={content}
              />
            </View>
            <View className="tools-bar">
              <View
                onClick={() => publishHandle()}
                className="level-item button is-rounded is-primary btn-preorder__text"
              >
                发表
              </View>
            </View>
          </Card>
        </View>
        {records.map(item => (
          <View className="column" key={item.id}>
            <Card>
              <View className="level">
                <View className="level-item">发表于 {item.publishDate}</View>
                <View className="level-item">更新于 {item.updateDate}</View>
                <View className="level-item">
                  大约（{item.content.length}字）
                </View>
              </View>
              <View className="level">
                <Textarea
                  disabled={!item.editable}
                  autoFocus={item.editable}
                  value={item.content}
                  cursor={item.content.length}
                  maxlength={999}
                  className="jianji-edit"
                  onInput={e => (item.content = e.detail.value)}
                />
              </View>
              <View className="tools-bar">
                {item.editable ? (
                  <View
                    onClick={() => saveHandle(item)}
                    className="tools-bar-item"
                  >
                    <Image className="tools-bar-icon" src={shanchuSvg}></Image>
                    <Text>完成</Text>
                  </View>
                ) : null}
                <View
                  onClick={() => editHandle(item)}
                  className="tools-bar-item"
                >
                  <Image
                    className="tools-bar-icon"
                    src={item.editable ? cancleSvg : bianjiSvg}
                  ></Image>
                  <Text>{item.editable ? "取消" : "编辑"}</Text>
                </View>
              </View>
            </Card>
          </View>
        ))}
      </View>
    </Layout>
  );
}
