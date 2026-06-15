import MergePdf from "@/components/EasyServices/Converter/MergePdf";

const index = () => {
    return <MergePdf />;
};

export default index;
export async function generateMetadata({ params }) {
    return {
        title: "merge pdf",
    };
}
