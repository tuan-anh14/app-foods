import RMain from "@/components/example/restaurant/main";
import SectionListBasic from "@/components/example/section.list.basic";
import SectionListLibrary from "@/components/example/section.list.library";
import SectionListScroll from "@/components/example/section.list.scroll";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductPage = () => {
    return (
        <View style={{ flex: 1 }}>
            <RMain />
        </View>
    );
};

export default ProductPage;