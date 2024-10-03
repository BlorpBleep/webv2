type Status = "loaded" | "error";
declare function mockImage(): {
    simulate(value: Status): void;
    restore(): void;
};
declare namespace mockImage {
    var restore: () => void;
    var DELAY: number;
}

export { mockImage };
