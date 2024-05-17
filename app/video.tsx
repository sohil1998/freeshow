import { View } from "react-native";
import React, { useRef, useState } from "react";
import { WebView } from "react-native-webview";

export default function Video() {
  return (
    <View
      style={{
        justifyContent: "center",
        flex: 1,
      }}
    >
      <WebView
        style={{}}
        injectedJavaScript={`
        document.querySelector('.header-wrapper').style.display = 'none'
        document.querySelector('.header-main').style.display = 'none'
        document.querySelector('a[target="_blank"]').style.display = 'none'
        document.querySelector('.page-top').style.display = 'none'
        document.querySelector('.footer-bottom').style.display = 'none'

        `}
        source={{ uri: "https://tellygossips.net/media.php?id=2494000" }}
        nestedScrollEnabled={false}
        allowsFullscreenVideo={true}
        javaScriptEnabled={true}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        setSupportMultipleWindows={false}
        onShouldStartLoadWithRequest={(request) => {
          // Only allow navigating within this website
          return request.url.startsWith(
            "https://tellygossips.net/media.php?id=2494000"
          );
        }}
      />
    </View>
  );
}
