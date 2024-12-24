import { FlatList, Image, StyleSheet, Text, View } from "react-native"
import demo from "@/assets/demo.jpg"
import { APP_COLOR } from "@/utils/constant";
import React from "react";

interface IProps {
    name: String
    description: string
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    sale: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: APP_COLOR.ORANGE,
        padding: 3,
        borderRadius: 3,
        alignSelf: "flex-start"
    }
});

const CollectionHome = (props: IProps) => {
    const { name } = props
    const { description } = props
    const data = [
        { key: 1, image: demo, name: "cua hang 1" },
        { key: 2, image: demo, name: "cua hang 2" },
        { key: 3, image: demo, name: "cua hang 3" },
        { key: 4, image: demo, name: "cua hang 4" },
        { key: 5, image: demo, name: "cua hang 5" },
    ]
    return (
        <>
            <View style={{ height: 10, backgroundColor: "#e9e9e9" }}></View>
            <View style={styles.container}>
                <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                    <Text style={{
                        color: APP_COLOR.ORANGE,
                        fontSize: 16,
                        fontWeight: "600"
                    }}
                    >{name}
                    </Text>
                    <Text style={{ color: "#5a5a5a" }}>Xem tất cả</Text>
                </View>
                <View style={{ marginVertical: 5 }}>
                    <Text style={{ color: '#5a5a5a' }}>{description}</Text>
                </View>
                <FlatList
                    data={data}
                    horizontal
                    contentContainerStyle={{ gap: 5 }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ backgroundColor: "#efefef" }}>
                                <Image
                                    style={{ height: 130, width: 130 }}
                                    source={demo}
                                />
                                <View style={{ padding: 5 }}>
                                    <Text style={{ fontWeight: "600" }}>{item.name}</Text>
                                    <View>
                                        <View style={styles.sale}>
                                            <Text style={{ color: APP_COLOR.ORANGE }}>Flash Sale</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        );
                    }}
                />
            </View>
        </>
    )
}

export default CollectionHome