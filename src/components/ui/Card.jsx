const Card = props => {
  const cardClasses = `rounded-[8px] shadow-[0_0_6px_rgba(0,0,0,0.5)] ${props.className}`;

  return <div className={cardClasses}>{props.children}</div>;
};

export default Card;
