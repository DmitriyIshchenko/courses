type Event = {
  message: string;
};

const processUserMap = (eventMap: Map<string, Event>) => {
  const errorEvent = eventMap.get("error");

  if (errorEvent) {
    const message = errorEvent.message;

    throw new Error(message);
  }
};
