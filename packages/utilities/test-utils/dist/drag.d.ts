declare function drag(element: HTMLElement, { to: inTo, delta, steps, duration, }: {
    to?: HTMLElement | {
        x: number;
        y: number;
    };
    delta?: {
        x: number;
        y: number;
    };
    steps?: number;
    duration?: number;
}): Promise<void>;

export { drag };
