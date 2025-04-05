// components/MarkdownContent.js
import React from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import ReactMarkdown from "react-markdown";

export default function MarkdownContent({ markdownText }) {
  return (
    <article className="prose prose-lg text-left dark:prose-invert">
      {typeof markdownText === "string" ? (
        <ReactMarkdown>{markdownText}</ReactMarkdown>
      ) : (
        <TinaMarkdown content={markdownText} />
      )}
    </article>
  );
}
