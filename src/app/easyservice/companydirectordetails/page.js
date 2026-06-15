import DirectorDetails from "@/components/EasyServices/MCA/DirectorDetails";

const index = () => {
    return <DirectorDetails />;
};

export default index;
export async function generateMetadata({ params }) {
    return {
        title: "company director details",
    };
}
