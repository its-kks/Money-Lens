import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import appColors from '../../constants/colors'
import { ScrollView } from 'react-native-gesture-handler'
import TopTitle from '../../components/Insights/TopTitle'
import PieChart from '../../components/Insights/PieChart'
import ExpandingList from '../../components/Insights/ExpandingList'
import BarGraph from '../../components/Insights/BarGraph'

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

  const data2 = [{ this_month: 1500,budget: 1700, prev_month: 1600,  median_others: 2000 }];

  const [showTypeTransaction, setShowTypeTransaction] = useState(false);
  const [showMonthTransaction, setShowMonthTransaction] = useState(false);
  const [showYearTransaction, setShowYearTransaction] = useState(false);

  const [monthTransaction, setMonthTransaction] = useState('This Month');
  const [transactionType, setTransactionType] = useState('Any');
  const [yearTransaction, setYearTransaction] = useState('This Year');

  const [showTypeCategory, setShowTypeCategory] = useState(false);
  const [showMonthCategory, setShowMonthCategory] = useState(false);
  const [showYearCategory, setShowYearCategory] = useState(false);

  const [monthCategory, setMonthCategory] = useState('This Month');
  const [typeCategory, setTypeCategory] = useState('Any');
  const [yearCategory, setYearCategory] = useState('This Year');

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
          <ExpandingList listItem={['Income', 'Expenditure']} showList={showTypeTransaction} setShowList={setShowTypeTransaction}
            currentItem={transactionType} setCurrentItem={setTransactionType}
          />
          <ExpandingList listItem={['This Month', 'Prev Month', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}
            showList={showMonthTransaction}
            setShowList={setShowMonthTransaction}
            currentItem={monthTransaction} setCurrentItem={setMonthTransaction}
          />
          <ExpandingList listItem={['This Year', 'Prev Year']}
            showList={showYearTransaction}
            setShowList={setShowYearTransaction}
            currentItem={yearTransaction} setCurrentItem={setYearTransaction}
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
          <ExpandingList listItem={['Health', 'Grocerry']} showList={showTypeCategory} setShowList={setShowTypeCategory}
            currentItem={typeCategory} setCurrentItem={setTypeCategory}
          />
          <ExpandingList listItem={['This Month', 'Prev Month', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}
            showList={showMonthCategory}
            setShowList={setShowMonthCategory}
            currentItem={monthCategory} setCurrentItem={setMonthCategory}
          />
          <ExpandingList listItem={['This Year', 'Prev Year']}
            showList={showYearCategory}
            setShowList={setShowYearCategory}
            currentItem={yearCategory} setCurrentItem={setYearCategory}
          />

        </View>

        <View style={{flex: 1}}>
          <BarGraph data={data2} />

        </View>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({})