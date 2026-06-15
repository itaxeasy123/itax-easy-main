import ReactTable from '../ui/ReactTable';
import ExportPDF from './ExportPDF';
import { getGoldSilverRates } from '@/app/api/fetchData';
import Image from 'next/image';

const tableHeaders = {
  assessmentYear: 'Assessment year / Valuation date',
  stGoldRate24CPer10Grams: 'Standard Gold 24 Carats Rate for 10 grams (Rs.)',
  stSilverRateFor1Kg: 'Silver 999 Touch Rate of 1 Kg. (Rs.)',
};

const ornamentReductionRows = [
  {
    label:
      'Difference in value between 24 carats of standard gold and 22 carats of gold ornaments (gold ornaments are generally made of 22 carats of gold)',
    plainGold: '8.33%',
    otherGold: '8.33%',
  },
  {
    label: 'Soldering made of copper, silver, etc., used in making ornaments',
    plainGold: '2.5% to 5%',
    otherGold: '8.33%',
  },
  {
    label:
      'Shortage of gold in melting, mint charges payable to Government, expenditure on freight, insurance, etc., of sending gold ornaments to approved mint for conversion into standard gold bars',
    plainGold: '1.25%',
    otherGold: '1.25%',
  },
  {
    label: 'Margin of profit of the dealer when ornaments are sold in market',
    plainGold: '2%',
    otherGold: '2%',
  },
  {
    label: 'Total reduction',
    plainGold: '14.08% to 16.58%',
    otherGold: '19.91%',
    highlight: true,
  },
];

const conversionRows = [
  ['10 grams', '=', '0.857 tola', '1 tola', '=', '11.664 grams'],
  ['1 kilogram', '=', '85.734 tolas', '10 tola', '=', '116.638 grams'],
];

const formatRateData = (rows = []) => {
  if (!Array.isArray(rows)) return [];

  return rows.map((item, index) => ({
    id: item?.id ?? index + 1,
    assessmentYear: item?.assessmentYear ?? '-',
    stGoldRate24CPer10Grams: item?.stGoldRate24CPer10Grams ?? '-',
    stSilverRateFor1Kg: item?.stSilverRateFor1Kg ?? '-',
  }));
};

const StatCard = ({ title, value, subtitle }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
        {title}
      </p>
      <h3 className="mt-2 text-2xl font-bold text-slate-900">{value}</h3>
      {subtitle ? (
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      ) : null}
    </div>
  );
};

const SectionCard = ({ title, subtitle, children }) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-4 py-4 sm:px-6">
        <h2 className="text-lg font-bold text-slate-900 sm:text-xl">{title}</h2>
        {subtitle ? (
          <p className="mt-1 text-sm leading-6 text-slate-600">{subtitle}</p>
        ) : null}
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </section>
  );
};

