"use client";

import {
  AstrologerCard as AstrologerCardModel,
  initialAstrologerCard,
} from "@/models/astrologerCard";
import { useCardInstances } from "@/hooks/cardInstances";
import CardInstances from "./CardInstances";
import { sendToPdf } from "@/lib/pdfQueue";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "react-bootstrap";
import AstrologerForm from "./AstrologerForm";
import AstrologerCard from "./AstrologerCard";
import AstrologerCardBack from "./AstrologerCardBack";
import clsx from "clsx";
import styles from "./AstrologerEditor.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGears,
  faMagnifyingGlass,
  faDownload,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import {
  loadAstrologerCard,
  saveAstrologerCard,
} from "@/lib/serializeAstrologerCard";
import { loadOrToast } from "@/lib/toast";

export default function AstrologerEditor() {
  const {
    instances,
    selected,
    current: astrologer,
    select,
    add,
    setCurrent: setAstrologer,
  } = useCardInstances<AstrologerCardModel>(initialAstrologerCard);

  return (
    <div className={clsx("d-print-none", styles.editor)}>
      <Card className={styles.properties}>
        <CardHeader>
          <h2>
            <FontAwesomeIcon icon={faGears} /> Properties
          </h2>
        </CardHeader>
        <CardBody>
          <CardInstances
            labels={instances.map((item) => String(item.name ?? ""))}
            selected={selected}
            onSelect={select}
            onAdd={add}
          />
          <AstrologerForm
            astrologer={astrologer}
            setAstrologer={(v) => setAstrologer(v)}
          />
        </CardBody>
        <CardFooter>
          <div className="d-flex justify-content-start gap-2">
            <Button
              variant="primary"
              onClick={async () => {
                const astrologer = await loadOrToast(loadAstrologerCard);

                if (astrologer) setAstrologer(astrologer);
              }}
            >
              <FontAwesomeIcon icon={faUpload} /> Open
            </Button>
            <Button
              variant="success"
              onClick={() => {
                saveAstrologerCard(astrologer);
              }}
            >
              <FontAwesomeIcon icon={faDownload} /> Save
            </Button>
            <Button
              variant="outline-success"
              onClick={() =>
                sendToPdf(
                  "astrologer",
                  String(astrologer.name ?? ""),
                  astrologer,
                )
              }
            >
              <FontAwesomeIcon icon={faFilePdf} /> Send to PDF
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Card className={styles.preview}>
        <CardHeader>
          <h2>
            <FontAwesomeIcon icon={faMagnifyingGlass} /> Preview
          </h2>
        </CardHeader>
        <CardBody>
          <div className={styles.previewContainer}>
            <div className={styles.previewRow}>
              <AstrologerCard astrologer={astrologer} />
              <div className={styles.flipped}>
                <AstrologerCardBack />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
