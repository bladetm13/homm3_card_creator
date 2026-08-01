import { Card, CardBody, CardHeader, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import styles from "./ComingSoonTab.module.css";

export default function ComingSoonTab({
  icon,
  title,
  description,
  needs,
}: {
  icon: IconDefinition;
  title: string;
  description: string;
  needs: string[];
}) {
  return (
    <div className={styles.container}>
      <Card>
        <CardHeader className="d-flex align-items-center gap-2">
          <h2 className="mb-0">
            <FontAwesomeIcon icon={icon} /> {title}
          </h2>
          <Badge bg="secondary">Not started</Badge>
        </CardHeader>
        <CardBody>
          <p>{description}</p>
          <p className="text-muted mb-2">Still needed before this tab can work:</p>
          <ul>
            {needs.map((need, i) => (
              <li key={i}>{need}</li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
