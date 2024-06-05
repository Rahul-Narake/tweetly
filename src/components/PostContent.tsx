'use client';

import { useState } from 'react';

export function PostContent({
  content,
  image,
  title,
}: {
  content?: string;
  image?: string;
  title?: string;
}) {
  const [postContent, setPostContent] = useState(content?.substring(0, 300));
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col justify-start">
        <p>
          {content && content?.length > 300
            ? postContent + ' ...'
            : postContent}
        </p>
        {content && content?.length > 300 && (
          <button
            className="bg-none text-blue-600"
            onClick={() => {
              setPostContent(content);
            }}
          >
            show more
          </button>
        )}
      </div>
      {image && (
        <div>
          <img src={image} alt="post image" />
        </div>
      )}
    </div>
  );
}
