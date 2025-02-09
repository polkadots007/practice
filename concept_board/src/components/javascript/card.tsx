import { JSConcepts } from './concepts';

interface CardContentProps {
  name: keyof typeof JSConcepts;
}

interface DynamicComponentProps {
  componentName: keyof typeof JSConcepts;
}

const DynamicComponent: React.FC<DynamicComponentProps> = ({ componentName }) => {
  const SelectedComponent = JSConcepts[componentName];
  return SelectedComponent ? <SelectedComponent /> : <div>Component not found</div>;
};


const CardContent: React.FC<CardContentProps> = ({ name: concept }) => {
  return <DynamicComponent componentName={concept} />
};

export default CardContent;
