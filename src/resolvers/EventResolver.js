const Event = require("../models/Event");

const EventResolver = {
  Query: {

    getEvents: async () => {
      return await Event.findAll();
    },

    getEvent: async (_,{ event_id }) => {
      foundEvent = await Event.findByPk(event_id);
      if (!foundEvent) { throw new Error("Event not found"); }
      return foundEvent;
    },

  },

  Mutation: {
    createEvent: async (_,{ name, description, state, city, date_start, date_end }) => {
      const existsEvent = await Event.findOne({ where: { name } });
      if ( existsEvent ) {
        throw new Error("Event 'NAME' already used");
      }

      const createdEvent = await Event.create({
        name, description, state, city,
        date_start, date_end
      });
      return await Event.findByPk(createdEvent.id);
    },

    updateEvent: async (_,{ event_id, name, description, state, city, date_start, date_end }) => {      
      foundEvent = await Event.findByPk(event_id);
      if (!foundEvent) { throw new Error("Event not found"); }

      if (foundEvent.name != name) {
        const existsEvent = await Event.findOne({ where: { name } });
        if ( existsEvent ) {
          throw new Error("Event 'NAME' already used");
        }
      }      

      const updatedEvent = await Event.update({
        name, description, state, city,
        date_start, date_end
      },{
        where: {id:event_id}
      })
      if (!updatedEvent) { throw new Error("Unexpected error"); }
      return await Event.findByPk(event_id);
    },

    deleteEvent: async (_,{ event_id }) => {      
      foundEvent = await Event.findByPk(event_id);
      if (!foundEvent) { throw new Error("Event not found"); }

      const deleteEvent = await Event.destroy({ where: { id:event_id } });

      if (!deleteEvent) { throw new Error("Unexpected error"); }
      return true;
    },
  }

};

module.exports = {
  EventResolver,
}