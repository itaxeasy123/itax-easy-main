const { Icon } = require("@iconify/react");
export default function VerifyIndicator(props) {
    const {loading,verified}=props;
    if (loading) {
        return(
            <span className="spinner"></span>
        )
    }
    if (verified) {
        return(
            <span className="text-xs">
                <Icon
                    className=" text-green-600 w-4 h-4"
                    icon="lets-icons:check-fill"
                />
            </span>
        )
    }
    return (
        <span className="text-xs">
            <Icon
                className=" text-red-600 w-4 h-4"
                icon="gridicons:cross-circle"
            />
        </span>
    );
}
