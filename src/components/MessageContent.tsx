import ReactMarkdown from "react-markdown";
import { MermaidDiagram } from "./MermaidDiagram";

interface Props {
  content: string;
}

export function MessageContent({ content }: Props) {
  // Strip any leftover $...$ LaTeX that slipped through
  const cleaned = content.replace(/\$\$?([^$]+)\$\$?/g, "$1");

  return (
    <div className="message-content">
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
                <pre className="bg-muted text-muted-foreground text-[13px] p-3 rounded-lg overflow-x-auto my-3 leading-relaxed">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              );
            }

            return (
              <code className="bg-muted text-muted-foreground px-1.5 py-0.5 rounded text-[13px] font-mono" {...props}>
                {children}
              </code>
            );
          },
          p({ children }) {
            return <p className="mb-3 last:mb-0 leading-[1.7]">{children}</p>;
          },
          h3({ children }) {
            return <h3 className="text-[15px] font-semibold mt-5 mb-2 text-foreground">{children}</h3>;
          },
          h2({ children }) {
            return <h2 className="text-base font-semibold mt-5 mb-2 text-foreground">{children}</h2>;
          },
          strong({ children }) {
            return <strong className="font-semibold text-foreground">{children}</strong>;
          },
          ul({ children }) {
            return <ul className="mb-3 ml-4 space-y-1 list-disc marker:text-muted-foreground/50">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="mb-3 ml-4 space-y-1 list-decimal marker:text-muted-foreground/50">{children}</ol>;
          },
          li({ children }) {
            return <li className="leading-[1.7] pl-1">{children}</li>;
          },
          table({ children }) {
            return (
              <div className="overflow-x-auto my-4 rounded-lg border border-border">
                <table className="w-full text-[13px]">
                  {children}
                </table>
              </div>
            );
          },
          thead({ children }) {
            return <thead className="bg-muted/60 text-muted-foreground text-left">{children}</thead>;
          },
          th({ children }) {
            return <th className="px-3 py-2 font-medium border-b border-border">{children}</th>;
          },
          td({ children }) {
            return <td className="px-3 py-2 border-b border-border/50">{children}</td>;
          },
          tr({ children }) {
            return <tr className="even:bg-muted/20">{children}</tr>;
          },
          hr() {
            return <hr className="my-4 border-border/50" />;
          },
          blockquote({ children }) {
            return (
              <blockquote className="border-l-2 border-primary/40 pl-4 my-3 text-muted-foreground italic">
                {children}
              </blockquote>
            );
          },
        }}
      >
        {cleaned}
      </ReactMarkdown>
    </div>
  );
}
