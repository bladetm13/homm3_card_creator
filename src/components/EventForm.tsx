"use client";

import { EventCard } from "@/models/eventCard";
import { Form } from "react-bootstrap";
import { iconMap } from "@/lib/textToComponent";
import styles from "./HeroForm.module.css";

export default function EventForm({
  event,
  setEvent,
}: {
  event: EventCard;
  setEvent: (event: EventCard) => void;
}) {
  const setName = (name: string) => setEvent({ ...event, name });
  const setEffect = (effect: string) => setEvent({ ...event, effect });
  const setFlavorText = (flavorText: string) =>
    setEvent({ ...event, flavorText });

  return (
    <Form>
      <Form.Group controlId="eventNameInput" className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={event.name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter event name"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="eventFlavorTextContent">
        <Form.Label>Flavor text</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Enter flavor text"
          value={event.flavorText}
          onChange={(e) => setFlavorText(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="eventEffectContent">
        <Form.Label>Effect</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          placeholder="Enter event effect"
          value={event.effect}
          onChange={(e) => setEffect(e.target.value)}
        />
      </Form.Group>

      <div>Available icons</div>

      <div className={styles.iconContainer}>
        {Object.entries(iconMap).map(([key, icon]) => (
          <span key={key} title={key} className={styles.icon}>
            {icon}
          </span>
        ))}
      </div>
    </Form>
  );
}
