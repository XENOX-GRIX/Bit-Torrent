import { EventEmitter } from 'events';

export class trackerItem {
  private peerListUpdatedEvent: EventEmitter;
  private address: string;

  constructor(address: string) {
    this.peerListUpdatedEvent = new EventEmitter();
    this.address = address;
  }

  public get Address(): string {
    return this.address;
  }

  public get PeerListUpdated(): EventEmitter {
    return this.peerListUpdatedEvent;
  }
}
