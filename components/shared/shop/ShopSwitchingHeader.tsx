import { Button, Text, View, XStack } from 'tamagui';
import React, { Component } from 'react';

export default function SwitchHeader({ product }: { product: string }) {
  const [selected, setSelected] = React.useState<string>('Supplements');
  const bg = product === 'suppd' ? '#FF7435' : '#BDB0F4';
  return (
    <XStack width={'100%'} p={4} borderRadius={8} borderWidth={1} borderColor="#B6BAC3">
      <Button
        onPress={() => setSelected('Supplements')}
        width={'50%'}
        color={selected === 'Supplements' ? 'white' : '#1E1F20'}
        fontWeight={selected === 'Supplements' ? 700 : 500}
        shadowColor={selected === 'Supplements' ? 'rgba(10, 13, 18, 0.05)' : 'transparent'}
        shadowOffset={{ width: 0, height: 1 }}
        shadowRadius={selected === 'Supplements' ? 2 : 0}
        shadowOpacity={selected === 'Supplements' ? 1 : 0}
        elevation={selected === 'Supplements' ? 0.05 : 0}
        bg={selected === 'Supplements' ? bg : 'white'}>
        Supplements
      </Button>
      <Button
        onPress={() => setSelected('Gym Wear')}
        width={'50%'}
        color={selected === 'Gym Wear' ? 'white' : '#1E1F20'}
        fontWeight={selected === 'Gym Wear' ? 700 : 500}
        shadowColor={selected === 'Gym Wear' ? 'rgba(10, 13, 18, 0.05)' : 'transparent'}
        shadowOffset={{ width: 0, height: 1 }}
        shadowRadius={selected === 'Gym Wear' ? 2 : 0}
        shadowOpacity={selected === 'Gym Wear' ? 1 : 0}
        elevation={selected === 'Gym Wear' ? 0.05 : 0}
        bg={selected === 'Gym Wear' ? bg : 'white'}>
        Gym Wear
      </Button>
    </XStack>
  );
}
