export class Counter {
    count: number;

    constructor(count: number) {
        this.count = count;
    }

    inc(): void {
        this.count += 1;
    }
    dec(): void {
        this.count -= 1;
    }

    get(): number {
        return this.count;
    }
    set(count: number): void {
        this.count = count;
    }

    get_and_inc(): number {
        const temp: number = this.count;
        this.inc();
        return temp;
    }
    inc_and_get(count: number): number {
        this.inc();
        return this.count;
    }
}
