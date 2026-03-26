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

          if (lang === "svg") {
            return (
              <div
                className="my-3 flex justify-center [&>svg]:max-w-full [&>svg]:h-auto"
                dangerouslySetInnerHTML={{ __html: codeString }}
              />
            );
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
        table({ children }) {
          return (
            <div className="overflow-x-auto my-3">
              <table className="w-full text-xs border-collapse border border-border rounded-lg">
                {children}
              </table>
            </div>
          );
        },
        thead({ children }) {
          return <thead className="bg-muted/50 font-semibold">{children}</thead>;
        },
        th({ children }) {
          return <th className="border border-border px-3 py-1.5 text-left text-muted-foreground">{children}</th>;
        },
        td({ children }) {
          return <td className="border border-border px-3 py-1.5">{children}</td>;
        },
        tr({ children }) {
          return <tr className="even:bg-muted/20">{children}</tr>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
