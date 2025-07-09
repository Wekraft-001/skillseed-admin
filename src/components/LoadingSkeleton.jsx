import Skeleton from "react-loading-skeleton";

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 space-y-4">
    <div className="flex items-center gap-4">
      <Skeleton circle width={56} height={56} />
      <div className="flex-1">
        <Skeleton height={14} width="80%" />
        <Skeleton height={12} width="60%" />
      </div>
    </div>
    <Skeleton height={12} width="40%" />
    <div className="flex gap-3">
      <Skeleton circle width={40} height={40} />
      <Skeleton circle width={40} height={40} />
    </div>
  </div>
);

export default SkeletonCard;
