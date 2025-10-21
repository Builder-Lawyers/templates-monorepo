export function isEditMode(Astro: any) {
    return Astro.url.searchParams.get("edit") === "1";
}