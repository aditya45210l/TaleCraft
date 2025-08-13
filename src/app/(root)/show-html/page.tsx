'use client';

import { fetchAndSanitizeHtml } from "@/lib/actions/FetchHtml";
import React, { useState, useEffect } from "react";

function StoryViewer({
  contentUrl = "bafkreiggm4cjn6ojqyyqiy63gavfxlyo2jeak4xxq5iu3juhi3d4apzxia",
}: {
  contentUrl: string;
}) {
  const [htmlContent, setHtmlContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!contentUrl) {
      setIsLoading(false);
      return;
    }

    const loadContent = async () => {
      try {
        const sanitizedHtml = await fetchAndSanitizeHtml(contentUrl);
        setHtmlContent(sanitizedHtml);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [contentUrl]);

  if (isLoading) {
    return <div>Loading story content...</div>;
  }

  return (
    <div className="story-container">
      {/* This prop is how you render raw HTML in React */}
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}

export default StoryViewer;
