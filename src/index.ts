import Customer from "./domain/customer/entity/customer";
import EnviaConsoleLog1Handler from "./domain/customer/event/handler/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "./domain/customer/event/handler/envia-console-log-2.handler";
import EnviaConsoleLogHandler from "./domain/customer/event/handler/envia-console-log.handler";
import Address from "./domain/customer/value-object/address";
import { EventDispatcherInstance } from "./infrastructure/event/event-dispatcher-instance";

const eventDispatcher = EventDispatcherInstance.getInstance();
const enviaConsoleLogHandler = new EnviaConsoleLogHandler();
const enviaConsoleLog1Handler = new EnviaConsoleLog1Handler();
const enviaConsoleLog2Handler = new EnviaConsoleLog2Handler();

eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog1Handler);
eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog2Handler);

let customer = new Customer("1", "CustomerTeste");

eventDispatcher.register("CustomerUpdatedEvent", enviaConsoleLogHandler);

let updatedCustomer = customer.changeAddress(new Address("Street 1", 1, "11111", "City 1"));