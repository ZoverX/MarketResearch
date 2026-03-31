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

export const getEntryId = (entry: CollectionEntry<CollectionName>) => entry.id.replace(/\.md$/, "");

export const getEntryHref = (entry: CollectionEntry<CollectionName>) => {
  const id = getEntryId(entry);
  switch (entry.collection) {
    case "basics":
      return withBase(`/basics/${id}/`);
    case "methodologies":
      return withBase(`/methodologies/${id}/`);
    case "displayr":
      return withBase(`/displayr/${id}/`);
    case "sawtooth":
      return withBase(`/sawtooth/${id}/`);
    case "glossary":
      return withBase(`/glossary/${id}/`);
    default:
      return withBase("/");
  }
};
