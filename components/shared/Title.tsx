import React from 'react';
import { Text } from 'tamagui';

export default function Title({ text }: { text: string }) {
  return (
    <Text color="#25272C" fontWeight={700} fontSize={16}>
      {text}
    </Text>
  );
}
