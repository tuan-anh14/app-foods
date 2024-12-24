import React from "react";
import HeaderHome from "@/components/home/header.home";
import SearchHome from "@/components/home/search.home";
import TopListHome from "@/components/home/top.list.home";
import { Button, SafeAreaView, StyleSheet, View } from "react-native";
import CustomFlatList from "@/components/CustomFlatList/CustomFlatList"
import CollectionHome from "@/components/home/collection.home";
import { useCurrentApp } from "@/context/app.context";

const data = [
    { key: 1, name: "Top Quán Rating 5* tuần này", ref: "" },
    { key: 2, name: "Quán Mới Lên Sàn", ref: "" },
    { key: 3, name: "Ăn Thỏa Thích, Freeship 0Đ", ref: "" },
]

const HomeTab = () => {
    return (
        // <SafeAreaView style={styles.container}>
        <>
            <CustomFlatList
                data={data}
                style={styles.list}
                renderItem={({ item }) => <CollectionHome name={item.name} />}
                HeaderComponent={<HeaderHome />}
                StickyElementComponent={<SearchHome />}
                TopListElementComponent={<TopListHome />}
            />
        </>
        // </SafeAreaView>
    );
};

export default HomeTab;


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ecf0f1",
        flex: 1,
        justifyContent: "center",
        overflow: "hidden"
    },
    header: {
        borderColor: "red",
        borderWidth: 5,
        height: 100,
        marginBottom: 6,
        width: "100%"
    },
    item: {
        borderColor: "green",
        borderWidth: 1,
        height: 250,
        marginBottom: 10,
        width: "100%"
    },
    list: {
        overflow: "hidden"
    },
    sticky: {
        backgroundColor: "#2555FF50",
        borderColor: "blue",
        borderWidth: 5,
        height: 100,
        marginBottom: 6,
        width: "100%"
    }
})