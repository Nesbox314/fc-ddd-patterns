import { EventDispatcherInstance } from "../../../infrastructure/event/event-dispatcher-instance";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import Customer from "../entity/customer";
import Address from "../value-object/address";
import CustomerCreatedEvent from "./customer-created.event";
import CustomerUpdatedEvent from "./customer-updated.event";
import EnviaConsoleLog1Handler from "./handler/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "./handler/envia-console-log-2.handler";
import EnviaConsoleLogHandler from "./handler/envia-console-log.handler";

describe("Customer events tests", () => {

  it("should notify all customer created event handlers", () => {
    const eventDispatcher = EventDispatcherInstance.getInstance();
    const enviaConsoleLog1Handler = new EnviaConsoleLog1Handler();
    const enviaConsoleLog2Handler = new EnviaConsoleLog2Handler();

    const spyEventHandler1 = jest.spyOn(enviaConsoleLog1Handler, "handle");
    const spyEventHandler2 = jest.spyOn(enviaConsoleLog2Handler, "handle");

    eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog1Handler);
    eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog2Handler);

    new Customer("1", "Customer 1");

    const customerCreatedEvent = new CustomerCreatedEvent({});
    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });

  it("should notify all customer updated event handlers", () => {
    const eventDispatcher = EventDispatcherInstance.getInstance();
    const enviaConsoleLogHandler = new EnviaConsoleLogHandler();

    const spyEventHandler = jest.spyOn(enviaConsoleLogHandler, "handle");

    eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLogHandler);

    let customer = new Customer("1", "Customer 1");
    customer.changeAddress(new Address("Street 1", 1, "1", "City 1"));

    const customerCreatedEvent = new CustomerUpdatedEvent(customer.id, customer.name, customer.Address);
    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
