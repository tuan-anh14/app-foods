import { Text, View, FlatList, StyleSheet, Image } from "react-native";
import BannerHome from "./banner.home";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topList: {
        borderWidth: 5,
        minHeight: 100,
        marginBottom: 10,
        width: "100%",
        paddingTop: 10,
    },
    item: {
        padding: 10,
        margin: 5,
        backgroundColor: 'lightblue',
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

const data1 = [
    { key: 1, name: "Hot Deal", source: require("@/assets/icons/flash-deals.png") },
    { key: 2, name: "Quán Ngon", source: require("@/assets/icons/nice-shop.png") },
    { key: 3, name: "Tích Điểm", source: require("@/assets/icons/points.png") },
    { key: 4, name: "Ngọt Xỉu", source: require("@/assets/icons/rice.png") },
    { key: 5, name: "Quán Tiền Bối", source: require("@/assets/icons/noodles.png") },
    { key: 6, name: "Bún, Mì, Phở", source: require("@/assets/icons/bun-pho.png") },
    { key: 7, name: "BBQ", source: require("@/assets/icons/bbq.png") },
    { key: 8, name: "Fast Food", source: require("@/assets/icons/fastfood.png") },
    { key: 9, name: "Pizza", source: require("@/assets/icons/Pizza.png") },
    { key: 10, name: "Burger", source: require("@/assets/icons/burger.png") },
    { key: 11, name: "Sống Khỏe", source: require("@/assets/icons/egg-cucmber.png") },
    { key: 12, name: "Giảm 50k", source: require("@/assets/icons/moi-moi.png") },
    { key: 13, name: "99k Off", source: require("@/assets/icons/fried-chicken.png") },
    { key: 14, name: "No Bụng", source: require("@/assets/icons/korean-food.png") },
    { key: 15, name: "Freeship", source: require("@/assets/icons/Steak.png") },
    { key: 16, name: "Deal 0Đ", source: require("@/assets/icons/tomato.png") },
    { key: 17, name: "Món 1Đ", source: require("@/assets/icons/elipse.png") },
    { key: 18, name: "Ăn chiều", source: require("@/assets/icons/chowmein.png") },
    { key: 19, name: "Combo 199k", source: require("@/assets/icons/Notif.png") },
    { key: 20, name: "Milk Tea", source: require("@/assets/icons/salad.png") },
]


const TopListHome = () => {
    return (
        <View style={styles.container}>
            <BannerHome />
            <View>
                <FlatList
                    style={{ marginVertical: 15 }}
                    data={data1}
                    horizontal
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={true}
                    scrollEnabled={true}
                    renderItem={({ item, index }) => (
                        <View style={{
                            padding: 5,
                            width: 100,
                            alignItems: 'center'
                        }}>
                            <Image
                                source={item.source}
                                style={{
                                    height: 35, width: 35
                                }}
                            />
                            <Text style={{ textAlign: "center" }}>
                                {item.name}
                            </Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                />
            </View>
        </View>
    );
}

export default TopListHome;