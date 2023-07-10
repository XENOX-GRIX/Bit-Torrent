import { Counter } from "../Utils/counter";
import { BencodeDictionary } from "./BencodeDictionary";
import { BencodeInteger } from "./BencodeInteger";
import { BencodeList } from "./BencodeList";
import { BencodeString } from "./BencodeString";
import { BencodeItem } from "./BencodeItem";

export class Bencode {
    static parseItem(str: string, c: Counter): BencodeItem | undefined {
        const currentChar: string = str[c.get()];

        if (currentChar >= "0" && currentChar <= "9")
            return BencodeString.decode(str, c);
        else if (currentChar == "i") return BencodeInteger.decode(str, c);
        else if (currentChar == "l") return BencodeList.decode(str, c);
        else if (currentChar == "d") return BencodeDictionary.decode(str, c);
        else throw new Error("Bencode: No appropriate action found");
    }

    static parseAll(str: string): { list: BencodeItem[]; status: boolean } {
        try {
            const e: Counter = new Counter(0);

            const items: BencodeItem[] = [];

            while (e.get() < str.length) {
                const currentItem: BencodeItem | undefined = this.parseItem(
                    str,
                    e
                );

                if (currentItem == undefined) {
                    throw new Error("Bencode: Item was undefined");
                } else {
                    items.push(currentItem);
                }
            }
            return { list: items, status: false };
        } catch (err) {
            console.error(err);
            return { list: [], status: false };
        }
    }
}
