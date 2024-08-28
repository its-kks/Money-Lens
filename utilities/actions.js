export const addActionsLogic = (recurringPayments, dispatch, addActionRequest, updateRecurringPaymentRequest) => {
  return new Promise((resolve, reject) => {
    try {
      const todays_date = new Date();
      for (let i = 0; i < recurringPayments.length; i++) {
        let { pay_date, saved, action_added, amount, id, name, categoryID, recipientID, frequency } = recurringPayments[i];
        if (amount > 0) {
          // this is an recurring income
          continue;
        }
        pay_date = pay_date.split('-')
        action_added = action_added.split('-')
        if (
          pay_date[0] > todays_date.getFullYear() ||
          (pay_date[0] == todays_date.getFullYear() && pay_date[1] >= (todays_date.getMonth() + 1))
        ) {
          let actionFound = false;

          if (todays_date.getMonth() + 1 == pay_date[1] &&
            pay_date[2] <= todays_date.getDate() &&
            action_added[1] != todays_date.getMonth() + 1) {
            dispatch(addActionRequest({ actionAmount: Math.abs(amount) - saved, actionType: 'Pay', recurringPaymentID: id }));
            actionFound = true;
          }
          else if (todays_date.getDate() >= 25 &&
            action_added[1] != todays_date.getMonth() + 1
          ) {
            const month_diff = (parseInt(pay_date[0]) - todays_date.getFullYear()) * 12 +
              parseInt(pay_date[1]) - (todays_date.getMonth() + 1) + 1;

            dispatch(addActionRequest({ actionAmount: Math.floor((Math.abs(amount) - saved) / month_diff), actionType: 'Save', recurringPaymentID: id }));
            actionFound = true;
          }
          // update actionAdded
          if (actionFound) {
            dispatch(updateRecurringPaymentRequest({
              recPaymentID: id,
              recPaymentName: name,
              recPaymentAmount: amount,
              recPaymentCategory: categoryID,
              recPaymentRecipient: recipientID,
              recPaymentNextPayment: pay_date.reverse().join('/'),
              recPaymentFrequency: frequency,
              recPaymentType: '1',
              recPaymentActionAdded: new Intl.DateTimeFormat('en-GB').format(todays_date)
            }))
          }
        }
        else {
          // update pay_date and next_date of the recurringPayment
        }
      }
      resolve('Actions Added Succesfully')
    }
    catch (error) {
      console.error(error);
      reject('Failed to add actions');
    }
  })
}