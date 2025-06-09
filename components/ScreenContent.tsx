import { YStack, H2, Separator, Theme, Text, View, Image } from 'tamagui';

import { EditScreenInfo } from './EditScreenInfo';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const ScreenContent = ({ title, path, children }: ScreenContentProps) => {
  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center" justifyContent="center">
        <H2>{title}</H2>
        <Separator />
        <View bg={'red'}>
          <Image source={require('public/images/meals.png')} width={100} height={100} />
          {/* <Image */}
          <Text>df</Text>
          {/* <Image source={} /> */}
        </View>
        <EditScreenInfo path={path} />
        {children}
      </YStack>
    </Theme>
  );
};
