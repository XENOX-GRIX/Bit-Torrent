import { Counter } from "../Utils/counter";
import { Bencode } from "./Bencode";
import { BencodeItem } from "./BencodeItem";


export class BencodeList extends Array<BencodeItem> implements BencodeItem {
    constructor(...items: BencodeItem[]) {
        super(...items);
        Object.setPrototypeOf(this, BencodeList.prototype);
    }

    encode(): string {
        const encodedList: string[] = new Array();
        encodedList.push("l");

        for (const listElement of this) encodedList.push(listElement.encode());

        encodedList.push("e");

        return encodedList.join("");
    }
    static decode(str: string, c: Counter): BencodeList | undefined {
        if (str[c.get()] == "l") {
            c.inc();
        }

        const listItems: BencodeList = new BencodeList();

        while (str[c.get()] != "e" && str.length > c.get()) {
            const listEntry = Bencode.parseItem(str, c);

            if (listEntry == undefined)
                throw new Error("BencodeList: List entry invalid");
            listItems.push(listEntry);
        }
        c.inc();
        return listItems;
    }
}
