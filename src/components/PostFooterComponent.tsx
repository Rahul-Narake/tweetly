'use client';
export function PostFooterComponent({
  icon,
  onClick,
  value,
}: {
  icon: JSX.Element;
  onClick: () => void;
  value?: number;
}) {
  return (
    <div className="flex items-center cursor-pointer" onClick={onClick}>
      <span className="mr-[2px]">{icon}</span>
      {value && <span className="text-sm font-light">{value}</span>}
    </div>
  );
}
