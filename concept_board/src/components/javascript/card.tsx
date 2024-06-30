interface CardContentProps {
  name: string;
}

const CardContent: React.FC<CardContentProps> = ({ name: concept }) => {
  return <div>{concept}</div>;
};

export default CardContent;
