import Searchbypan from "@/components/EasyServices/GstLinks/Searchbypan";

const index = () => {
    return <Searchbypan />;
};

export default index;
export async function generateMetadata({ params }) {
    return {
        title: "search by pan",
    };
}
