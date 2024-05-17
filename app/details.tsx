import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/constants/size";
import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useLocalSearchParams } from "expo-router";

export default function Details(props: any) {
  const params = useLocalSearchParams();
  console.log(params.episodes?.toString()?.split(","));
  const data = params.episodes?.toString()?.split(",");
  const renderFileItem = ({ item, index }) => {
    return (
      <Link
        href={{
          pathname: "/video",
          params: { url: item },
        }}
        asChild
      >
        <TouchableOpacity>
          <Text
            style={{
              color: "white",
              marginVertical: verticalScale(10),
              fontSize: moderateScale(30),
            }}
          >
            Episode {index + 1}
          </Text>
        </TouchableOpacity>
      </Link>
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: "#282828", flex: 1 }}>
      <StatusBar animated={true} barStyle="light-content" />
      <FlatList
        data={data}
        renderItem={renderFileItem}
        keyExtractor={(item) => `${item}`}
        contentContainerStyle={{
          alignSelf: "center",
          paddingBottom: verticalScale(150),
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
