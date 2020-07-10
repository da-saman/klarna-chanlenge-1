const { assert, expect } = require("chai");

const {
  getBalanceByCategoryInPeriod,
  getBalance,
  getInCategory,
  getInTimePeriod,
} = require("../src/index");
const { it } = require("mocha");

const transactions = [
  {
    id: 123,
    sourceAccount: "my_account",
    targetAccount: "coffee_shop",
    amount: -30,
    category: "eating_out",
    time: "2018-03-16T12:34:00Z",
  },
  {
    id: 123,
    sourceAccount: "my_account",
    targetAccount: "coffee_shop",
    amount: -20,
    category: "eating_out",
    time: "2018-03-14T12:34:00Z",
  },
  {
    id: 123,
    sourceAccount: "my_account",
    targetAccount: "coffee_shop",
    amount: 10,
    category: "groceries",
    time: "2018-03-10T12:34:00Z",
  },
];

describe("getBalanceByCategoryInPeriod()", function () {
  it("returns 0 if there are no transactions", function () {
    assert.equal(
      getBalanceByCategoryInPeriod(
        [],
        "groceries",
        new Date("2018-03-01"),
        new Date("2018-03-31")
      ),
      0
    );
  });

  it("returns 0 if there are no transactions in category", function () {
    assert.equal(
      getBalanceByCategoryInPeriod(
        transactions,
        "play",
        new Date("2018-03-01"),
        new Date("2018-03-31")
      ),
      0
    );
  });

  it("returns 0 if there are no transactions in period", function () {
    assert.equal(
      getBalanceByCategoryInPeriod(
        transactions,
        "eating_out",
        new Date("2018-03-20"),
        new Date("2018-03-31")
      ),
      0
    );
  });

  it("returns sum of transactions in time period", function () {
    assert.equal(
      getBalanceByCategoryInPeriod(
        transactions,
        "groceries",
        new Date("2018-03-01"),
        new Date("2018-03-31")
      ),
      10
    );
  });
  // add your tests here
});

describe("getBalance()", function () {
  it("returns 0 if there is no transaction", function () {
    assert.equal(getBalance([]), 0);
  });

  it("returns balance of transactions", function () {
    assert.equal(getBalance(transactions), -40);
  });
});

describe("getInCategory()", function () {
  it("returns [] if there is no transaction", function () {
    expect(getInCategory([], "eating_out")).to.eql([]);
  });

  it("returns [] if there is no such category", function () {
    expect(getInCategory(transactions, "play")).to.eql([]);
  });

  it("returns proper array ", function () {
    expect(getInCategory(transactions, "eating_out")).to.eql([
      {
        id: 123,
        sourceAccount: "my_account",
        targetAccount: "coffee_shop",
        amount: -30,
        category: "eating_out",
        time: "2018-03-16T12:34:00Z",
      },
      {
        id: 123,
        sourceAccount: "my_account",
        targetAccount: "coffee_shop",
        amount: -20,
        category: "eating_out",
        time: "2018-03-14T12:34:00Z",
      },
    ]);
  });
});

describe("getInTimePeriod()", function () {
  it("returns [] if there is no transaction", function () {
    expect(
      getInTimePeriod([], new Date("2018-03-01"), new Date("2018-03-31"))
    ).to.eql([]);
  });

  it("returns [] if there is no transaction in period", function () {
    expect(
      getInTimePeriod(
        transactions,
        new Date("2018-03-20"),
        new Date("2018-03-31")
      )
    ).to.eql([]);
  });

  it("returns [] if start > end", function () {
    expect(
      getInTimePeriod(
        transactions,
        new Date("2018-03-31"),
        new Date("2018-03-20")
      )
    ).to.eql([]);
  });
  it("inclusive start and exclusive end", function () {
    expect(
      getInTimePeriod(
        transactions,
        new Date("2018-03-10T12:34:00Z"),
        new Date("2018-03-14T12:34:00Z")
      )
    ).to.eql([
      {
        id: 123,
        sourceAccount: "my_account",
        targetAccount: "coffee_shop",
        amount: 10,
        category: "groceries",
        time: "2018-03-10T12:34:00Z",
      },
    ]);
  });

  it("returns proper array ", function () {
    expect(
      getInTimePeriod(
        transactions,
        new Date("2018-03-14"),
        new Date("2018-03-17")
      )
    ).to.eql([
      {
        id: 123,
        sourceAccount: "my_account",
        targetAccount: "coffee_shop",
        amount: -30,
        category: "eating_out",
        time: "2018-03-16T12:34:00Z",
      },
      {
        id: 123,
        sourceAccount: "my_account",
        targetAccount: "coffee_shop",
        amount: -20,
        category: "eating_out",
        time: "2018-03-14T12:34:00Z",
      },
    ]);
  });
});
