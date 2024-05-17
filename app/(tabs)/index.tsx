import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/constants/size";
import React, { useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function Home(props: any) {
  useEffect(() => {
    const requestOptions = {
      method: "GET",
    };

    fetch("http://localhost:8000/free-shows", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
    return () => {
      null;
    };
  }, []);

  const renderFileItem = () => {
    return (
      <Link href="/details" asChild>
        <TouchableOpacity style={{ marginVertical: verticalScale(10) }}>
          <Image
            source={{ uri: "https://picsum.photos/200/300" }}
            style={{
              width: horizontalScale(350),
              height: verticalScale(200),
              borderRadius: moderateScale(10),
            }}
          />
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
