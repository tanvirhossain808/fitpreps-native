import { LinearGradient } from 'expo-linear-gradient';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { View, Text, YStack, XStack } from 'tamagui';
import { LineChart } from 'react-native-gifted-charts';
import { Dimensions, StyleSheet } from 'react-native';
const days = [
  { value: 500, label: 'Sun' },
  { value: 800, label: 'Mon' },
  { value: 400, label: 'Tues' },
  { value: 950, label: 'Wed' },
  { value: 1200, label: 'Thu' },
  { value: 1500, label: 'Fri' },
  { value: 700, label: 'Sat' },
];
const WeeklyChart = () => {
  const [activeDay, setActiveDay] = useState<string | null>(null);
  const data = days.map((day) => {
    return {
      ...day,
      labelTextStyle: {
        color: 'white',
        fontWeight: activeDay === day.label ? 700 : 500,
        fontSize: activeDay === day.label ? 12 : 12,
        width: 40,
        textAlign: 'right',
        marginLeft: -4,
        position: 'absolute',
        zIndex: 1,
      },
    };
  });

  return (
    <YStack w="100%" overflow="visible">
      <LinearGradient
        colors={['#8AADFF', '#33538F']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.container}>
        <LineChart
          pointerConfig={{
            pointerStripUptoDataPoint: true,
            pointerStripColor: '#FFEDE5',
            pointerStripWidth: 2,
            pointerColor: '#FFEDE5',
            radius: 7,
            pointerLabelWidth: 100,
            pointerLabelHeight: 120,
            pointerComponent: () => (
              <View
                w={14}
                h={14}
                borderWidth={1}
                borderRadius={7}
                borderColor="white"
                backgroundColor="#FD4F01"
                marginRight={200}></View>
            ),
            pointerLabelComponent: (items: any) => (
              <PointerComponent
                items={items}
                activeDay={activeDay as string}
                setActiveDay={setActiveDay}
              />
            ),
          }}
          adjustToWidth={true}
          initialSpacing={10}
          width={Dimensions.get('window').width - 100}
          startFillColor="#FFFFFF"
          endFillColor="white"
          data={data}
          curved
          showDataPointLabelOnFocus={true}
          startOpacity={0.5}
          endOpacity={0.1}
          areaChart
          thickness={2}
          xAxisIndicesHeight={0}
          color="#FFFFFF"
          xAxisIndicesWidth={0}
          yAxisTextStyle={{ ...styles.yAxisTextStyle }}
          xAxisLabelTextStyle={{
            color: 'white',
            fontWeight: 500,
            fontSize: 12,
            width: 40,
            textAlign: 'right',
            marginLeft: -4,
            position: 'absolute',
            zIndex: 1,
          }}
          hideOrigin={false}
          dataPointsHeight={30}
          dataPointsWidth={30}
          yAxisOffset={0}
          yAxisColor="transparent"
          xAxisColor="white"
          xAxisType="dashed"
          rulesColor="white"
          yAxisTextNumberOfLines={1}
          hideDataPoints={true}
          showXAxisIndices={false}
          showYAxisIndices={false}
          yAxisIndicesColor="rgba(255,255,255,0.3)"
          height={200}
          noOfSections={4}
          maxValue={2000}
          spacing={40}
          isAnimated={true}
          showDataPointOnFocus={true}
        />
      </LinearGradient>
    </YStack>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 12,
    paddingVertical: 12,
    height: 250,
    width: '100%',
    overflow: 'visible',
  },
  yAxisTextStyle: {
    color: 'white',
    fontSize: 12,
    fontWeight: 500,
    paddingRight: 10,
    textAlign: 'center',
    width: 60,
  },
});

export default WeeklyChart;

const PointerComponent = ({
  items,
  activeDay,
  setActiveDay,
}: {
  items: { value: number; label: string }[];
  activeDay: string;
  setActiveDay: Dispatch<SetStateAction<string | null>>;
}) => {
  const item = items[0];
  const isFirstPoint = item.label === 'Sun';
  const isLastPoint = item.label === 'Sat';
  useEffect(() => {
    setActiveDay(item.label);
    return () => {
      setActiveDay(() => null);
    };
  }, [item.label]);
  return (
    <XStack
      transform={[
        {
          translateX: isFirstPoint ? '50%' : isLastPoint ? '-50%' : 0,
        },
      ]}
      h={31}
      w={80}
      bg="#FFF"
      borderRadius={8}
      alignItems="center"
      justifyContent="center"
      position="absolute"
      right={'50%'}
      top={6}
      zIndex={100}>
      <Text color="#FD4F01" fontSize={12} fontWeight={700}>
        {item.value} cal
      </Text>
    </XStack>
  );
};
