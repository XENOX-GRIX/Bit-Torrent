import { Counter } from "../Utils/counter";
import { BencodeItem } from "./BencodeItem";

export class BencodeString extends String implements BencodeItem {
    constructor(value: string) {
        super(value);
        Object.setPrototypeOf(this, BencodeString.prototype);
    }
    encode(): string {
        return `${this.length}:${this}`;
    }
    static decode(str: string, c: Counter): BencodeString | undefined {
        const colonIndex: number = str.indexOf(":", c.get());

        if (colonIndex != -1) {
            const lenghtOfString: number = Number(
                str.substring(c.get(), colonIndex)
            );
            if (Number.isNaN(lenghtOfString))
                throw new Error("BencodeString: Length was invalid");
            const startingIndex: number = colonIndex + 1;
            const endingIndex: number = startingIndex + lenghtOfString;

            c.set(endingIndex);
            return new BencodeString(str.substring(startingIndex, endingIndex));
        } else {
            throw new Error("BencodeString: colon not present");
        }
    }
}
