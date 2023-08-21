import { Field, Text } from '@sitecore-jss/sitecore-jss-nextjs';

export interface HeadingElementProps {
  text?: Field<string>;
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  className?: string;
}

export default function Heading(props: HeadingElementProps) {
  const { text, level, className } = props;
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag className={className}>
      <Text field={text} />
    </Tag>
  );
}
