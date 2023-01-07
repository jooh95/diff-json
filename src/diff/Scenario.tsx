export default class Scenario {
    takes: Take[];
    events?: Event[];

    constructor(jsonString: string) {
        const scenario : Scenario = JSON.parse(jsonString) as Scenario;

        let takes = scenario.takes;
        let events = scenario.events;

        takes = this.removeTakeId(takes);
        this.sortTakes(takes);

        this.replaceTakeIdToTakeName(events, scenario.takes);
        events = this.removeEventId(events);
        this.sortEvents(events);

        this.takes = takes;
        this.events = events;
    }

    private replaceTakeIdToTakeName = (events: Event[] | undefined, takes: Take[]) => {
        events?.map(event => {
          event.sourceEventName = takes.find(take => take.takeId === event.sourceTakeId)?.takeName;
          event.targetEventName = takes.find(take => take.takeId === event.targetTakeId)?.takeName;
        });
    }

    private removeEventId(events: Event[] | undefined) {
        return events?.map(({ eventId, sourceTakeId, targetTakeId, ...event }) => event as Event);
    }

    private sortEvents = (events: Event[] | undefined) => {
        events?.sort((event1, event2) => {
          if (event1.sourceEventName! > event2.sourceEventName!) {
              return 1;
          } else if (event1.sourceEventName! > event2.sourceEventName!) {
              return -1;
          } else if(event1.sourceEventName! === event2.sourceEventName!) {
            if (event1.targetEventName! > event2.targetEventName!) {
              return 1;
            } else if (event1.targetEventName! > event2.targetEventName!) {
              return -1;
            }
          }
          return 0;
        });
    }

    private removeTakeId = (takes: Take[]) => {
        return takes.map(({ takeId, ...take }) => take as Take);
    }

    private sortTakes = (takes: Take[]) => {
        return takes.sort((take1, take2) => {
          if (take1.takeName > take2.takeName) {
            return 1;
          } else if (take1.takeName < take2.takeName) {
            return -1;
          }
          return 0;
        });
    }
}

interface Take {
    takeId: number;
    takeName: string;
    [index: string]: any;
}

interface Event {
    eventId: number;
    sourceTakeId: number;
    targetTakeId: number;
    sourceEventName?: string;
    targetEventName?: string;
    [index: string]: any;
}
