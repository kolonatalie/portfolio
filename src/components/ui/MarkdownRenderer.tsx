import ReactMarkdown from 'react-markdown';
import clsx from 'clsx';


interface Props {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<Props> = ({ content, className }) => {
  return (
    <div className={clsx("markdown-body", className)}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};
export default MarkdownRenderer;