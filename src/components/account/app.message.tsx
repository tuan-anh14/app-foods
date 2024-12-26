import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff', // Màu nền hiển thị tốt  
        borderColor: '#e0e0e0', // Đường viền màu sáng  
        borderWidth: 1, // Đường viền xung quanh  
        borderRadius: 10, // Bo tròn góc  
        shadowColor: '#000', // Màu bóng  
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2, // Độ mờ của bóng  
        shadowRadius: 4, // Độ phân tán của bóng  
        elevation: 2, // Độ nổi trên Android  
    },
    appDescription: {
        fontSize: 16, // Kích thước chữ  
        lineHeight: 24, // Khoảng cách giữa các dòng  
        marginBottom: 10, // Khoảng cách dưới các dòng  
        color: '#333', // Màu chữ  
        fontFamily: 'Arial', // Có thể thay đổi font tùy chọn  
    },
    facebookButton: {
        flexDirection: 'row', // Đặt các thành phần theo chiều ngang  
        alignItems: 'center', // Căn giữa vô dọc  
        marginTop: 20, // Khoảng cách trên nút  
        padding: 10,  // Padding cho nút  
        backgroundColor: '#4267B2', // Màu nền của nút  
        borderRadius: 5, // Bo tròn góc cho nút  
    },
    facebookText: {
        color: '#ffffff', // Màu chữ  
        marginLeft: 10, // Khoảng cách giữa biểu tượng và chữ  
        fontSize: 16, // Kích thước chữ  
    },
});

const AppMessage = () => {
    // Địa chỉ Facebook của bạn  
    const facebookUrl = 'https://www.facebook.com/profile.php?id=100024507353855'; // Thay đổi đường dẫn URL thành trang Facebook của bạn  

    // Hàm mở liên kết đến Facebook  
    const openFacebook = () => {
        Linking.openURL(facebookUrl).catch(err => console.error("Failed to open URL:", err));
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <Text style={styles.appDescription}>
                    Ứng dụng Tuan Anh Food là một nền tảng giúp bạn dễ dàng tìm kiếm và đặt món ăn từ các nhà hàng gần bạn.
                </Text>
                <Text style={styles.appDescription}>
                    Với giao diện thân thiện và dễ sử dụng, bạn có thể duyệt qua hàng ngàn món ăn và nhà hàng chỉ với vài cú chạm.
                </Text>
                <Text style={styles.appDescription}>
                    Chúng tôi cam kết mang đến cho bạn trải nghiệm đặt món ăn nhanh chóng và tiện lợi nhất.
                </Text>
                <Text style={styles.appDescription}>
                    Nếu bạn có bất kỳ câu hỏi nào, hãy liên hệ với chúng tôi qua Facebook để có thể hỗ trợ trong ứng dụng.
                </Text>

                {/* Nút liên kết đến Facebook */}
                <Pressable style={styles.facebookButton} onPress={openFacebook}>
                    <FontAwesome name="facebook" size={24} color="#ffffff" />
                    <Text style={styles.facebookText}>Liên hệ với chúng tôi trên Facebook</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

export default AppMessage;