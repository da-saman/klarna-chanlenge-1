// // Calculate the balance in a specific category within the specified time period.

// const transactions = [
//   {
//     id: 123,
//     sourceAccount: "my_account",
//     targetAccount: "coffee_shop",
//     amount: -30,
//     category: "eating_out",
//     time: "2018-03-12T12:34:00Z",
//   },
//   {
//     id: 123,
//     sourceAccount: "my_account",
//     targetAccount: "coffee_shop",
//     amount: -20,
//     category: "eating_out",
//     time: "2018-03-11T12:34:00Z",
//   },
//   {
//     id: 123,
//     sourceAccount: "my_account",
//     targetAccount: "coffee_shop",
//     amount: 10,
//     category: "eating_out",
//     time: "2018-04-10T12:34:00Z",
//   },
// ];
const getInTimePeriod = (transactions, start, end) =>
  transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.time);
    return (
      transactionDate.valueOf() >= start.valueOf() &&
      transactionDate.valueOf() < end.valueOf()
    );
  });

const getInCategory = (transactions, category) =>
  transactions.filter((transaction) => {
    return transaction.category === category;
  });

const getBalance = (transactions) =>
  transactions.reduce((acc, curr) => acc + curr.amount, 0);

function getBalanceByCategoryInPeriod(transactions = [], category, start, end) {
  const inPeriod = getInTimePeriod(transactions, start, end);
  const inCategoryAndPeriod = getInCategory(inPeriod, category);
  return getBalance(inCategoryAndPeriod);
}
console.log(getInCategory([], ""));

exports.getBalanceByCategoryInPeriod = getBalanceByCategoryInPeriod;
exports.getBalance = getBalance;
exports.getInCategory = getInCategory;
exports.getInTimePeriod = getInTimePeriod;
