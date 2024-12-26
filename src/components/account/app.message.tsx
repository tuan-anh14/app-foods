import { View, Text, StyleSheet, ScrollView } from "react-native";

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingTop: 50
    }
});

const AppMessage = () => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <Text style={{ marginBottom: 10 }}>
                    Ứng dụng Food là một nền tảng giúp bạn dễ dàng tìm kiếm và đặt món ăn từ các nhà hàng gần bạn.
                </Text>
                <Text style={{ marginBottom: 10 }}>
                    Với giao diện thân thiện và dễ sử dụng, bạn có thể duyệt qua hàng ngàn món ăn và nhà hàng chỉ với vài cú chạm.
                </Text>
                <Text style={{ marginBottom: 10 }}>
                    Chúng tôi cam kết mang đến cho bạn trải nghiệm đặt món ăn nhanh chóng và tiện lợi nhất.
                </Text>
                <Text style={{ marginBottom: 10 }}>
                    Nếu bạn có bất kỳ câu hỏi nào, hãy liên hệ với chúng tôi qua mục hỗ trợ trong ứng dụng.
                </Text>
            </View>
        </ScrollView>
    );
};

export default AppMessage;