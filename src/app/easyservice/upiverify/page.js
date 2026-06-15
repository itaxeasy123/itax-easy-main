import UpiVerify from "@/components/EasyServices/BankLinks/UpiVerify";

const index = () => {
    return <UpiVerify />;
};

export default index;
export async function generateMetadata({ params }) {
    return {
        title: "upi verify",
    };
}
