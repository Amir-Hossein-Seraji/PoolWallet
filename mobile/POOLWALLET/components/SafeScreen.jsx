import { StyleSheet, Text, View } from 'react-native'
import React, { Children } from 'react'
import { COLORS } from '../constants/color'
import {useSafeAreaInsets} from "react-native-safe-area-context"
const SafeScreen = ({Children}) =>{
    const insets = useSafeAreaInsets();
    return (
    <View style={{paddingTop:insets.top,flex:1,backgroundColor:COLORS.background}}>
      {Children}
    </View>
    );
};
export default SafeScreen;

