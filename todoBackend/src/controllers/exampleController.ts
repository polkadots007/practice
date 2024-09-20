import { Request, Response } from 'express';

interface Example {
  id: number;
  name: string;
}

const examples: Example[] = [
  { id: 1, name: 'Example 1' },
  { id: 2, name: 'Example 2' },
];

export const getExamples = (req: Request, res: Response): void => {
  res.status(200).json(examples);
};

export const createExample = (req: Request, res: Response): void => {
  const newExample: Example = {
    id: examples.length + 1,
    name: req.body.name,
  };
  examples.push(newExample);
  res.status(201).json(newExample);
};
