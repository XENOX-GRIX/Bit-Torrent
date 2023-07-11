import path from 'path';
import { bytesToString } from './utils';

export class torrentFileItem {
  public Path: string;
  public Size: number;
  public Offset?: number;

  constructor(){
    this.Path = path.resolve(__dirname); ;
    this.Size = 0; 
  }
  public get FormattedSize(): string {
    return bytesToString(this.Size);
  }
}
