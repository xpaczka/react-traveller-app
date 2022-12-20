const DashboardPanel = ({ className, children }) => {
  return <div className={`h-[calc(100%-70px)] overflow-auto ${className}`}>{children}</div>;
};

export default DashboardPanel;
