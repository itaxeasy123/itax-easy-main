import CheckPanAadhaarStatus from "@/components/EasyServices/IncomeTaxLinks/CheckPanAadhaarStatus";

const index = () => {
    return <CheckPanAadhaarStatus />;
};

export default index;
export async function generateMetadata({ params }) {
    return {
        title: "check pan aadhaar status",
    };
}
