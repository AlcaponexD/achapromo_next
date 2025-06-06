import { FaPercentage } from 'react-icons/fa';

export default function DiscountBadge({ percentage }) {
  if (!percentage || percentage <= 0) return null;

  return (
    <div className="z-10 absolute px-3 py-1.5 bg-light-primary dark:bg-dark-primary text-white left-0 top-0 text-sm font-bold shadow-md poppins transition-all-smooth hover:shadow-button flex items-center justify-center">
      <span className="mr-1">-{percentage.toFixed(0)}% OFF</span>
      <div className="absolute -right-3 h-full w-3 overflow-hidden top-0">
        <div className="bg-light-primary dark:bg-dark-primary h-full rotate-45 transform origin-top-left"></div>
      </div>
    </div>
  );
}