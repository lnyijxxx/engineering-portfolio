import { buildSearchIndex } from "@/lib/search-index";
import { SearchClient } from "@/components/SearchClient";

export default function SearchPage() {
  const docs = buildSearchIndex();

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="font-display text-3xl font-medium text-text-primary mb-8">
        Search
      </h1>
      <SearchClient docs={docs} />
    </div>
  );
}
