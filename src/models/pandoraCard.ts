/** The title printed on the card, used when the card carries none of its own. */
export const defaultPandoraName = "Pandora's Box";

export interface PandoraCard {
  /** Optional: cards saved before the title was editable have no name. */
  name?: string;
  effect: string;
}

export const initialPandoraCard: PandoraCard = {
  name: defaultPandoraName,
  effect:
    "Look at the top 3 cards from the Astrologers Proclaim deck, discard up to 2 of them and place the rest back on top of the deck in any order.\n**Search (2)** the Artifact deck.",
};
