/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import Event from '@ioc:Adonis/Core/Event';
import User from "App/Models/User";

declare module '@ioc:Adonis/Core/Event' {
    interface EventsList {
      'login:phone': User,
    }
}

Event.onError((event, error, eventData) => {
    const eventError = {
        event: event,
        error: error,
        data: eventData
    };

    return eventError;
});
  
Event.on('login:phone', 'AuthListener.sendSms');