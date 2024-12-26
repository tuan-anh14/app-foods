import { currencyFormatter, getOrderHistoryAPI, getURLBaseBackend } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, Image, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; // Thêm thư viện icon

const OrderPage = () => {
    const [orderHistory, setOrderHistory] = useState<IOrderHistory[]>([]);

    useEffect(() => {
        const fetchOrderHistory = async () => {
            const res = await getOrderHistoryAPI();
            if (res.data) setOrderHistory(res.data);
        };
        fetchOrderHistory();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                {/* Header */}
                <View style={styles.header}>
                    <MaterialIcons name="history" size={24} color={APP_COLOR.ORANGE} />
                    <Text style={styles.headerText}>Lịch sử đơn hàng</Text>
                </View>

                {/* List of Orders */}
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={styles.orderList}
                >
                    {orderHistory.map((item, index) => (
                        <Pressable
                            key={index}
                            style={styles.orderItem}
                        >
                            {/* Hiển thị hình ảnh của nhà hàng */}
                            <Image
                                source={{ uri: `${getURLBaseBackend()}/images/restaurant/${item.restaurant.image}` }}
                                style={styles.restaurantImage}
                            />
                            <View style={styles.orderDetails}>
                                {/* Thông tin nhà hàng và đơn hàng */}
                                <Text style={styles.restaurantName}>{item.restaurant.name}</Text>
                                <Text style={styles.restaurantAddress}>{item.restaurant.address}</Text>
                                <Text style={styles.orderPrice}>Tổng tiền: {currencyFormatter(item.totalPrice)}</Text>
                                <Text style={styles.orderPrice}>Số lượng: {item.totalQuantity}</Text>
                                <Text style={styles.orderStatus}>Trạng thái: ODERED</Text>
                            </View>
                        </Pressable>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        padding: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: APP_COLOR.ORANGE,  // Sử dụng màu APP_COLOR.ORANGE cho tiêu đề
        marginLeft: 10,
    },
    orderList: {
        paddingBottom: 20,
    },
    orderItem: {
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 10,
        padding: 15,
        flexDirection: 'row',
        gap: 10,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,  // For Android shadow
    },
    restaurantImage: {
        height: 100,
        width: 100,
        borderRadius: 10,
    },
    orderDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    restaurantName: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
    restaurantAddress: {
        fontSize: 14,
        color: '#666',
    },
    orderPrice: {
        fontSize: 16,
        color: APP_COLOR.ORANGE,  // Sử dụng màu cam cho giá trị đơn hàng
    },
    orderStatus: {
        fontSize: 14,
        color: '#666',
    },
});

export default OrderPage;
