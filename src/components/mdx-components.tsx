import type { ReactNode, HTMLAttributes } from 'react';

export const mdxComponents = {
  h1: ({ children, ...props }: { children?: ReactNode } & HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 mt-8 text-foreground" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: { children?: ReactNode } & HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-4 mt-10 text-foreground" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: { children?: ReactNode } & HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-3 mt-8 text-foreground" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: { children?: ReactNode } & HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-2 mt-6 text-foreground" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }: { children?: ReactNode } & HTMLAttributes<HTMLParagraphElement>) => (
    <p className="leading-7 not-first:mt-6 text-foreground" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: { children?: ReactNode } & HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-foreground" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: { children?: ReactNode } & HTMLAttributes<HTMLOListElement>) => (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2 text-foreground" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: { children?: ReactNode } & HTMLAttributes<HTMLLIElement>) => (
    <li className="text-foreground" {...props}>
      {children}
    </li>
  ),
  code: ({ children, className, ...props }: { children?: ReactNode; className?: string } & HTMLAttributes<HTMLElement>) => {
    const isInline = !className;
    
    if (isInline) {
      return (
        <code
          className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-foreground in-[h1]:text-4xl in-[h2]:text-3xl in-[h3]:text-2xl in-[h4]:text-xl"
          {...props}
        >
          {children}
        </code>
      );
    }
    
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }: { children?: ReactNode } & HTMLAttributes<HTMLPreElement>) => (
    <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-black p-4" {...props}>
      {children}
    </pre>
  ),
  blockquote: ({ children, ...props }: { children?: ReactNode } & HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="mt-6 border-l-2 pl-6 italic text-muted-foreground"
      {...props}
    >
      {children}
    </blockquote>
  ),
  table: ({ children, ...props }: { children?: ReactNode } & HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: { children?: ReactNode } & HTMLAttributes<HTMLTableSectionElement>) => (
    <thead {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }: { children?: ReactNode } & HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody {...props}>
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }: { children?: ReactNode } & HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="m-0 border-t p-0 even:bg-muted" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }: { children?: ReactNode } & HTMLAttributes<HTMLTableCellElement>) => (
    <th className="border px-4 py-2 text-left font-bold [[align=center]]:text-center [[align=right]]:text-right" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: { children?: ReactNode } & HTMLAttributes<HTMLTableCellElement>) => (
    <td className="border px-4 py-2 text-left [[align=center]]:text-center [[align=right]]:text-right" {...props}>
      {children}
    </td>
  ),
  a: ({ children, ...props }: { children?: ReactNode } & HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  ),
  hr: (props: HTMLAttributes<HTMLHRElement>) => <hr className="my-8 border-border" {...props} />,
  strong: ({ children, ...props }: { children?: ReactNode } & HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold text-foreground" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: { children?: ReactNode } & HTMLAttributes<HTMLElement>) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),
};
