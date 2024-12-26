

import { useCurrentApp } from "@/context/app.context";
import { getURLBaseBackend } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";




const AccountPage = () => {
    const { appState } = useCurrentApp();
    const baseImage = `${getURLBaseBackend()}/images/avatar`;
    const insets = useSafeAreaInsets();

    const handleLogOut = async () => {
        Alert.alert(
            'Đăng xuất',
            'Bạn chắc chắn đăng xuất người dùng?',
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'Xác nhận',
                    onPress: async () => {
                        await AsyncStorage.removeItem('accesstoken');
                        router.replace('/(auth)/welcome');
                    },
                },
            ]
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{
                paddingTop: insets.top,
                paddingHorizontal: 20,
                paddingBottom: 20,
                backgroundColor: APP_COLOR.ORANGE,
                flexDirection: "row",
                gap: 20,
                alignItems: "center"
            }}>
                <Image
                    style={{ height: 60, width: 60 }}
                    source={{ uri: `${baseImage}/${appState?.user.photo}` }}
                />
                <View>
                    <Text style={{ color: "white", fontSize: 20 }}>{appState?.user.name}</Text>
                </View>
            </View>
            <Pressable
                onPress={() => { router.navigate("/(user)/account/info") }}
                style={{
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    borderBottomColor: '#eee',
                    borderBottomWidth: 1,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                <View style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center'
                }}>
                    <Feather name="user-check" size={20} color="green" />
                    <Text>Cập nhật thông tin</Text>
                </View>
                <MaterialIcons name="navigate-next" size={24} color="grey" />
            </Pressable>
            <Pressable
                onPress={() => { router.navigate("/(user)/account/change.password") }}
                style={{
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    borderBottomColor: '#eee',
                    borderBottomWidth: 1,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                <View style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center'
                }}>
                    <MaterialIcons name="password" size={24} color="green" />
                    <Text>Thay đổi mật khẩu</Text>
                </View>
                <MaterialIcons name="navigate-next" size={24} color="grey" />
            </Pressable>
            <Pressable
                onPress={() => { router.navigate("/(user)/account/change.language") }}
                style={{
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    borderBottomColor: '#eee',
                    borderBottomWidth: 1,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                <View style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center'
                }}>
                    <Feather name="globe" size={24} color="green" />
                    <Text>Ngôn ngữ</Text>
                </View>
                <MaterialIcons name="navigate-next" size={24} color="grey" />
            </Pressable>
            <Pressable
                onPress={() => { router.navigate("/(user)/account/app.message") }}
                style={{
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    borderBottomColor: '#eee',
                    borderBottomWidth: 1,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                <View style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center'
                }}>
                    <AntDesign name="exclamationcircleo" size={24} color="green" />
                    <Text>Về ứng dụng</Text>
                </View>
                <MaterialIcons name="navigate-next" size={24} color="grey" />
            </Pressable>
            <View style={{
                flex: 1,
                justifyContent: "flex-end",
                gap: 10,
                paddingBottom: 15
            }}>
                <Pressable
                    onPress={handleLogOut}
                    style={({ pressed }) => ({
                        opacity: pressed === true ? 0.5 : 1,
                        padding: 10,
                        marginHorizontal: 10,
                        backgroundColor: APP_COLOR.ORANGE,
                        borderRadius: 3
                    })}
                >
                    <Text style={{
                        textAlign: "center",
                        color: "white"
                    }}>
                        Đăng Xuất
                    </Text>
                </Pressable>
                <Text style={{ textAlign: "center", color: APP_COLOR.GREY }}>
                    Version 1.0 - @tuananh
                </Text>
            </View>
        </View >
    );
};

export default AccountPage;