import React from 'react';
import { Animated, FlatList, View, StyleSheet, ViewStyle } from 'react-native';
import { useStickyHeader } from './hooks/useStickyHeader';

interface CustomFlatListProps {
    data: any[];
    renderItem: ({ item }: { item: any }) => JSX.Element;
    HeaderComponent?: JSX.Element;
    StickyElementComponent?: JSX.Element;
    TopListElementComponent?: JSX.Element;
    style?: ViewStyle;
}

const CustomFlatList: React.FC<CustomFlatListProps> = ({
    data,
    renderItem,
    HeaderComponent,
    StickyElementComponent,
    TopListElementComponent,
    style,
}) => {
    const { headerHeight, scrollY, handleScroll } = useStickyHeader();

    const getStickyHeaderHeight = (event: any) => {
        const { height } = event.nativeEvent.layout;
        headerHeight.setValue(height);
    };

    return (
        <View style={[styles.container, style]}>
            {HeaderComponent && <View>{HeaderComponent}</View>}

            {StickyElementComponent && (
                <View onLayout={getStickyHeaderHeight}>{StickyElementComponent}</View>
            )}

            <Animated.FlatList
                data={data}
                renderItem={renderItem}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                ListHeaderComponent={TopListElementComponent}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default CustomFlatList;