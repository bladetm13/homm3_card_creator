export interface AstrologerCard {
  name: string;
  effect: string;
  flavorText: string;
}

export const initialAstrologerCard: AstrologerCard = {
  name: "Annoying Lizard",
  effect:
    "Each player must shuffle all Artifact and Spell cards from their hand back into their deck and draw the same number of cards from the top of their deck of Might and Magic.",
  flavorText: "Hey, Hero! Hero! Hey, Hero! Hero! Hey!",
};
