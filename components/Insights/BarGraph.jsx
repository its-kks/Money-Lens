import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect, G, Line, Text as SvgText, Path, Polygon } from 'react-native-svg';
import appColors from '../../constants/colors';

const BarGraph = ({ data, isInfinity }) => {
  const barWidth = 50;
  const barSpacing = 35;
  const maxBarHeight = 200;
  const graphHeight = maxBarHeight + 60;
  const graphWidth = (barWidth + barSpacing) * 4 + 30;

  const [selectedBar, setSelectedBar] = useState(0);

  const xLabels = ["This Month", "Budget", "Prev Month", "Other Users"]

  const maxValue = Math.max(...Object.values(data[0]));
  const scaleFactor = maxBarHeight / maxValue;

  return (
    <View style={styles.container}>
      <Svg height={graphHeight + 40} width={graphWidth}>
        <G>
          {/* Y Axis */}
          <Line x1="10" y1="0" x2="10" y2={graphHeight} stroke="black" strokeWidth="2" />

          {/* X Axis */}
          <Line x1="10" y1={graphHeight} x2={graphWidth} y2={graphHeight} stroke="black" strokeWidth="2" />

          {/* Arrow X */}

          {/* Arrow X */}
          <Polygon points={`${graphWidth - 10},${graphHeight - 5} ${graphWidth + 2},${graphHeight} ${graphWidth - 10},${graphHeight + 5}`} fill="black" />

          {/* Arrow Y */}
          <Polygon points={`5,10 10,-2 15,10`} fill="black" />


          {/* Bars */}
          {Object.keys(data[0]).map((key, index) => {
            const barHeight = data[0][key] * scaleFactor;
            const x = barSpacing + index * (barWidth + barSpacing);
            const y = graphHeight - barHeight - 1;
            const radius = 5;
            return (
              <Path
                key={key}
                d={`
                M${x},${y + barHeight}
                L${x},${y + radius}
                Q${x},${y} ${x + radius},${y}
                L${x + barWidth - radius},${y}
                Q${x + barWidth},${y} ${x + barWidth},${y + radius}
                L${x + barWidth},${y + barHeight}
                Z
              `}
                fill={appColors.purple} //set color same as category background color
                onPress={() => { setSelectedBar(index) }}
              />
            );
          })}

          {/* Bar Labels */}
          {Object.keys(data[0]).map((key, index) => {
            const barHeight = data[0][key] * scaleFactor;
            const x = barSpacing + index * (barWidth + barSpacing) + barWidth / 2;
            const y = graphHeight - barHeight - 1;
            const callOutHeight = 50;
            const arrowSize = 10;
            return (
              <G key={key}>
                <Polygon
                  points={`${x},${y} ${x + arrowSize},${y - arrowSize} ${x + 40},${y - arrowSize} ${x + 40},${y - callOutHeight} ${x - 40},${y - callOutHeight} 
                  ${x - 40},${y - arrowSize} ${x - arrowSize},${y - arrowSize}
                `}
                  fill={index === selectedBar ? appColors.lightGrey : 'none'}
                />
                <SvgText
                  key={key}
                  x={x}
                  y={y - arrowSize - callOutHeight / 3}
                  fill={index === selectedBar ? appColors.grey : 'none'}
                  textAnchor="middle"
                  fontSize="14"
                  fontFamily="Roboto-Bold"
                >
                  {key == 'budget' && isInfinity ? '∞' : data[0][key]}
                </SvgText>
                <Line x1={x} y1={y-1} x2={10} y2={y} stroke={index === selectedBar ? appColors.lightGrey : 'none'}
                  strokeWidth="2"
                  strokeDasharray={4}
                />
              </G>

            );
          })}


          {/* X Axis Labels */}
          {Object.keys(data[0]).map((key, index) => (
            <SvgText
              key={key}
              x={barSpacing + index * (barWidth + barSpacing) + barWidth / 2}
              y={graphHeight + 20}
              fill={appColors.lightBlack}
              textAnchor="middle"
              fontSize="14"
              fontFamily="Roboto-Bold"
              onPress={() => { setSelectedBar(index) }}
            >
              {xLabels[index]}
            </SvgText>
          ))}

        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  legend: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});

export default BarGraph;
