import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { G, Path, Circle } from 'react-native-svg';
import { ScrollView } from 'react-native-gesture-handler';
import appColors from '../../constants/colors';

const PieChart = ({ data }) => {
  const [highlight, setHighlight] = useState(1);
  const total = data.reduce((sum, item) => sum + item.amount, 0);

  // Calculate the percentage for each item
  const fractions = data.map(item => ({
    ...item,
    percentage: (item.amount / total) * 100,
  }));

  const radius = 100;
  const center = radius;
  let startAngle = 0;

  const createPieSlice = (item, index) => {
    const sliceAngle = (item.percentage / 100) * 2 * Math.PI;
    const endAngle = startAngle + sliceAngle;

    const startX = center + radius * Math.cos(startAngle);
    const startY = center + radius * Math.sin(startAngle);
    const endX = center + radius * Math.cos(endAngle);
    const endY = center + radius * Math.sin(endAngle);

    const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;

    const pathData = [
      `M ${center} ${center}`,
      `L ${startX} ${startY}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
      'Z'
    ].join(' ');

    startAngle = endAngle;

    return (
      <Path
        key={item.id}
        d={pathData}
        fill={getColor(index)}
        onPress={() => { setHighlight(item.id) }}
      />
    );
  };

  const createLargePatch = (item, index) => {
    const sliceAngle = (item.percentage / 100) * 2 * Math.PI;
    const endAngle = startAngle + sliceAngle;

    const radiusN = radius + 8;

    const startX = center + radiusN * Math.cos(startAngle);
    const startY = center + radiusN * Math.sin(startAngle);
    const endX = center + radiusN * Math.cos(endAngle);
    const endY = center + radiusN * Math.sin(endAngle);

    const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;

    const pathData = [
      `M ${center} ${center}`,
      `L ${startX} ${startY}`,
      `A ${radiusN} ${radiusN} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
      'Z'
    ].join(' ');

    startAngle = endAngle;

    return (
      <Path
        key={item.id}
        d={pathData}
        fill={item.id === highlight ? getColor(index) : 'none'}
        onPress={() => { setHighlight(item.id) }}
      />
    );
  };


  const pieSlices = fractions.map((item, index) => createPieSlice(item, index));
  const largePatches = fractions.map((item, index) => createLargePatch(item, index));

  return (
    <View style={styles.container}>
      <Svg width={250} height={250} viewBox={`-10 -10 ${2 * radius + 20} ${2 * radius + 20}`} >
        <G>
          <Circle cx={center} cy={center} r={radius} />
          {pieSlices}
          {largePatches}
          <Circle cx={center} cy={center} r={radius / 2} fill={appColors.white} />
        </G>
      </Svg>
      <View style={styles.legend}>
        <ScrollView >
          {fractions.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={styles.legendItem}
              onPress={() => setHighlight(item.id)}
            >
              <View
                style={[styles.legendColor, { backgroundColor: getColor(index) }]}
              />
              <View>
                <Text style={item.id === highlight ? styles.highlightTextStyle : styles.baseTextStyle}>
                  {`${item.name}`}
                </Text>
                <Text style={item.id === highlight ? styles.highlightTextStyle : styles.baseTextStyle}>
                  {`${item.amount} (${item.percentage.toFixed(0)}%)`}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const getColor = (index) => {
  const colors = [appColors.blue, appColors.green, appColors.orange,
    appColors.pink, appColors.purple, appColors.red
  ];
  return colors[index % colors.length];
};


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  legend: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: 250
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  legendColor: {
    width: 25,
    height: 25,
    marginRight: 5,
    borderRadius: 15

  },
  baseTextStyle: {
    fontSize: 14,
    color: appColors.grey,
    fontFamily: 'Roboto-Bold'
  },
  highlightTextStyle: {
    fontSize: 14,
    color: appColors.black,
    fontFamily: 'Roboto-Bold',
  }
});

export default PieChart;
