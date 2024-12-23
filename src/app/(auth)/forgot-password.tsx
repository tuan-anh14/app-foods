import ShareButton from "@/components/button/share.button";
import ShareInput from "@/components/input/share.input";
import { APP_COLOR } from "@/utils/constant";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        gap: 10,
    },
    heading: {
        fontSize: 25,
        fontWeight: "600",
        marginVertical: 30,
    },
    inputContainer: {
        marginVertical: 20,
    },
});

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");

    const handleSendResetLink = () => {
        // Placeholder for API call in the future
        console.log("Reset link for email:", email);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Quên mật khẩu</Text>
            <Text style={{ fontSize: 16, marginBottom: 10 }}>
                Nhập địa chỉ email của bạn để nhận liên kết đặt lại mật khẩu.
            </Text>
            <View style={styles.inputContainer}>
                <ShareInput
                    title="Email"
                    keyboardType="email-address"
                    value={email}
                    setValue={setEmail}
                />
            </View>
            <ShareButton
                title="Gửi liên kết đặt lại mật khẩu"
                onPress={handleSendResetLink}
                textStyle={{
                    color: "#fff",
                    paddingVertical: 5,
                    textTransform: "uppercase",
                }}
                buttonStyle={{
                    justifyContent: "center",
                    borderRadius: 30,
                    marginHorizontal: 50,
                    paddingVertical: 10,
                    backgroundColor: APP_COLOR.ORANGE,
                }}
                pressStyle={{ alignSelf: "stretch" }}
            />
        </View>
    );
};

export default ForgotPasswordPage;
