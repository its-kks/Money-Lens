import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import appColors from '../../constants/colors'
import { ScrollView } from 'react-native-gesture-handler'
import TopTitle from '../../components/Insights/TopTitle'
import PieChart from '../../components/Insights/PieChart'
import ExpandingList from '../../components/Insights/ExpandingList'

export default function InsightsScreen() {
  const data = [
    { id: 1, name: 'Health', amount: 3500 },
    { id: 2, name: 'Grocerry', amount: 5000 },
    { id: 3, name: 'Transport', amount: 2000 },
    { id: 4, name: 'EMI', amount: 10000 },
    { id: 6, name: 'Academics', amount: 9000 },
    { id: 7, name: 'Miscellaneous', amount: 3000 },
    { id: 8, name: 'Vegetables', amount: 3000 },
  ];

  const [showType, setShowType] = useState(false);
  const [showMonth, setShowMonth] = useState(false);
  const [showYear, setShowYear] = useState(false);

  const [sort, setSort] = useState('desc');
  const [month, setMonth] = useState('This Month');
  const [type, setType] = useState('Any');
  const [year, setYear] = useState('This Year');

  return (
    <View style={{ flex: 1, backgroundColor: appColors.white }}>

      {/* Income/Expenditure Pie Chart */}
      <View style={{ flex: 1, borderBottomWidth: 0.5, borderBottomColor: appColors.lightGrey }}>
        <View style={{ height: 35, flexShrink: 0, marginTop: 5 }}>
          <TopTitle title={'Income/Expense Insights:'} />
        </View>

        <View style={{
          height: 30,
          margin: 10,
          justifyContent: 'space-evenly',
          flexDirection: 'row',
          flexShrink: 0,
        }}>
          <ExpandingList listItem={['Any', 'Income', 'Expenditure']} showList={showType} setShowList={setShowType}
            currentItem={type} setCurrentItem={setType}
          />
          <ExpandingList listItem={['This Month', 'Prev Month', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}
            showList={showMonth}
            setShowList={setShowMonth}
            currentItem={month} setCurrentItem={setMonth}
          />
          <ExpandingList listItem={['This Year', 'Prev Year']}
            showList={showYear}
            setShowList={setShowYear}
            currentItem={year} setCurrentItem={setYear}
          />

        </View>

        <View style={{ flex: 1 }}>
          <PieChart data={data} />
        </View>




      </View>

      {/* Bar graph categories */}
      <View style={{ flex: 1 }}>
        <View style={{ height: 35, flexShrink: 0, }}>
          <TopTitle title={'Categories Insights:'} />
        </View>

        <View style={{
          height: 30,
          margin: 10,
          justifyContent: 'space-evenly',
          flexDirection: 'row',
          flexShrink: 0,
        }}>
          <ExpandingList listItem={['Health', 'Grocerry']} showList={showType} setShowList={setShowType}
            currentItem={type} setCurrentItem={setType}
          />
          <ExpandingList listItem={['This Month', 'Prev Month', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}
            showList={showMonth}
            setShowList={setShowMonth}
            currentItem={month} setCurrentItem={setMonth}
          />
          <ExpandingList listItem={['This Year', 'Prev Year']}
            showList={showYear}
            setShowList={setShowYear}
            currentItem={year} setCurrentItem={setYear}
          />

        </View>

        <View style={{}}>

        </View>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({})