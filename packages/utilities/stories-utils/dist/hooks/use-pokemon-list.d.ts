type Pokemon = {
    name: string;
    url: string;
};
type UsePokemonListProps = {
    /** Delay to wait before fetching more items */
    fetchDelay?: number;
};
declare function usePokemonList({ fetchDelay }?: UsePokemonListProps): {
    items: Pokemon[];
    hasMore: boolean;
    isLoading: boolean;
    onLoadMore: () => void;
};

export { Pokemon, UsePokemonListProps, usePokemonList };
