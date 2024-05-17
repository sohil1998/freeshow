import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/constants/size";
import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function Details(props: any) {
  const renderFileItem = () => {
    return (
      <Link href="/video" asChild>
        <TouchableOpacity>
          <Text
            style={{
              color: "white",
              marginVertical: verticalScale(10),
              fontSize: moderateScale(30),
            }}
          >
            Episode 1
          </Text>
        </TouchableOpacity>
      </Link>
    );
  };
  return (
    <SafeAreaView>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8]}
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
