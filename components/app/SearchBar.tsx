"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function SearchBar({ initialQuery = "" }: { initialQuery?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      router.push(`/app/search?q=${encodeURIComponent(q)}`);
    } else {
      router.push("/app/search");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar" role="search" aria-label="Search services">
      <input
        type="search"
        className="search-bar-input"
        placeholder="Search by suburb, service, or keyword..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search services"
      />
      <button type="submit" className="search-bar-btn" aria-label="Search">
        Search
      </button>
    </form>
  );
}