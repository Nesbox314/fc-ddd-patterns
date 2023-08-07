import EventDispatcher from "../../domain/@shared/event/event-dispatcher";

export class EventDispatcherInstance {

    private static eventDispatcherInstance = new EventDispatcher();

    constructor() 
    {
        if(!EventDispatcherInstance.eventDispatcherInstance)
        {
            EventDispatcherInstance.eventDispatcherInstance = new EventDispatcher();
        }
    }
    
    public static getInstance()
    {
        return EventDispatcherInstance.eventDispatcherInstance;
    }
}