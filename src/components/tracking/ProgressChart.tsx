import { TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { Text, View, XStack, YStack } from 'tamagui';

export function ProgressChart() {
  const goal = 1670;
  const food = 400;
  const exercise = 800;
  const remaining = goal - food + exercise;
  const data = [
    { value: food, color: '#FD4F01' },
    { value: exercise, color: '#FFCC00' },
    { value: remaining, color: '#FFFFFF' },
  ];

  const renderDot = (item: { color: string; border: string }) => {
    return (
      <View
        mt={2}
        borderWidth={item.border ? 1 : 0}
        borderColor={item.border}
        width={12}
        height={12}
        borderRadius={10}
        backgroundColor={item.color}
      />
    );
  };

  const renderLegendComponent = () => {
    return (
      <>
        <YStack gap="$2">
          {legendInformation.map((item, index) => {
            return (
              <XStack key={index} alignItems="flex-start" gap="$1">
                {renderDot(item)}
                <YStack>
                  <Text fontSize={12}>{item.name}</Text>

                  <Text fontSize={12} fontWeight={700}>
                    {item.burn}
                  </Text>
                </YStack>
              </XStack>
            );
          })}
        </YStack>
      </>
    );
  };

  return (
    <YStack
      // elevation="$0.5"
      // shadowColor="rgba(0,0,0,0.05)"
      // shadowRadius={2}
      // shadowOffset={{ width: 0, height: 1 }}
      gap="$3"
      p="$3"
      bg="#f4f7ff"
      borderRadius={8}
      w="100%">
      <YStack>
        <XStack justifyContent="space-between">
          <Text fontSize={16} fontWeight={500}>
            Calories
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text
              fontSize={16}
              fontWeight={700}
              borderBottomWidth={2}
              borderBottomColor="#FD4F01"
              color="#FD4F01">
              Edit
            </Text>
          </TouchableOpacity>
        </XStack>
        <Text fontSize={12} fontWeight={500}>
          Remaining = Goal - Food + Exercise
        </Text>
      </YStack>
      <View h={1} bg={'#C4D6FC'}></View>
      <XStack w="100%" gap={40} justifyContent="center">
        <PieChart
          data={data}
          animationDuration={1000}
          donut={true}
          isAnimated={true}
          radius={66}
          innerRadius={58}
          innerCircleColor={'#f4f7ff'}
          centerLabelComponent={() => {
            return (
              <YStack gap={3} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <XStack>
                  <Text fontSize={15} fontWeight={700}>
                    800/1670
                  </Text>
                </XStack>
                <Text fontSize={10}>Remaining</Text>
              </YStack>
            );
          }}
        />
        {renderLegendComponent()}
      </XStack>
    </YStack>
  );
}

const legendInformation = [
  {
    name: 'Calories Goal',
    burn: '1,670 kCal',
    border: '#B6BAC3',
    color: 'white',
  },
  {
    name: 'Exercise',
    burn: '+000 kcal',
    border: '',
    color: '#FD4F01',
  },
  {
    name: 'Food',
    burn: '-000 kCal',
    border: '',
    color: '#FFCC00',
  },
];
