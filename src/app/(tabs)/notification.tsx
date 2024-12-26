import { getNotificationsAPI } from "@/utils/api"; // Assume this function is defined  
import { APP_COLOR } from "@/utils/constant";
import { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";

const NotificationPage = () => {
    const [notifications, setNotifications] = useState<INotification[]>([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            const res = await getNotificationsAPI();
            if (res.data) setNotifications(res.data);
        };
        fetchNotifications();
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
                    <Text style={{ color: APP_COLOR.ORANGE }}>Thông báo</Text>
                </View>
                <ScrollView style={{ flex: 1 }}>
                    {notifications.map((notification, index) => (
                        <View key={index} style={{ padding: 10 }}>
                            <Text>{notification.message}</Text>
                            <Text>{new Date(notification.createdAt).toLocaleDateString()}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default NotificationPage;