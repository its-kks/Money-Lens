import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import appColors from '../../constants/colors'
import TopTitle from '../../components/Insights/TopTitle'
import PieChart from '../../components/Insights/PieChart'
import ExpandingList from '../../components/Insights/ExpandingList'
import BarGraph from '../../components/Insights/BarGraph'
import { useDispatch, useSelector } from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchPieDataRequest } from '../../Redux/actions/insightPie'
import { fetchBarDataRequest } from '../../Redux/actions/insightBar'
import { positiveInf } from '../../constants/numeric'



function insufficientData() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <MaterialCommunityIcons name="progress-question" size={100} color={appColors.lightGrey} />
      <Text style={{ color: appColors.lightGrey, fontFamily: 'Roboto-Bold', fontSize: 15, marginTop: 10 }}>Insufficient Data</Text>
    </View>)
}
export default function InsightsScreen() {

  const [showTypeTransaction, setShowTypeTransaction] = useState(false);
  const [showMonthTransaction, setShowMonthTransaction] = useState(false);
  const [showYearTransaction, setShowYearTransaction] = useState(false);

  const [monthTransaction, setMonthTransaction] = useState('This Month');
  const [transactionType, setTransactionType] = useState('Expenditure');
  const [yearTransaction, setYearTransaction] = useState('This Year');

  const [showTypeCategory, setShowTypeCategory] = useState(false);
  const [showMonthCategory, setShowMonthCategory] = useState(false);
  const [showYearCategory, setShowYearCategory] = useState(false);

  const [monthCategory, setMonthCategory] = useState('This Month');
  const [typeCategory, setTypeCategory] = useState('Miscellaneous');
  const [yearCategory, setYearCategory] = useState('This Year');
  const [categoryID, setCategoryID] = useState(1);

  const otherUserData = [
    { name: 'Miscellaneous', spending: 5562 },
    { name: 'Food', spending: 4562 },
    { name: 'Transport', spending: 3562 },
    { name: 'Entertainment', spending: 2562 },
  ]

  const fetchedCategoriesPie = useSelector(state => state.insightPie.pieData);
  const pieData = fetchedCategoriesPie;
  const fetchCategoriesRequest = useSelector(state => state.categories.categories);
  let categoryList = fetchCategoriesRequest
    .filter(item => item.type === "Expense")
    .map(item => ({ id: item.id, name: item.name }));


  const dispatch = useDispatch();
  let isInfinity = false;
  
  const fetchedCategoryBar = useSelector(state => state.insightBar.barData);
  
  const barData = fetchedCategoryBar.map(item => {
    let budget = item.budget;
    if (budget >= positiveInf) {
      budget = item.this_month + item.prev_month + 1000;
      isInfinity = true;
    }
    return {
      this_month: item.this_month,
      budget: budget,
      prev_month: item.prev_month,
      median_others: item.median_others
    };
  });


  useEffect(() => {
    dispatch(fetchPieDataRequest({ type: transactionType, month: monthTransaction, year: yearTransaction }));
    dispatch(fetchBarDataRequest({ categoryID, month: monthCategory, year: yearTransaction }));
  }, [transactionType, monthTransaction, yearTransaction, categoryID, monthCategory, yearCategory]);



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
          {
            pieData.length > 0 ? <PieChart data={pieData} />
              : insufficientData()
          }

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
          <ExpandingList listItem={categoryList} showList={showTypeCategory} setShowList={setShowTypeCategory} setCurrentItemID={setCategoryID}
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

        <View style={{ flex: 1 }}>
          <BarGraph data={barData} isInfinity={isInfinity} />

        </View>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({})