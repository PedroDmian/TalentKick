import { StackScreenProps } from "@react-navigation/stack";

export interface INavigationProps {
  navigation: StackScreenProps<any, any>["navigation"];
  route: StackScreenProps<any, any>["route"];
}