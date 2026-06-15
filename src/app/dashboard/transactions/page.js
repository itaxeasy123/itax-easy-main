import Transactions_Admin from "@/components/pagesComponents/dashboard/admin/Transactions/Transactions_Admin";
import SuperAdminTransactionHistory from "@/components/pagesComponents/dashboard/superAdmin/transactions/Transactions";
import TransactionHistory from "@/components/pagesComponents/dashboard/TransactionHistory/TransactionHistory";
import { cookies } from "next/headers";
const page = () => {
  const cookieStore = cookies();
  const currentUser = cookieStore.get("currentUser") || "";
  const { userType } = JSON.parse(currentUser.value || "{}");



    switch(userType) {
     
    
    // case "admin":   return <Transactions_Admin/>;
    case "admin": return <Transactions_Admin/>;
    case "superadmin": return <SuperAdminTransactionHistory />;
    default: return <TransactionHistory />;
  }
};

export default page;



