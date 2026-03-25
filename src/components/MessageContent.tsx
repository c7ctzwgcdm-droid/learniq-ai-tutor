import ReactMarkdown from "react-markdown";
import { MermaidDiagram } from "./MermaidDiagram";

interface Props {
  content: string;
}

export function MessageContent({ content }: Props) {
  return (
    <ReactMarkdown
      components={{
        code({ className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          const lang = match?.[1];
          const codeString = String(children).replace(/\n$/, "");

          if (lang === "mermaid") {
            return <MermaidDiagram chart={codeString} />;
          }

          if (lang) {
            return (
              <pre className="bg-muted text-muted-foreground text-xs p-3 rounded-lg overflow-x-auto my-2">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            );
          }

          return (
            <code className="bg-muted text-muted-foreground px-1.5 py-0.5 rounded text-xs" {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
