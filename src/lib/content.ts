import { getCollection, type CollectionEntry } from "astro:content";

type CollectionName = "basics" | "methodologies" | "displayr" | "sawtooth" | "glossary";

export const collectionOrder = <T extends { data: { order: number; title: string } }>(items: T[]) =>
  items.sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));

export const getOrderedCollection = async <T extends CollectionName>(name: T) =>
  collectionOrder(await getCollection(name));

export const withBase = (path: string) => {
  const normalizedBase = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const normalizedPath = path.replace(/^\/+/, "");
  const resolved = new URL(normalizedPath || ".", `https://example.com${normalizedBase}`);
  return resolved.pathname;
};

export const getEntryHref = (entry: CollectionEntry<CollectionName>) => {
  switch (entry.collection) {
    case "basics":
      return withBase(`/basics/${entry.slug}/`);
    case "methodologies":
      return withBase(`/methodologies/${entry.slug}/`);
    case "displayr":
      return withBase(`/displayr/${entry.slug}/`);
    case "sawtooth":
      return withBase(`/sawtooth/${entry.slug}/`);
    case "glossary":
      return withBase(`/glossary/${entry.slug}/`);
    default:
      return withBase("/");
  }
};
