import SearchTan from "@/components/EasyServices/IncomeTaxLinks/SearchTan";

const index = () => {
    return <SearchTan />;
};

export default index;
export async function generateMetadata({ params }) {
    return {
        title: "search tan",
    };
}
