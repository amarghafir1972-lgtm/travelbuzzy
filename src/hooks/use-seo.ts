import { useEffect } from "react";

export type SeoProps = {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
};

const SITE_NAME = "TravelBuzzy";
const DEFAULT_IMAGE = "https://travelbuzzy.com/images/bali.jpg";
const BASE_URL = "https://travelbuzzy.com";

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    el.setAttribute("data-seo-managed", "true");
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function removeManagedMeta() {
  document.querySelectorAll("meta[data-seo-managed]").forEach((el) => el.remove());
}

export function useSeo({ title, description, image, url, type = "website" }: SeoProps) {
  useEffect(() => {
    const fullTitle = `${title} — ${SITE_NAME}`;
    const resolvedImage = image
      ? image.startsWith("http") ? image : `${BASE_URL}${image}`
      : DEFAULT_IMAGE;
    const resolvedUrl = url ? `${BASE_URL}${url}` : BASE_URL;

    const prevTitle = document.title;
    document.title = fullTitle;

    // Standard meta
    setMeta("description", description);

    // Open Graph
    setMeta("og:type", type, "property");
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:image", resolvedImage, "property");
    setMeta("og:url", resolvedUrl, "property");
    setMeta("og:site_name", SITE_NAME, "property");

    // Twitter Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", resolvedImage);
    setMeta("twitter:site", "@travelbuzzy");

    return () => {
      document.title = prevTitle;
      removeManagedMeta();
    };
  }, [title, description, image, url, type]);
}
