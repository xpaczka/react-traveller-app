const DashboardPanel = ({ className, children }) => {
  return <div className={`overflow-auto ${className}`}>{children}</div>;
};

export default DashboardPanel;
