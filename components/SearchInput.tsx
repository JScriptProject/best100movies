"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  //using the debounce so that server wait for 300ms before processing the request and it will not be on every keyStrock

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`/?${params.toString()}`);
  }, 300);

  return (
    <div className="relative w-full max-w-md mx-auto pt-10 mb-20">
      <div className="relative">
        <Field>
          <FieldLabel className="text-2xl text-center">What is in your mind ?</FieldLabel>

          <div className="relative">
            <Search className="absolute left-3 top-[50%] -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search movies (e.g. Batman)..."
              onChange={(e) => handleSearch(e.target.value)}
              defaultValue={searchParams.get("query")?.toString()} className="pl-10 "
            />
          </div>

          <FieldDescription>
            *We browse the movies across all resourcses
          </FieldDescription>
        </Field>
      </div>
    </div>
  );
}
