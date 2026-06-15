import VerifyBankDetails from "@/components/EasyServices/BankLinks/VerifyBankDetails";

const index = () => {
    return <VerifyBankDetails />;
};

export default index;
export async function generateMetadata({ params }) {
    return {
        title: "verify bank details",
    };
}
