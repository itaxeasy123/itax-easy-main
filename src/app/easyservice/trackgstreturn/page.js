import Trackgstreturn from "@/components/EasyServices/GstLinks/Trackgstreturn";

const index = () => {
    return <Trackgstreturn />;
};

export default index;
export async function generateMetadata({ params }) {
    return {
        title: "track gst return",
    };
}
