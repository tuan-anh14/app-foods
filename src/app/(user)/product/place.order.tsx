import HeaderHome from "@/components/home/header.home";
import { useCurrentApp } from "@/context/app.context";
import { currencyFormatter, getURLBaseBackend, placeOrderAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import Toast from "react-native-root-toast";

interface IOrderItem {
    image: string;
    title: string;
    option: string;
    price: number;
    quantity: number;
}

const PlaceOrderPage = () => {
    const { restaurant, cart, setCart } = useCurrentApp();
    const [orderItems, setOrderItems] = useState<IOrderItem[]>([]);
    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'paypal'>('cash');

    useEffect(() => {
        if (cart && restaurant && restaurant._id) {
            const result = [];
            for (const [menuItemId, currentItems] of Object.entries(cart[restaurant._id].items)) {
                if (currentItems.extra) {
                    for (const [key, value] of Object.entries(currentItems.extra)) {
                        const option = currentItems.data.options?.find(
                            item => `${item.title}-${item.description}` === key
                        );

                        const addPrice = option?.additionalPrice ?? 0;

                        result.push({
                            image: currentItems.data.image,
                            title: currentItems.data.title,
                            option: key,
                            price: currentItems.data.basePrice + addPrice,
                            quantity: value
                        });
                    }
                } else {
                    result.push({
                        image: currentItems.data.image,
                        title: currentItems.data.title,
                        option: "",
                        price: currentItems.data.basePrice,
                        quantity: currentItems.quantity
                    });
                }
            }
            setOrderItems(result);
        }
    }, [restaurant]);

    const handlePlaceOrder = async () => {
        const data = {
            restaurant: restaurant?._id,
            totalPrice: cart?.[restaurant!._id].sum,
            totalQuantity: cart?.[restaurant!._id].quantity,
            detail: orderItems
        };

        const res = await placeOrderAPI(data)
        if (res.data) {
            //success
            Toast.show("Đặt hàng thành công!", {
                duration: Toast.durations.LONG,
                textColor: 'white',
                backgroundColor: APP_COLOR.ORANGE,
                opacity: 1
            });
            //clear data cart
            if (restaurant) {
                delete cart[restaurant._id];
                setCart((prevCart: any) => ({ ...prevCart, ...cart }))
            }
            router.navigate("/")

        } else {
            //error
            const m = Array.isArray(res.message) ? res.message[0] : res.message;
            Toast.show(m, {
                duration: Toast.durations.LONG,
                textColor: 'white',
                backgroundColor: APP_COLOR.ORANGE,
                opacity: 1
            });
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{
                borderBottomColor: "#eee",
                borderBottomWidth: 1,
                padding: 10
            }}>
                <HeaderHome />
            </View>
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: "600" }}>{restaurant?.name}</Text>
            </View>
            <ScrollView style={{ flex: 1, padding: 10 }}>
                {orderItems?.map((item, index) => {
                    return (
                        <View key={index}
                            style={{
                                gap: 10,
                                flexDirection: "row",
                                borderBottomColor: "#eee",
                                borderBottomWidth: 1,
                                paddingVertical: 10
                            }}>
                            <Image
                                style={{ height: 50, width: 50 }}
                                source={{ uri: `${getURLBaseBackend()}/images/menu-item/${item.image}` }}
                            />
                            <View>
                                <Text style={{ fontWeight: "600" }}>
                                    {item.quantity} x
                                </Text>
                            </View>
                            <View style={{ gap: 10 }}>
                                <Text>{item.title}</Text>
                                <Text style={{ fontSize: 12, color: APP_COLOR.GREY }}>
                                    {item.option}
                                </Text>
                            </View>
                        </View>
                    );
                })}
                {orderItems?.length > 0 && (
                    <View style={{ marginVertical: 15 }}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}>
                            <Text style={{ color: APP_COLOR.GREY }}>
                                Tổng cộng ({restaurant && cart?.[restaurant._id] && cart?.[restaurant._id].quantity} món)
                            </Text>
                            <Text>
                                {currencyFormatter(restaurant && cart?.[restaurant._id] && cart?.[restaurant._id].sum)}
                            </Text>
                        </View>
                    </View>
                )}
            </ScrollView>

            {/* Phần chọn phương thức thanh toán */}
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: "600", marginBottom: 5 }}>Phương thức thanh toán:</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
                    <Pressable onPress={() => setPaymentMethod('cash')} style={{
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        backgroundColor: paymentMethod === 'cash' ? APP_COLOR.ORANGE : 'white',
                        borderRadius: 3,
                        borderColor: APP_COLOR.ORANGE,
                        borderWidth: 1,
                        marginRight: 5,
                    }}>
                        <Text style={{ textAlign: 'center', color: paymentMethod === 'cash' ? 'white' : APP_COLOR.ORANGE }}>
                            Tiền mặt
                        </Text>
                    </Pressable>
                    <Pressable onPress={() => setPaymentMethod('paypal')} style={{
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        backgroundColor: paymentMethod === 'paypal' ? APP_COLOR.ORANGE : 'white',
                        borderRadius: 3,
                        borderColor: APP_COLOR.ORANGE,
                        borderWidth: 1,
                    }}>
                        <Text style={{ textAlign: 'center', color: paymentMethod === 'paypal' ? 'white' : APP_COLOR.ORANGE }}>
                            Ví PayPal
                        </Text>
                    </Pressable>
                </View>
            </View>

            <View style={{
                gap: 20,
                marginBottom: 15,
                padding: 10
            }}>
                <Pressable
                    onPress={handlePlaceOrder}
                    style={({ pressed }) => ({
                        opacity: pressed === true ? 0.5 : 1,
                        padding: 10,
                        backgroundColor: APP_COLOR.ORANGE,
                        borderRadius: 3
                    })}
                >
                    <Text style={{
                        color: "white",
                        textAlign: "center"
                    }}>
                        Đặt đơn - {``}
                        {currencyFormatter(cart && restaurant && cart?.[restaurant._id] && cart?.[restaurant._id].sum)}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

export default PlaceOrderPage;