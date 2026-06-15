import PIncodebyCity from "@/components/EasyServices/PostOffice/PIncodebyCity";

const index = () => {
    return <PIncodebyCity />;
};

export default index;
export async function generateMetadata({ params }) {
    return {
        title: "pin code by city",
    };
}
