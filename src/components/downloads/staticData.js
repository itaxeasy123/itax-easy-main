export const countryCodeTableHeaders = [
  {
    text: 'Country Code',
    dataField: 'countryCode',
    formatter: (data) => (
      <div className="flex   justify-start items-center">
        <span className="font-medium">{data}</span>
      </div>
    ),
  },
  {
    text: 'Country Name',
    dataField: 'countryName',
    formatter: (data) => (
      <div className="flex   justify-start items-center">
        <span className="font-medium">{data}</span>
      </div>
    ),
  },
];
export const goldSilverRateTableHeaders = [
  {
    text: 'Assessment year/ valuation date',
    dataField: 'assessmentYear',
    formatter: (data) => (
      <div className="flex justify-start   items-center">
        <span className="font-medium">{data}</span>
      </div>
    ),
  },
  {
    text: 'Standard Gold 24 Carats Rate for 10 grams Rs.',
    dataField: 'stGoldRate24CPer10Grams',
    formatter: (data) => (
      <div className="flex   justify-start   items-center">
        <span className="font-medium">{data}</span>
      </div>
    ),
  },
  {
    text: 'Silver 999 touch Rate of 1 Kg. Rs.',
    dataField: 'stSilverRateFor1Kg',
    formatter: (data) => (
      <div className="flex   justify-start   items-center">
        <span className="font-medium">{data}</span>
      </div>
    ),
  },
];
export const InterestAccruedOnNationalListVIII = [
  {
    text: 'When NSC was purchased',
    dataField: 'purchaseDuration',
    formatter: (data) => (
      <div className="flex   justify-start items-center">
        <span className="font-medium">{data}</span>
      </div>
    ),
  },
  {
    text: 'First Year',
    dataField: 'interestRatesAccured',
    formatter: (data, row) => (
      <div className="flex   justify-start items-center">
        <span className="font-medium">
          {row.interestRatesAccrued[0].rate !== 0
            ? row.interestRatesAccrued[0].rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: 'Second Year',
    dataField: `interestRatesAccured`,
    formatter: (data, row) => (
      <div className="flex   justify-start items-center">
        <span className="font-medium">
          {row.interestRatesAccrued[1].rate !== 0
            ? row.interestRatesAccrued[1].rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: 'Third Year',
    dataField: `interestRatesAccured`,
    formatter: (data, row) => (
      <div className="flex   justify-start items-center">
        <span className="font-medium">
          {row.interestRatesAccrued[2].rate !== 0
            ? row.interestRatesAccrued[2].rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: 'Fourth Year',
    dataField: `interestRatesAccured`,
    formatter: (data, row) => (
      <div className="flex   justify-start items-center">
        <span className="font-medium">
          {row.interestRatesAccrued[3].rate !== 0
            ? row.interestRatesAccrued[3].rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: 'Fifth Year',
    dataField: `interestRatesAccured`,
    formatter: (data, row) => (
      <div className="flex   justify-start items-center">
        <span className="font-medium">
          {row.interestRatesAccrued[4].rate !== 0
            ? row.interestRatesAccrued[4].rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: 'Sixth Year',
    dataField: `interestRatesAccured`,
    formatter: (data, row) => (
      <div className="flex   justify-start items-center">
        <span className="font-medium">
          {row.interestRatesAccrued[5].rate !== 0
            ? row.interestRatesAccrued[5].rate
            : 'NA'}
        </span>
      </div>
    ),
  },
];
export const IVP = [
  {
    text: 'When NSC was purchased',
    dataField: 'purchaseDuration',
    formatter: (data) => (
      <div className="flex   justify-start items-center">
        <span className="font-medium">{data}</span>
      </div>
    ),
  },
  {
    text: 'Compounded rate of interest',
    dataField: 'interestRatesAccured[0].rate',
    formatter: (data, row) => (
      <div className="flex   justify-start items-center">
        <span className="font-medium">
          {row.interestRatesAccrued[0].rate !== 0
            ? row.interestRatesAccrued[0].rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: '1st Year',
    dataField: 'interestRatesAccured[1].rate',
    formatter: (data, row) => (
      <div className="flex   justify-start items-center">
        <span className="font-medium">
          {row.interestRatesAccrued[1].rate !== 0
            ? row.interestRatesAccrued[1].rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: '2nd Year',
    dataField: `interestRatesAccured[2].rate`,
    formatter: (data, row) => (
      <div className="flex   justify-start items-center">
        <span className="font-medium">
          {row.interestRatesAccrued[2].rate !== 0
            ? row.interestRatesAccrued[2].rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: '3rd Year',
    dataField: `interestRatesAccured[3].rate`,
    formatter: (data, row) => (
      <div className="flex   justify-start items-center">
        <span className="font-medium">
          {row.interestRatesAccrued[3].rate !== 0
            ? row.interestRatesAccrued[3].rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: '4th Year',
    dataField: `interestRatesAccured[4].rate`,
    formatter: (data, row) => (
      <div className="flex   justify-start items-center">
        <span className="font-medium">
          {row.interestRatesAccrued[0].rate !== 0
            ? row.interestRatesAccrued[0].rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: '5th Year',
    dataField: `interestRatesAccured[5].rate`,
    formatter: (data, row) => (
      <div className="flex   justify-start items-center">
        <span className="font-medium">
          {row.interestRatesAccrued[0].rate !== 0
            ? row.interestRatesAccrued[0].rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: '5 ½ Year',
    dataField: `interestRatesAccured[5].rate`,
    formatter: (data, row) => (
      <div className="flex   justify-start items-center">
        <span className="font-medium">
          {row.interestRatesAccrued[0].rate !== 0
            ? row.interestRatesAccrued[0].rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: '6th Year',
    dataField: `interestRatesAccured[6].rate`,
    formatter: (data, row) => (
      <div className="flex   justify-start items-center">
        <span className="font-medium">
          {row.interestRatesAccrued[0].rate !== 0
            ? row.interestRatesAccrued[0].rate
            : 'NA'}
        </span>
      </div>
    ),
  },
];
export const IX = [
  {
    text: 'When NSC was purchased',
    dataField: 'purchaseDuration',
    formatter: (data) => (
      <div className="flex   justify-start   items-center">
        <span className="font-medium">{data}</span>
      </div>
    ),
  },
  {
    text: 'First Year',
    dataField: 'interestRatesAccured',
    formatter: (data, row) => (
      <div className="flex   justify-start   items-center">
        <span className="font-medium">
          {row.interestRatesAccrued[0].rate !== 0
            ? row.interestRatesAccrued[0].rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: 'Second Year',
    dataField: `interestRatesAccured`,
    formatter: (data, row) => (
      <div className="flex   justify-start   items-center">
        <span className="font-medium">
          {row.interestRatesAccrued[1].rate !== 0
            ? row.interestRatesAccrued[1].rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: 'Third Year',
    dataField: `interestRatesAccured`,
    formatter: (data, row) => (
      <div className="flex   justify-start   items-center">
        <span className="font-medium">
          {row.interestRatesAccrued[2].rate !== 0
            ? row.interestRatesAccrued[2].rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: 'Fourth Year',
    dataField: `interestRatesAccured`,
    formatter: (data, row) => (
      <div className="flex   justify-start   items-center">
        <span className="font-medium">
          {row.interestRatesAccrued[3].rate !== 0
            ? row.interestRatesAccrued[3].rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: 'Fifth Year',
    dataField: `interestRatesAccured`,
    formatter: (data, row) => (
      <div className="flex   justify-start   items-center">
        <span className="font-medium">
          {row.interestRatesAccrued[4].rate !== 0
            ? row.interestRatesAccrued[4].rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: 'Sixth Year',
    dataField: `interestRatesAccured`,
    formatter: (data, row) => (
      <div className="flex   justify-start   items-center">
        <span className="font-medium">
          {row.interestRatesAccrued[5].rate !== 0
            ? row.interestRatesAccrued[5].rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: 'Seventh Year',
    dataField: `interestRatesAccured`,
    formatter: (data, row) => (
      <div className="flex   justify-start   items-center">
        <span className="font-medium">
          {row.interestRatesAccrued[6].rate !== 0
            ? row.interestRatesAccrued[6].rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: 'Eighth Year',
    dataField: `interestRatesAccured`,
    formatter: (data, row) => (
      <div className="flex   justify-start   items-center">
        <span className="font-medium">
          {row.interestRatesAccrued[7].rate !== 0
            ? row.interestRatesAccrued[7].rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: 'Ninth Year',
    dataField: `interestRatesAccured`,
    formatter: (data, row) => (
      <div className="flex   justify-start   items-center">
        <span className="font-medium">
          {row.interestRatesAccrued[8].rate !== 0
            ? row.interestRatesAccrued[8].rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: 'Tenth Year',
    dataField: `interestRatesAccured`,
    formatter: (data, row) => (
      <div className="flex   justify-start   items-center">
        <span className="font-medium">
          {row.interestRatesAccrued[9].rate !== 0
            ? row.interestRatesAccrued[9].rate
            : 'NA'}
        </span>
      </div>
    ),
  },
];
export const KVP = [
  {
    text: 'Period From the Date of certificate  to the date of its encashment',
    dataField: 'purchaseDuration',
    formatter: (data) => (
      <div className="flex justify-start items-center">
        <span className="font-medium">Purchased from {data}</span>
      </div>
    ),
  },
  {
    text: '1 Year',
    dataField: 'interestRatesAccured',
    formatter: (data, row) => (
      <div className="flex justify-start items-center">
        <span className="font-medium">
          {row.interestRatesAccrued.at(0).rate !== 0
            ? row.interestRatesAccrued.at(0).rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: '2 Years',
    dataField: `interestRatesAccured`,
    formatter: (data, row) => (
      <div className="flex   justify-start items-center">
        <span className="font-medium">
          {row.interestRatesAccrued.at(1)?.rate !== 0
            ? row.interestRatesAccrued.at(1)?.rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: '2 Years and 6 Months',
    dataField: `interestRatesAccured`,
    formatter: (data, row) => (
      <div className="flex   justify-start items-center">
        <span className="font-medium">
          {row.interestRatesAccrued?.at(2)?.rate !== 0
            ? row.interestRatesAccrued?.at(2)?.rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: '3 Years',
    dataField: `interestRatesAccured`,
    formatter: (data, row) => (
      <div className="flex   justify-start items-center">
        <span className="font-medium">
          {row.interestRatesAccrued?.at(3)?.rate !== 0
            ? row.interestRatesAccrued?.at(3)?.rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: '3 Years and 6 Months',
    dataField: `interestRatesAccured`,
    formatter: (data, row) => (
      <div className="flex   justify-start items-center">
        <span className="font-medium">
          {' '}
          {row.interestRatesAccrued?.at(4)?.rate !== 0
            ? row.interestRatesAccrued?.at(4)?.rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: '4 Years',
    dataField: `interestRatesAccured`,
    formatter: (data, row) => (
      <div className="flex   justify-start items-center">
        <span className="font-medium">
          {' '}
          {row.interestRatesAccrued?.at(5)?.rate !== 0
            ? row.interestRatesAccrued?.at(5)?.rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: '4 Years and 6 Months',
    dataField: `interestRatesAccured`,
    formatter: (data, row) => (
      <div className="flex   justify-start items-center">
        <span className="font-medium">
          {row.interestRatesAccrued?.at(6)?.rate !== 0
            ? row.interestRatesAccrued?.at(6)?.rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: '5 Years',
    dataField: `interestRatesAccured`,
    formatter: (data, row) => (
      <div className="flex   justify-start items-center">
        <span className="font-medium">
          {row.interestRatesAccrued?.at(7)?.rate !== 0
            ? row.interestRatesAccrued?.at(7)?.rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: '5 Years and 6 Months',
    dataField: `interestRatesAccured`,
    formatter: (data, row) => (
      <div className="flex   justify-start items-center">
        <span className="font-medium">
          {row.interestRatesAccrued?.at(8)?.rate !== 0
            ? row.interestRatesAccrued?.at(8)?.rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: '6 Years',
    dataField: `interestRatesAccured`,
    formatter: (data, row) => (
      <div className="flex   justify-start items-center">
        <span className="font-medium">
          {row.interestRatesAccrued?.at(9)?.rate !== 0
            ? row.interestRatesAccrued?.at(9)?.rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: '6 Years and 6 Months',
    dataField: `interestRatesAccured`,
    formatter: (data, row) => (
      <div className="flex   justify-start items-center">
        <span className="font-medium">
          {row.interestRatesAccrued?.at(10)?.rate !== 0
            ? row.interestRatesAccrued?.at(10)?.rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: '7 Years',
    dataField: `interestRatesAccured`,
    formatter: (data, row) => (
      <div className="flex   justify-start items-center">
        <span className="font-medium">
          {row.interestRatesAccrued?.at(11)?.rate !== 0
            ? row.interestRatesAccrued?.at(11)?.rate
            : 'NA'}
        </span>
        ?
      </div>
    ),
  },
  {
    text: '7 Years and 3 Months',
    dataField: `interestRatesAccured`,
    formatter: (data, row) => (
      <div className="flex   justify-start items-center">
        <span className="font-medium">
          {row.interestRatesAccrued?.at(12)?.rate !== 0
            ? row.interestRatesAccrued?.at(12)?.rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: '7 Years and 6 Months',
    dataField: `interestRatesAccured`,
    formatter: (data, row) => (
      <div className="flex   justify-start items-center">
        <span className="font-medium">
          {row.interestRatesAccrued?.at(13)?.rate !== 0
            ? row.interestRatesAccrued?.at(13)?.rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: '7 Years and 8 Months',
    dataField: `interestRatesAccured`,
    formatter: (data, row) => (
      <div className="flex   justify-start items-center">
        <span className="font-medium">
          {row.interestRatesAccrued?.at(14)?.rate !== 0
            ? row.interestRatesAccrued?.at(14)?.rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: ' 8 Years',
    dataField: `interestRatesAccured`,
    formatter: (data, row) => (
      <div className="flex   justify-start items-center">
        <span className="font-medium">
          {row.interestRatesAccrued?.at(15)?.rate !== 0
            ? row.interestRatesAccrued?.at(15)?.rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: '8 Years and 4 Months',
    dataField: `interestRatesAccured`,
    formatter: (data, row) => (
      <div className="flex   justify-start items-center">
        <span className="font-medium">
          {row.interestRatesAccrued?.at(16)?.rate !== 0
            ? row.interestRatesAccrued?.at(16)?.rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: '8 Years and 6 Months',
    dataField: `interestRatesAccured`,
    formatter: (data, row) => (
      <div className="flex   justify-start items-center">
        <span className="font-medium">
          {row.interestRatesAccrued?.at(17)?.rate !== 0
            ? row.interestRatesAccrued?.at(17)?.rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: '8 Years and 7 Months',
    dataField: `interestRatesAccured`,
    formatter: (data, row) => (
      <div className="flex   justify-start items-center">
        <span className="font-medium">
          {row.interestRatesAccrued?.at(18)?.rate !== 0
            ? row.interestRatesAccrued?.at(18)?.rate
            : 'NA'}
        </span>
      </div>
    ),
  },
  {
    text: '9 Years',
    dataField: `interestRatesAccured`,
    formatter: (data, row) => (
      <div className="flex   justify-start items-center">
        <span className="font-medium">
          {row.interestRatesAccrued?.at(19)?.rate !== 0
            ? row.interestRatesAccrued?.at(19)?.rate
            : 'NA'}
        </span>
      </div>
    ),
  },
];
