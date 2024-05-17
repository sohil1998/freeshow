import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/constants/size";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function Home(props: any) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    getData();
    return () => {
      null;
    };
  }, []);

  const getData = () => {
    setIsLoading(true);
    const requestOptions = {
      method: "GET",
    };

    fetch("https://freeshow.onrender.com/free-shows", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        console.log(result);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  const renderFileItem = ({ item }) => {
    return (
      <Link
        //  href="/details" asChild
        href={{
          pathname: "/details",
          params: { episodes: item.episodes },
        }}
        asChild
      >
        <TouchableOpacity style={{ marginVertical: verticalScale(10) }}>
          <Image
            source={{ uri: item.cover_photo }}
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
    <SafeAreaView style={{ backgroundColor: "#282828", flex: 1 }}>
      <StatusBar animated={true} barStyle="light-content" />
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              setIsLoading(true);
              getData();
            }}
            enabled
          />
        }
        data={data}
        renderItem={renderFileItem}
        keyExtractor={(item) => `${item._id}`}
        contentContainerStyle={{
          alignSelf: "center",
          paddingBottom: verticalScale(150),
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
