import EventInterface from "../../@shared/event/event.interface";
import Address from "../value-object/address";

export default class CustomerUpdatedEvent implements EventInterface {
    dataTimeOccurred: Date;
    eventData: any;
  
    constructor(id: String, name: String, address: Address) {
      this.dataTimeOccurred = new Date();
      this.eventData = {id: id, name: name, address: address};
    }
}