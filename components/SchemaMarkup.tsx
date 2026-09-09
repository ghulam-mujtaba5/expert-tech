import React from 'react';

interface SchemaMarkupProps {
  schema: Record<string, unknown> | Array<Record<string, unknown>>;
}

export default function SchemaMarkup({ schema }: SchemaMarkupProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 0),
      }}
    />
  );
}