const Goldsilverrate = async () => {
  const response = await getGoldSilverRates();
  const rateData = formatRateData(response);

  const latestRecord = rateData?.[0];
  const totalYears = rateData.length;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-sky-600 to-cyan-500 shadow-xl">
          <div className="relative px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-4">
            <div className="absolute right-0 top-0 hidden h-full w-1/3 opacity-10 md:block">
              <div className="h-full w-full bg-[radial-gradient(circle_at_top_right,_white,_transparent_60%)]" />
            </div>
            <div className="relative z-10 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur">
                  Gold & Silver Rate Reference
                </div>
                <h1 className="mt-1 text-lg font-extrabold tracking-tight text-white sm:text-lg lg:text-xl">
                  Gold & Silver Rate Table
                </h1>
              </div>
              <div className="flex flex-row gap-2 lg:justify-end">
                <div className="rounded-xl bg-white/10 px-3 py-1.5 text-white backdrop-blur">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-blue-100">
                    Latest Assessment Year
                  </p>
                  <p className="text-sm font-bold">
                    {latestRecord?.assessmentYear || '-'}
                  </p>
                </div>

                <div className="rounded-xl bg-white/10 px-3 py-1.5 text-white backdrop-blur">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-blue-100">
                    Total Records
                  </p>
                  <p className="text-sm font-bold">{totalYears}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Latest Gold Rate"
            value={latestRecord?.stGoldRate24CPer10Grams || '-'}
            subtitle="Per 10 grams"
          />
          <StatCard
            title="Latest Silver Rate"
            value={latestRecord?.stSilverRateFor1Kg || '-'}
            subtitle="Per 1 kilogram"
          />
          <StatCard
            title="Assessment Year"
            value={latestRecord?.assessmentYear || '-'}
            subtitle="Most recent available"
          />
          <StatCard
            title="Records Available"
            value={String(totalYears)}
            subtitle="Database driven list"
          />
        </div>

        <div className="mt-6 space-y-6">
          <SectionCard
            title="Rate Table"
            subtitle="This section is fully dynamic and renders database values directly."
          >
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-600">
                  Standard gold and silver rates arranged year-wise.
                </p>
              </div>

              <div className="w-full sm:w-auto">
                <div className="inline-flex w-full sm:w-auto justify-end">
                  <ExportPDF id="#mytable1" name="GoldSilverRate" />
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200">
              {rateData.length > 0 ? (
                <div className="overflow-x-auto">
                  <ReactTable
                    id="mytable1"
                    columns={tableHeaders}
                    data={rateData}
                  />
                </div>
              ) : (
                <div className="flex min-h-[240px] flex-col items-center justify-center gap-3 bg-slate-50 px-4 py-10 text-center">
                  <Image
                    src="/whiteLoader.svg"
                    alt="No data"
                    width={42}
                    height={42}
                    className="opacity-70"
                  />
                  <h3 className="text-lg font-semibold text-slate-900">
                    No rate data found
                  </h3>
                  <p className="max-w-md text-sm text-slate-500">
                    Gold and silver rate records are not available right now.
                  </p>
                </div>
              )}
            </div>
          </SectionCard>

          <SectionCard
            title="Notes & Valuation Guidance"
            subtitle="Static legal/reference guidance converted into dynamic mapped rows for cleaner maintainable UI."
          >
            <div className="space-y-6">
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:p-5">
                <h3 className="text-base font-bold text-amber-900 sm:text-lg">
                  Note 1
                </h3>
                <p className="mt-2 text-sm leading-7 text-amber-900/90">
                  Value of gold contained in gold ornaments should be reduced by
                  14 to 20 per cent of ruling rates of standard gold, as per the
                  practice prevalent in the bullion market. The amount of
                  reduction has to be worked out in the following manner.
                </p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <div className="overflow-x-auto">
                  <table className="min-w-[820px] w-full text-left">
                    <thead className="bg-slate-900 text-white">
                      <tr>
                        <th className="px-4 py-4 text-sm font-semibold sm:px-5">
                          Particulars
                        </th>
                        <th className="px-4 py-4 text-sm font-semibold sm:px-5">
                          Plain gold bangles and ornaments made of solid gold
                        </th>
                        <th className="px-4 py-4 text-sm font-semibold sm:px-5">
                          Other gold ornaments
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {ornamentReductionRows.map((row, index) => (
                        <tr
                          key={index}
                          className={`align-top ${
                            row.highlight
                              ? 'bg-blue-50'
                              : index % 2 === 0
                                ? 'bg-white'
                                : 'bg-slate-50'
                          }`}
                        >
                          <td className="border-t border-slate-200 px-4 py-4 text-sm leading-6 text-slate-700 sm:px-5">
                            {row.label}
                          </td>
                          <td className="border-t border-slate-200 px-4 py-4 text-sm font-semibold text-slate-900 sm:px-5">
                            {row.plainGold}
                          </td>
                          <td className="border-t border-slate-200 px-4 py-4 text-sm font-semibold text-slate-900 sm:px-5">
                            {row.otherGold}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                  <h3 className="text-base font-bold text-slate-900">Note 2</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    Silver wares, utensils, etc., is liable for wealth-tax.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                  <h3 className="text-base font-bold text-slate-900">Note 3</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    Conversion table is given below for quick practical
                    reference.
                  </p>
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard
            title="Conversion Table"
            subtitle="Responsive conversion reference table for tola and gram values."
          >
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <div className="overflow-x-auto">
                <table className="min-w-[700px] w-full">
                  <tbody>
                    {conversionRows.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className={
                          rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                        }
                      >
                        {row.map((cell, cellIndex) => (
                          <td
                            key={`${rowIndex}-${cellIndex}`}
                            className={`border-t border-slate-200 px-4 py-4 text-sm sm:px-5 ${
                              cell === '='
                                ? 'text-center font-bold text-slate-500'
                                : 'font-medium text-slate-800'
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-slate-900 px-4 py-4 text-center text-sm font-semibold text-white sm:px-6">
              [As amended by Finance Act, 2022]
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

export default Goldsilverrate;
