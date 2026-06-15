
const InputStyles = {

  container: `w-full `,

  // formWrapper: `
  //   max-w-4xl w-full mx-auto bg-white/70 backdrop-blur-lg shadow-2xl 
  //   rounded-2xl py-4 sm:px-10 space-y-2 transition-all duration-300`,

//   hero page
       hero_div:`mx-auto max-w-7xl grid lg:grid-cols-2 items-center gap-y-8 my-8`,
       hero_div2:`lg:order-2 mx-auto`,
       hero_div3:`lg:w-full lg:pl-16 lg:mx-0 mt-5 lg:mt-0 text-center lg:text-left`,
       hero_h1:`text-lg lg:text-[26px] font-bold text-slate-800 leading-snug`,
       hero_p:`font-semibold text-slate-800 mt-3`,
       hero_button:`my-4 font-medium py-[10px] px-6`,


// Our services page

service_section:`mx-auto max-w-7xl px-4 lg:px-8 py-6`,
service_H2:`justify-center text-center text-xl lg:text-[26px] font-bold mb-10 relative flex inline-block text-gray-800`,
service_span:`absolute left-1/2 -bottom-4 -translate-x-1/2 h-[5px] w-40 rounded-full bg-gradient-to-r from-blue-500 to-blue-800`,
service_ul:`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10`,
service_li:`group relative overflow-hidden rounded-2xl bg-white border border-blue-200
              shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`,
 service_div:`absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-blue-300 to-white`,             
service_card_header:`relative z-10 bg-gradient-to-r from-blue-600 to-blue-700 py-2 text-center`,
service_h4:`text-sm font-semibold tracking-wide text-white`,
service_cardcontent:`relative z-10 flex flex-col divide-y divide-blue-200 px-6 py-5`,
service_link:`group/item flex items-center justify-between py-3 text-sm font-medium
                      transition-all duration-200`,
service_item_link:`text-blue-700 hover:text-blue-900`,
service_item_dot:`text-blue-500 pointer-events-none`,
service_label:`flex items-center gap-2`,
service_label_span:`h-1.5 w-1.5 rounded-full bg-blue-500`,
service_label_icon:`text-lg text-blue-400 opacity-0 group-hover/item:opacity-100 transition`,
service_Upcoming:`rounded-full border border-blue-200 bg-blue-50 px-2.5 py-[2px]
                        text-[10px] font-semibold text-blue-500`,

   // home page form styles
   home_loading:`fixed h-screen w-screen bg-white flex items-center justify-center`,
   home_container:`max-w-screen-2xl p-5 mx-auto`,
   home_ul:`my-4 px-3 py-2 text-sm mx-auto gap-4 flex flex-row justify-center overflow-hidden border border-blue-200 bg-blue-50 backdrop-blur-md md:rounded-lg shadow-sm rounded-md`,                   
   home_HoveringNavCard:`flex text-slate-900 items-center justify-center w-2/4 font-semibold text-center cursor-pointer transition-transform-all transform transition-colors duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white hover:shadow-md hover:scale-105 rounded-md`,
  


   formWrapper: `
  max-w-4xl w-full mx-auto 
  bg-gradient-to-r from-blue-100/30 via-white-100/30 to-blue-400/30
  backdrop-blur-xl shadow-2xl rounded-2xl 
  py-4 sm:px-10 space-y-2 
  border border-white/20
  transition-all duration-300
`
,

  title: `
     text-[14px] sm:text-[14px] font-bold text-center text-blue-900`,
  gridLayout: `grid grid-cols-1 md:grid-cols-2 gap-4`,

  label: `
    block 
    uppercase
    tracking-wide
    text-blue-700
    text-xs
    font-bold,
      ml-2`,
   input: `
    bg-gray-100
    appearance-none 
    border
    border-gray-400 
    rounded 
    w-full
    py-1
    px-2
    text-gray-700 
    leading-tight 
    focus:outline-none 
    focus:bg-white 
    focus:border-blue-600
  `,

   selectInput: `
    block 
    w-full 
    bg-gray-100 
    border 
    border-gray-300 
    text-gray-700
    py-1
    px-4 
    pr-8 
    rounded 
    leading-tight 
    focus:outline-none 
    focus:bg-white 
    focus:border-blue-600
   `,
   error_border: `
    text-red-600
    border-red-600
    focus:border-red-600
   `,
  error_msg: `
    text-red-500
    text-xs
    italic
  `,
  submitBtn: `
    bg-gradient-to-r from-blue-500 to-blue-700 
    text-white px-10 py-3 rounded-lg font-semibold text-sm 
    shadow-md hover:shadow-xl transition-transform 
    hover:scale-105 active:scale-95 disabled:opacity-50
   `,
   sectionTitle: `
    text-xl 
    font-semibold 
    text-blue-800 
    mb-4 
    flex 
    items-center 
    gap-2 
    border-b 
    pb-2
    mr-4
   `,
  fieldArrayWrapper: `
    relative 
    mb-6 
    grid 
    grid-cols-1 
    md:grid-cols-4 
    gap-5 
    bg-blue-50 
    p-4 
    rounded-xl
  `,
  removeBtn: `
    absolute 
    -top-3 
    right-3 
    text-red-600 
    font-bold 
    text-lg
  `,

  addBtn: `
    text-blue-700 
    font-medium 
    hover:underline 
    mb-6
  `,

  // tds file
  containerWrapper: `mx-auto max-w-5xl w-full px-1 pb-2 md:p-8 bg-white shadow-xl rounded-xl border border-blue-100`,
  table: `overflow-x-auto rounded-lg shadow border border-gray-200`,
  tableHeader: `bg-blue-100 text-blue-800 text-[12px] uppercase`,
  tableRow: `hover:bg-blue-50`,

  card: `
    flex flex-col justify-between bg-gradient-to-br from-blue-50 to-white 
    p-6 rounded-lg border border-blue-100 shadow hover:shadow-lg transition-all duration-300
  `,
  cardTitle: `font-semibold text-blue-900 mb-2`,
  cardDesc: `text-sm text-gray-700 mb-6`,

  tdstitle: `text-[16px] font-bold text-blue-900 mb-4 text-center border-b pb-2`,

  // preview file

  sectionContainer: `
    mx-auto max-w-7xl p-2
  `,
  sectionBox: `
    [&>div]:p-2 divide-y-2 border border-gray-400 rounded-md
  `,
  previewSection: `
    flex justify-between items-start md:items-center gap-4 flex-col md:flex-row
  `,
  previewTitle: `
    text-md font-medium tracking-tighter
  `,
  previewDesc: `
    text-xs text-neutral-700
  `,
  previewRight: `
    grid grid-rows-2 text-sm text-right
  `,
  modifyLink: `
    text-blue-500 text-xs hover:underline
  `,
  selftaxbutton: `
bg-gradient-to-r from-blue-500 to-blue-700 
    text-white px-10 py-3 rounded-lg font-semibold text-sm 
    shadow-md hover:shadow-xl transition-transform 
    hover:scale-105 active:scale-95 disabled:opacity-50
`,

  overviewCard: 'rounded-xl border-l-4 p-4 shadow-sm',
  sectionTitle: 'text-base sm:text-lg font-semibold text-blue-800',
  sectionTitleRight: 'text-blue-800 font-medium',

  overviewColors: {
    total: 'border-blue-500 bg-blue-50 text-blue-800',
    unpaid: 'border-yellow-500 bg-yellow-50 text-yellow-800',
    overdue: 'border-red-500 bg-red-50 text-red-800',
    upcoming: 'border-green-500 bg-green-50 text-green-800',
  },

  statTitle: 'text-sm font-semibold mb-1',
  statValue: 'text-2xl font-bold',

  creatBtn: `
     bg-gradient-to-r from-blue-500 to-blue-700 text-white px-10 py-3 rounded-lg font-semibold text-sm 
    shadow-md hover:shadow-xl transition-transform 
    hover:scale-105 active:scale-95 disabled:opacity-50
`,
  // Invoice Table Section Styles
  invoiceTableTitle: `
  text-2xl 
  sm:text-3xl 
  font-bold 
  text-blue-800 
  tracking-tight
`,
  invoiceCreateBtn: `
  bg-gradient-to-r 
  from-blue-500 
  to-blue-700 
  text-white 
  px-4 
  py-2 
  rounded-md 
  font-semibold 
  text-sm 
  shadow-sm 
  hover:shadow-md 
  hover:scale-[1.03] 
  active:scale-95 
  transition-all 
  duration-150
`,

  invoiceFormGrid: `
  w-full 
  bg-white 
  rounded-lg 
  shadow 
  border 
  px-2
  py-2
  grid 
  gap-4 
  grid-cols-1 
  sm:grid-cols-2 
  md:grid-cols-4 
  items-end
`,
  invoiceSearchBtn: `
  bg-gradient-to-r 
  from-blue-500 
  to-blue-700 
  text-white 
  px-4 
  py-2 
  rounded-md 
  font-semibold 
  text-sm 
  shadow-sm 
  hover:shadow-md 
  hover:scale-[1.03] 
  active:scale-95 
  transition-all 
  duration-150
  flex
  items-center 
  justify-center 
`,

  invoiceTableWrapper: `
    border 
    rounded-lg 
    overflow-x-auto 
    bg-white 
    shadow-sm
  `,


  // form16component

  form16table: `mx-auto w-full max-w-3xl px-6 sm:px-10 py-8
    bg-blue-50 border border-blue-200
    shadow-xl rounded-2xl
    flex flex-col gap-6
    transition-all duration-300
    hover:shadow-2xl hover:bg-blue-100`,

  form16tableunder: `
        grid grid-cols-3 gap-4 p-4
         bg-blue-50 rounded-xl
         outline outline-2 outline-blue-300
         shadow-md hover:shadow-lg
         transition-all duration-300`,

  form16ErrorSms:
    `absolute left-full w-full mx-1 top-3 text-red-600`,

  // section80Deduction  --

  section80Deduction: `mx-auto w-full max-w-4xl px-6 py-2 sm:px-10
    bg-gradient-to-r from-blue-50 via-white to-blue-50
    rounded-2xl shadow-xl 
    border border-blue-200
    transition-all duration-300
    hover:shadow-2xl hover:scale-[1.01]`,

  section80Deductiontitle: `text-[16px] sm:text-[16px] font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-2 inline-block transition-all duration-300`,

  section80DeductionP: `text-base font-medium text-gray-700 bg-blue-50 border-l-4 border-blue-400 pl-4 pr-2 py-2 rounded-md shadow-sm mb-5`,

  section80Deductioninput: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 p-2 sm:p-3`,

  section80TTA: `text-base sm:text-lg font-bold text-gray-800 border-b border-blue-300 pb-1 mb-2 mt-10 inline-block transition-all duration-300`,

  section80details: `text-lg sm:text-xl font-semibold text-gray-900 border-b border-blue-300 pb-2 mb-5 mt-8 inline-block transition-all duration-300`,


  // Reportsection

  Reportsection: `mt-2 w-full px-4 py-5 sm:px-6
  bg-white
  rounded-xl shadow-sm
  border border-slate-200`,

  Reporttitle: `text-xl sm:text-1xl font-bold text-gray-800 pb-2 mb-5 inline-block transition-all duration-300 leading-relaxed`,

  // insurance 

  insurancecontainer:
    "flex flex-col h-full min-h-[380px] justify-between bg-white text-gray-800 rounded-xl p-6 shadow-inner hover:shadow-2xl transform hover:-translate-y-2 transition-transform duration-300 ease-in-out",
  insurancetitle: "text-xl sm:text-2xl font-bold text-gray-800 pb-2 mb-5 inline-block transition-all duration-300",
  insurancedescription: "text-base text-gray-800 leading-relaxed",
  insuranceWrapper: `bg-gradient-to-br from-blue-100 via-white to-blue-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8`,
  insuranceGrid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto`,

  // Bajab form

  bajajcards: `grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto items-stretch`,
  bajajleftcard: `relative bg-white rounded-3xl p-10 flex flex-col items-center justify-center text-center space-y-6 shadow-xl ring-2 border-2 border-blue-300 shadow-md ring-blue-100 transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:ring-blue-200 min-h-[500px] h-full`,
  topleftimage: `flex gap-3 items-center justify-center p-3 bg-red-50 rounded-lg shadow-sm hover:shadow-md transition-all`,
  bajajh2: `text-3xl font-bold text-red-600 tracking-wide`,
  bajajrightcard: `bg-white rounded-3xl shadow-xl ring-2 border-2 border-blue-300 shadow-md ring-blue-100 p-6 pt-12 sm:p-10 transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:ring-blue-200 min-h-[500px] h-full flex flex-col justify-center`,

  // Search GST number

  SearchGSTbase: `lg:col-span-2 bg-gradient-to-r from-blue-100 to-blue-50 p-4 rounded-lg`,
};

export { InputStyles };
