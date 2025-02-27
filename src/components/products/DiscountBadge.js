export default function DiscountBadge({ percentage }) {
  if (!percentage || percentage <= 0) return null;

  return (
    <div className="absolute px-2 py-1 bg-dark-primary text-white rounded-br-xl left-0 top-0 text-sm font-semibold shadow-sm">
      {-percentage.toFixed(2)}% OFF
    </div>
  );
}