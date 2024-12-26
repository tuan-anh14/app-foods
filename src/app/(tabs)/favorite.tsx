import { currencyFormatter, getFavoriteRestaurantAPI, getURLBaseBackend } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";

const FavoritePage = () => {
    const [favoriteRestaurants, setFavoriteRestaurants] = useState<IRestaurant[]>([]);

    useEffect(() => {
        const fetchFavoriteRestaurants = async () => {
            const res = await getFavoriteRestaurantAPI();
            if (res.data) setFavoriteRestaurants(res.data);
        };
        fetchFavoriteRestaurants();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={{
                    borderBottomColor: '#eee',
                    borderBottomWidth: 1,
                    paddingHorizontal: 10,
                    paddingBottom: 5
                }}>
                    <Text style={{ color: APP_COLOR.ORANGE }}>Danh sách yêu thích</Text>
                </View>
                <ScrollView style={{ flex: 1 }}>
                    {favoriteRestaurants.map((item, index) => (
                        <View key={index}>
                            <View style={{ padding: 10, flexDirection: "row", gap: 10 }}>
                                <Image
                                    source={{ uri: `${getURLBaseBackend()}/images/restaurant/${item.image}` }}
                                    style={{ height: 100, width: 100 }}
                                />
                                <View style={{ gap: 10 }}>
                                    <Text>{item.name}</Text>
                                    <Text>{item.address}</Text>
                                </View>
                            </View>
                            <View style={{ height: 10, backgroundColor: "#eee" }}></View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default FavoritePage;