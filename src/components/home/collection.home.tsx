import { Dimensions, FlatList, Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import demo from "@/assets/demo.jpg";
import { APP_COLOR } from "@/utils/constant";
import React, { useEffect, useState } from "react";
import { getTopRestaurantAPI } from "@/utils/api";
import { router } from "expo-router";
import ContentLoader, { Rect } from 'react-content-loader/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign'; // Đảm bảo đã import AntDesign  

const { height: sHeight, width: sWidth } = Dimensions.get('window');

interface IProps {
    name: String;
    description: string;
    refAPI: string;
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    header: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        color: APP_COLOR.ORANGE,
        fontSize: 16,
        fontWeight: "600",
    },
    seeAllText: {
        color: "#5a5a5a",
        fontSize: 14,
        marginRight: 5,
    },
    description: {
        color: '#5a5a5a',
        marginVertical: 5,
        fontSize: 14,
    },
    restaurantCard: {
        backgroundColor: "#efefef",
        borderRadius: 5,
        overflow: 'hidden', // Bo góc cho hình ảnh  
        alignItems: 'center',
    },
    restaurantImage: {
        height: 130,
        width: 130,
    },
    restaurantName: {
        fontWeight: "600",
        maxWidth: 130,
        textAlign: 'center',
    },
    sale: {
        marginTop: 5,
        borderWidth: 1,
        borderColor: APP_COLOR.ORANGE,
        padding: 3,
        borderRadius: 3,
        alignSelf: "flex-start",
        flexDirection: 'row', // Thay đổi hướng của flex để hiển thị biểu tượng bên cạnh  
        alignItems: 'center', // căn giữa biểu tượng và văn bản  
    },
    saleText: {
        color: APP_COLOR.ORANGE,
        marginLeft: 5, // Khoảng cách giữa biểu tượng và văn bản  
    },
});

const CollectionHome = (props: IProps) => {
    const { name, description, refAPI } = props; // Gộp destructuring  
    const [restaurants, setRestaurants] = useState<ITopRestaurant[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await getTopRestaurantAPI(refAPI);
            if (res.data) {
                setRestaurants(res.data);
            }
            setLoading(false);
        }
        fetchData();
    }, [refAPI]);

    const backend = Platform.OS === "android"
        ? process.env.EXPO_PUBLIC_ANDROID_API_URL
        : process.env.EXPO_PUBLIC_IOS_API_URL;

    const baseImage = `${backend}/images/restaurant`;

    return (
        <>
            <View style={{ height: 10, backgroundColor: "#e9e9e9" }} />
            {!loading ? (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{name}</Text>
                        <Pressable onPress={() => router.navigate("/(auth)/restaurants")} style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={styles.seeAllText}>Xem tất cả</Text>
                            <MaterialIcons name="navigate-next" size={20} color="grey" />
                        </Pressable>
                    </View>
                    <Text style={styles.description}>{description}</Text>
                    <FlatList
                        data={restaurants}
                        horizontal
                        contentContainerStyle={{ gap: 5 }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <Pressable onPress={() => router.navigate({ pathname: "/product/[id]", params: { id: item._id } })}>
                                    <View style={styles.restaurantCard}>
                                        <Image style={styles.restaurantImage} source={{ uri: `${baseImage}/${item.image}` }} />
                                        <View style={{ padding: 5 }}>
                                            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.restaurantName}>{item.name}</Text>
                                            <View style={styles.sale}>
                                                <AntDesign name="tagso" size={16} color={APP_COLOR.ORANGE} />
                                                <Text style={styles.saleText}>Flash Sale</Text>
                                            </View>
                                        </View>
                                    </View>
                                </Pressable>
                            );
                        }}
                    />
                </View>
            ) : (
                <ContentLoader
                    speed={2}
                    width={sWidth}
                    height={230}
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                    style={{ width: '100%' }}
                >
                    <Rect x="10" y="10" rx="5" ry="5" width={150} height={200} />
                    <Rect x="170" y="10" rx="5" ry="5" width={150} height={200} />
                    <Rect x="330" y="10" rx="5" ry="5" width={150} height={200} />
                </ContentLoader>
            )}
        </>
    );
}

export default CollectionHome;