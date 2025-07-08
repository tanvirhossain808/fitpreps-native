import { DrawerNavigationProp } from '@react-navigation/drawer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  index: undefined;
  '(tabs)': undefined;
};

export type DrawerNavigation = DrawerNavigationProp<RootStackParamList>;
export type NativeStackNavigation = NativeStackNavigationProp<RootStackParamList>;
