"use client";

import { Button, Card, CardBody, CardHeader, Table } from "react-bootstrap";
import clsx from "clsx";
import { fileOpen } from "browser-fs-access";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faTrash,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./PdfEditor.module.css";
import { LoadedCard, boardCount, pairsFor, sheetCount } from "./PdfSheets";
import { CardKey, parseCardFile } from "@/lib/detectCardFile";
import { showToast } from "@/lib/toast";

const LABELS: Record<CardKey, string> = {
  hero: "Hero",
  unit: "Neutral unit",
  factionUnit: "Faction unit",
  creatureBankUnit: "Creature bank",
  ability: "Ability",
  spell: "Spell",
  artifact: "Artifact",
  astrologer: "Astrologer",
  event: "Event",
  pandora: "Pandora's box",
  adventure: "Adventure",
  morale: "Morale",
};

function nameOf(payload: unknown, fallback: string): string {
  const name = (payload as { name?: unknown })?.name;
  return typeof name === "string" && name ? name : fallback;
}

let nextId = 0;

export default function PdfEditor({
  cards,
  setCards,
}: {
  cards: LoadedCard[];
  setCards: (cards: LoadedCard[]) => void;
}) {
  const addFiles = async () => {
    let blobs;
    try {
      blobs = await fileOpen({
        mimeTypes: ["application/json"],
        extensions: [".json"],
        description: "Hero Creator cards",
        multiple: true,
      });
    } catch (error) {
      // Cancelling the picker is not a failure.
      if (error instanceof DOMException && error.name === "AbortError") return;
      throw error;
    }

    const added: LoadedCard[] = [];
    const failed: string[] = [];

    for (const blob of blobs) {
      try {
        const { key, payload } = parseCardFile(await blob.text());
        added.push({
          id: nextId++,
          key,
          name: nameOf(payload, blob.name.replace(/\.json$/i, "")),
          payload,
        });
      } catch (error) {
        failed.push(
          `${blob.name}: ${error instanceof Error ? error.message : "unreadable"}`,
        );
      }
    }

    if (added.length) setCards([...cards, ...added]);
    if (failed.length) {
      showToast(
        `Skipped ${failed.length} file${failed.length > 1 ? "s" : ""} — ${failed
          .slice(0, 3)
          .join("; ")}`,
      );
    }
  };

  const remove = (id: number) =>
    setCards(cards.filter((card) => card.id !== id));

  const faceCount = cards.reduce((n, card) => n + pairsFor(card).length, 0);
  const sheets = sheetCount(cards);
  const boards = boardCount(cards);

  return (
    <div className={clsx("d-print-none", styles.editor)}>
      <Card>
        <CardHeader>
          <h2 className="mb-0">
            <FontAwesomeIcon icon={faFilePdf} /> PDF
          </h2>
        </CardHeader>
        <CardBody>
          <p className="text-muted">
            Add any saved card files — heroes, units, spells, artifacts and the
            rest, in any mix. Each card is printed next to its own back: cut the
            pair out as one piece and fold along the join for a double-sided
            card. Hero boards are printed on their own sheets at the end.
            Everything goes to your browser&apos;s print dialog, where you can
            choose <em>Save as PDF</em>.
          </p>

          <div className="d-flex gap-2 mb-3">
            <Button variant="primary" onClick={addFiles}>
              <FontAwesomeIcon icon={faUpload} /> Add card files
            </Button>
            <Button
              variant="success"
              disabled={!cards.length}
              onClick={() => window.print()}
            >
              <FontAwesomeIcon icon={faFilePdf} /> Create PDF
            </Button>
            <Button
              variant="outline-secondary"
              disabled={!cards.length}
              onClick={() => setCards([])}
              className="ms-auto"
            >
              <FontAwesomeIcon icon={faTrash} /> Clear
            </Button>
          </div>

          {cards.length ? (
            <>
              <p className="mb-2">
                <strong>{cards.length}</strong> file
                {cards.length > 1 ? "s" : ""} · <strong>{faceCount}</strong>{" "}
                card{faceCount > 1 ? "s" : ""}
                {boards > 0 ? (
                  <>
                    {" "}
                    · <strong>{boards}</strong> board
                    {boards > 1 ? "s" : ""}
                  </>
                ) : null}{" "}
                · <strong>{sheets}</strong> sheet{sheets > 1 ? "s" : ""}
              </p>
              <Table size="sm" striped hover className="mb-0">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th className="text-end">Cards</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {cards.map((card) => (
                    <tr key={card.id}>
                      <td>{card.name}</td>
                      <td className="text-muted">{LABELS[card.key]}</td>
                      <td className="text-end">{pairsFor(card).length}</td>
                      <td className="text-end">
                        <Button
                          size="sm"
                          variant="link"
                          className="p-0 text-danger"
                          onClick={() => remove(card.id)}
                          aria-label={`Remove ${card.name}`}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          ) : (
            <p className="text-muted fst-italic mb-0">No files added yet.</p>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
