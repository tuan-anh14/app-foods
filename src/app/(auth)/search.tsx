import { getRestaurantByNameAPI, getURLBaseBackend } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import debounce from "debounce";
import { useState } from "react";
import {
    FlatList,
    Image,
    Pressable,
    SafeAreaView,
    Text,
    TextInput,
    View
} from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from "expo-router";

const data = [
    { key: 1, name: "Hot Deal", source: require("@/assets/icons/flash-deals.png") },
    { key: 2, name: "Quán Ngon", source: require("@/assets/icons/nice-shop.png") },
    { key: 3, name: "Tích Điểm", source: require("@/assets/icons/points.png") },
    { key: 4, name: "Ngọt Xỉu", source: require("@/assets/icons/rice.png") },
    { key: 5, name: "Quán Tiền Bối", source: require("@/assets/icons/noodles.png") },
    { key: 6, name: "Bún, Mì, Phở", source: require("@/assets/icons/bun-pho.png") },
    { key: 7, name: "BBQ", source: require("@/assets/icons/bbq.png") },
    { key: 8, name: "Fast Food", source: require("@/assets/icons/fastfood.png") },
];

const SearchPage = () => {
    const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = debounce(async (text: string) => {
        setSearchTerm(text);
        setError(null);

        if (!text.trim()) {
            setRestaurants([]);
            return;
        }

        setIsLoading(true);
        try {
            const res = await getRestaurantByNameAPI(text);
            if (res.data?.results) {
                setRestaurants(res.data.results);
            } else {
                console.log("No results found.");
                setRestaurants([]);
            }
        } catch (error) {
            console.error("API Error:", error);
            setError('Đã xảy ra lỗi khi tìm kiếm.');
            setRestaurants([]);
        } finally {
            setIsLoading(false);
        }
    }, 300);

    const DefaultResult = () => {
        return (
            <View style={{ backgroundColor: "white", padding: 10, gap: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Phổ biến</Text>
                <FlatList
                    data={data}
                    numColumns={2}
                    renderItem={({ item, index }) => (
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: 10,
                                flex: 1,
                                borderColor: "#eee",
                                borderTopWidth: (index === 0 || index === 1) ? 1 : 0,
                                borderBottomWidth: 1,
                                borderLeftWidth: 1,
                                borderRightWidth: index % 2 === 1 ? 1 : 0,
                            }}
                        >
                            <Text>{item.name}</Text>
                            <Image source={item.source} style={{ height: 50, width: 50 }} />
                        </View>
                    )}
                    keyExtractor={(item) => item.key.toString()}
                />
            </View>
        );

    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", gap: 5, alignItems: "center", padding: 10 }}>
                <MaterialIcons
                    onPress={() => router.back()}
                    name="arrow-back"
                    size={24}
                    color={APP_COLOR.ORANGE}
                />
                <TextInput
                    placeholder="Tìm kiếm cửa hàng..."
                    onChangeText={(text: string) => handleSearch(text)}
                    autoFocus
                    style={{
                        flex: 1,
                        backgroundColor: "#eee",
                        paddingVertical: 3,
                        paddingHorizontal: 10,
                        borderRadius: 3,
                    }}
                />
            </View>
            <View style={{ backgroundColor: "#eee", flex: 1 }}>
                {isLoading ? (
                    <Text style={{ textAlign: "center", marginTop: 20 }}>Đang tìm kiếm...</Text>
                ) : error ? (
                    <Text style={{ textAlign: "center", marginTop: 20, color: "red" }}>{error}</Text>
                ) : searchTerm.length === 0 ? (
                    <DefaultResult />
                ) : restaurants.length > 0 ? (
                    <View style={{ backgroundColor: "white", gap: 10 }}>
                        {restaurants.map((item, index) => (
                            <Pressable
                                key={index}
                                onPress={() =>
                                    router.push({
                                        pathname: "/product/[id]",
                                        params: { id: item._id },
                                    })
                                }
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        padding: 10,
                                        gap: 10,
                                        borderBottomColor: "#eee",
                                        borderBottomWidth: 1,
                                    }}
                                >
                                    <Image
                                        source={{ uri: `${getURLBaseBackend()}/images/restaurant/${item.image}` }}
                                        style={{ height: 50, width: 50 }}
                                    />
                                    <Text>{item.name}</Text>
                                </View>
                            </Pressable>
                        ))}
                    </View>
                ) : (
                    <Text style={{ textAlign: "center", marginTop: 20 }}>Không tìm thấy kết quả.</Text>
                )}
            </View>
        </SafeAreaView>
    );
};

export default SearchPage;
