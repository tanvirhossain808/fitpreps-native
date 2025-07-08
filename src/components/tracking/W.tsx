// import React from 'react';
// import { View, Dimensions, Text, StyleSheet } from 'react-native';
// import { LineChart, Grid } from 'react-native-svg-charts';
// import * as shape from 'd3-shape';
// import {
//   Defs,
//   LinearGradient as SVGGradient,
//   Stop,
//   Circle,
//   Line,
//   G,
//   Rect,
//   Text as SVGText,
// } from 'react-native-svg';
// import { LinearGradient } from 'expo-linear-gradient';

// const screenWidth = Dimensions.get('window').width;

// const WeeklyChart = () => {
//   const selectedIndex = 5; // Index for "Fri"
//   const data = [500, 800, 400, 950, 1200, 1400, 700];
//   const labels = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];

//   // Custom gradient for line fill
//   const Gradient = () => (
//     <Defs key="gradient">
//       <SVGGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
//         <Stop offset="0%" stopColor="white" stopOpacity={0.4} />
//         <Stop offset="100%" stopColor="white" stopOpacity={0} />
//       </SVGGradient>
//     </Defs>
//   );

//   // Custom tooltip
//   const Tooltip = ({ x, y }: any) => (
//     <G x={x(selectedIndex)} y={y(data[selectedIndex]) - 40}>
//       <Rect x={-35} y={-30} width={70} height={30} rx={10} fill="white" />
//       <SVGText
//         x={0}
//         y={-10}
//         fontSize="12"
//         fontWeight="bold"
//         fill="#FD4F01"
//         alignmentBaseline="middle"
//         textAnchor="middle">
//         {data[selectedIndex]} cal
//       </SVGText>
//     </G>
//   );

//   // Custom dots
//   const CustomDots = ({ x, y }: any) =>
//     data.map((value, index) => (
//       <Circle
//         key={index}
//         cx={x(index)}
//         cy={y(value)}
//         r={index === selectedIndex ? 6 : 3}
//         fill={index === selectedIndex ? '#FD4F01' : 'white'}
//         stroke="white"
//         strokeWidth={2}
//       />
//     ));

//   // Vertical dashed line
//   const VerticalLine = ({ x, y }: any) => (
//     <Line
//       x1={x(selectedIndex)}
//       x2={x(selectedIndex)}
//       y1={y(data[selectedIndex])}
//       y2={y(0)}
//       stroke="white"
//       strokeDasharray={[4, 4]}
//     />
//   );

//   return (
//     <View style={styles.wrapper}>
//       <LinearGradient
//         colors={['#8AADFF', '#33538F']}
//         start={{ x: 0.5, y: 0 }}
//         end={{ x: 0.5, y: 1 }}
//         style={styles.container}>
//         <LineChart
//           style={{ height: 200, width: screenWidth - 50 }}
//           data={data}
//           curve={shape.curveNatural}
//           svg={{ stroke: 'white', strokeWidth: 2, fill: 'url(#gradient)' }}
//           contentInset={{ top: 20, bottom: 20 }}>
//           <Grid svg={{ stroke: 'white', strokeDasharray: [4, 4] }} />
//           <Gradient />
//           <CustomDots />
//           <Tooltip />
//           <VerticalLine />
//         </LineChart>
//         {/* X Axis Labels */}
//         <View style={styles.xAxis}>
//           {labels.map((label, index) => (
//             <Text
//               key={index}
//               style={[styles.label, index === selectedIndex && styles.selectedLabel]}>
//               {label}
//             </Text>
//           ))}
//         </View>
//       </LinearGradient>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   wrapper: {
//     width: '100%',
//     alignItems: 'center',
//   },
//   container: {
//     borderRadius: 16,
//     paddingVertical: 12,
//     width: '100%',
//     alignItems: 'center',
//   },
//   xAxis: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '90%',
//     marginTop: 8,
//   },
//   label: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: '500',
//     width: 40,
//     textAlign: 'center',
//   },
//   selectedLabel: {
//     fontWeight: 'bold',
//   },
// });
