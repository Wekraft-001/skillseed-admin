import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const SkeletonCard = () => (
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

export const SkeletonList = () => (
  <tr className="border-b border-gray-100 hover:bg-gray-50">
    <td className="px-6 py-4">
      <div className="flex items-center space-x-3">
        <Skeleton circle width={40} height={40} />
        <div>
          <Skeleton height={14} width={120} />
          <Skeleton height={12} width={100} />
        </div>
      </div>
    </td>
    <td className="px-6 py-4">
      <Skeleton width={80} height={20} />
    </td>
    <td className="px-6 py-4">
      <Skeleton width={60} height={20} />
    </td>
  </tr>
);
