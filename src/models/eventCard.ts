export interface EventCard {
  name: string;
  effect: string;
  flavorText: string;
}

export const initialEventCard: EventCard = {
  name: "Stables",
  effect:
    "**Each player chooses one option:**\nYour Main hero gains 1 :movement:.\n:or:\n:pay: 1 :movement: from any of your heroes to roll 1 :resource:.",
  flavorText:
    "While traveling to your next location, you see a small fork in the road. Out of curiosity, you check it out and find an old stable. The overjoyed host offers you an amazing bargain.",
};
