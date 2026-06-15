import CompanyDetails from "@/components/EasyServices/MCA/CompanyDetails";

const index = () => {
    return <CompanyDetails />;
};

export default index;
export async function generateMetadata({ params }) {
    return {
        title: "company details",
    };
}
