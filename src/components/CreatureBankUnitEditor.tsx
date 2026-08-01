"use client";

import {
  CreatureBankUnit as CreatureBankUnitModel,
  initialCreatureBankUnit,
} from "@/models/creatureBankUnit";
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
import CreatureBankUnitForm from "./CreatureBankUnitForm";
import CreatureBankUnitCard from "./CreatureBankUnitCard";
import CreatureBankUnitCardBack from "./CreatureBankUnitCardBack";
import clsx from "clsx";
import styles from "./CreatureBankUnitEditor.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGears,
  faMagnifyingGlass,
  faDownload,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import {
  loadCreatureBankUnit,
  saveCreatureBankUnit,
} from "@/lib/serializeCreatureBankUnit";
import { loadOrToast } from "@/lib/toast";

export default function CreatureBankUnitEditor() {
  const {
    instances,
    selected,
    current: unit,
    select,
    add,
    setCurrent: setUnit,
  } = useCardInstances<CreatureBankUnitModel>(initialCreatureBankUnit);

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
          <CreatureBankUnitForm unit={unit} setUnit={(v) => setUnit(v)} />
        </CardBody>
        <CardFooter>
          <div className="d-flex justify-content-start gap-2">
            <Button
              variant="primary"
              onClick={async () => {
                const unit = await loadOrToast(loadCreatureBankUnit);

                if (unit) setUnit(unit);
              }}
            >
              <FontAwesomeIcon icon={faUpload} /> Open
            </Button>
            <Button
              variant="success"
              onClick={() => {
                saveCreatureBankUnit(unit);
              }}
            >
              <FontAwesomeIcon icon={faDownload} /> Save
            </Button>
            <Button
              variant="outline-success"
              onClick={() =>
                sendToPdf("creatureBankUnit", String(unit.name ?? ""), unit)
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
              <CreatureBankUnitCard unit={unit} />
              <CreatureBankUnitCardBack />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
