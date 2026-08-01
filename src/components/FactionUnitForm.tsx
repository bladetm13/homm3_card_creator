"use client";

import {
  FactionUnit,
  FactionUnitStats,
  ResourceCost,
} from "@/models/factionUnit";
import { UnitPortrait, UnitTier, UnitType, unitPortraits } from "@/models/unit";
import { TownType } from "@/models/town";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import ReplaceEntityModal from "./ReplaceEntityModal";
import { iconMap } from "@/lib/textToComponent";
import styles from "./HeroForm.module.css";

export default function FactionUnitForm({
  unit,
  setUnit,
}: {
  unit: FactionUnit;
  setUnit: (unit: FactionUnit) => void;
}) {
  const [showPortraitModal, setShowPortraitModal] = useState<boolean>(false);

  const setName = (name: string) => setUnit({ ...unit, name });
  const setTown = (town: TownType) => setUnit({ ...unit, town });
  const setTier = (tier: UnitTier) => setUnit({ ...unit, tier });
  const setPortrait = (portrait: UnitPortrait) =>
    setUnit({ ...unit, portrait });
  const setFewSpecialty = (fewSpecialty: string) =>
    setUnit({ ...unit, fewSpecialty });
  const setPackSpecialty = (packSpecialty: string) =>
    setUnit({ ...unit, packSpecialty });

  type NumericStatKey = Exclude<keyof FactionUnitStats, "type">;

  const setFewStat = (key: NumericStatKey, value: number) =>
    setUnit({ ...unit, few: { ...unit.few, [key]: value } });
  const setPackStat = (key: NumericStatKey, value: number) =>
    setUnit({ ...unit, pack: { ...unit.pack, [key]: value } });

  const setFewType = (type: UnitType) =>
    setUnit({ ...unit, few: { ...unit.few, type } });
  const setPackType = (type: UnitType) =>
    setUnit({ ...unit, pack: { ...unit.pack, type } });

  const setRecruitCost = (key: keyof ResourceCost, value: number) =>
    setUnit({ ...unit, recruitCost: { ...unit.recruitCost, [key]: value } });
  const setReinforceCost = (key: keyof ResourceCost, value: number) =>
    setUnit({
      ...unit,
      reinforceCost: { ...unit.reinforceCost, [key]: value },
    });

  return (
    // px-2 absorbs the negative margin Bootstrap puts on a Row; without a
    // container to cancel against, the top-level rows overflow the form.
    <Form className="px-2">
      <Row className="g-2 mb-3">
        <Col md={6}>
          <Form.Group controlId="factionUnitNameInput">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={unit.name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter unit name"
            />
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group controlId="factionUnitTownSelect">
            <Form.Label>Town</Form.Label>
            <Form.Select
              value={unit.town}
              onChange={(e) => setTown(e.target.value as TownType)}
            >
              {Object.values(TownType).map((town) => (
                <option key={town} value={town}>
                  {town}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group controlId="factionUnitTierSelect">
            <Form.Label>Tier</Form.Label>
            <Form.Select
              value={unit.tier}
              onChange={(e) => setTier(e.target.value as UnitTier)}
            >
              <option value={UnitTier.Bronze}>Bronze</option>
              <option value={UnitTier.Silver}>Silver</option>
              <option value={UnitTier.Golden}>Golden</option>
              <option value={UnitTier.Azure}>Azure</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row className="g-3 mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Statistics — Few</Form.Label>
            <Row className="g-2 mb-2">
              <Col xs={12} sm={4}>
                <Form.Label className="small text-muted mb-0">Type</Form.Label>
                <Form.Select
                  value={unit.few.type}
                  onChange={(e) => setFewType(e.target.value as UnitType)}
                >
                  <option value={UnitType.Melee}>Melee</option>
                  <option value={UnitType.Flying}>Flying</option>
                  <option value={UnitType.Ranged}>Ranged</option>
                </Form.Select>
              </Col>
            </Row>
            <Row className="g-2">
              <Col xs={3}>
                <Form.Label className="small text-muted mb-0">
                  Attack
                </Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  value={unit.few.attack}
                  onChange={(e) =>
                    setFewStat("attack", Number(e.currentTarget.value))
                  }
                />
              </Col>
              <Col xs={3}>
                <Form.Label className="small text-muted mb-0">
                  Defense
                </Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  value={unit.few.defense}
                  onChange={(e) =>
                    setFewStat("defense", Number(e.currentTarget.value))
                  }
                />
              </Col>
              <Col xs={3}>
                <Form.Label className="small text-muted mb-0">
                  Health
                </Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  value={unit.few.health}
                  onChange={(e) =>
                    setFewStat("health", Number(e.currentTarget.value))
                  }
                />
              </Col>
              <Col xs={3}>
                <Form.Label className="small text-muted mb-0">
                  Initiative
                </Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  value={unit.few.initiative}
                  onChange={(e) =>
                    setFewStat("initiative", Number(e.currentTarget.value))
                  }
                />
              </Col>
            </Row>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Statistics — Pack</Form.Label>
            <Row className="g-2 mb-2">
              <Col xs={12} sm={4}>
                <Form.Label className="small text-muted mb-0">Type</Form.Label>
                <Form.Select
                  value={unit.pack.type}
                  onChange={(e) => setPackType(e.target.value as UnitType)}
                >
                  <option value={UnitType.Melee}>Melee</option>
                  <option value={UnitType.Flying}>Flying</option>
                  <option value={UnitType.Ranged}>Ranged</option>
                </Form.Select>
              </Col>
            </Row>
            <Row className="g-2">
              <Col xs={3}>
                <Form.Label className="small text-muted mb-0">
                  Attack
                </Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  value={unit.pack.attack}
                  onChange={(e) =>
                    setPackStat("attack", Number(e.currentTarget.value))
                  }
                />
              </Col>
              <Col xs={3}>
                <Form.Label className="small text-muted mb-0">
                  Defense
                </Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  value={unit.pack.defense}
                  onChange={(e) =>
                    setPackStat("defense", Number(e.currentTarget.value))
                  }
                />
              </Col>
              <Col xs={3}>
                <Form.Label className="small text-muted mb-0">
                  Health
                </Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  value={unit.pack.health}
                  onChange={(e) =>
                    setPackStat("health", Number(e.currentTarget.value))
                  }
                />
              </Col>
              <Col xs={3}>
                <Form.Label className="small text-muted mb-0">
                  Initiative
                </Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  value={unit.pack.initiative}
                  onChange={(e) =>
                    setPackStat("initiative", Number(e.currentTarget.value))
                  }
                />
              </Col>
            </Row>
          </Form.Group>
        </Col>
      </Row>

      <Row className="g-3 mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Recruitment Cost</Form.Label>
            <Row className="g-2">
              <Col xs={6}>
                <Form.Label className="small text-muted mb-0">Gold</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  value={unit.recruitCost.gold}
                  onChange={(e) =>
                    setRecruitCost("gold", Number(e.currentTarget.value))
                  }
                />
              </Col>
              <Col xs={6}>
                <Form.Label className="small text-muted mb-0">
                  Valuables
                </Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  value={unit.recruitCost.valuables}
                  onChange={(e) =>
                    setRecruitCost("valuables", Number(e.currentTarget.value))
                  }
                />
              </Col>
            </Row>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Reinforcement Cost</Form.Label>
            <Row className="g-2">
              <Col xs={6}>
                <Form.Label className="small text-muted mb-0">Gold</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  value={unit.reinforceCost.gold}
                  onChange={(e) =>
                    setReinforceCost("gold", Number(e.currentTarget.value))
                  }
                />
              </Col>
              <Col xs={6}>
                <Form.Label className="small text-muted mb-0">
                  Valuables
                </Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  value={unit.reinforceCost.valuables}
                  onChange={(e) =>
                    setReinforceCost("valuables", Number(e.currentTarget.value))
                  }
                />
              </Col>
            </Row>
          </Form.Group>
        </Col>
      </Row>

      <Row className="my-3 text-center g-2">
        <Col xs={12}>
          <Button
            variant="outline-secondary"
            className="w-100"
            onClick={() => setShowPortraitModal(true)}
          >
            Replace portrait
          </Button>
          <ReplaceEntityModal
            title="portrait"
            show={showPortraitModal}
            onHide={() => setShowPortraitModal(false)}
            entityList={unitPortraits}
            onSelect={(portrait) => setPortrait(portrait)}
            hideName
          />
        </Col>
      </Row>

      <Row className="g-3 mb-3">
        <Col md={6}>
          <Form.Group controlId="factionUnitFewSpecialtyContent">
            <Form.Label>Unit Speciality — Few</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter unit speciality"
              value={unit.fewSpecialty}
              onChange={(e) => setFewSpecialty(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="factionUnitPackSpecialtyContent">
            <Form.Label>Unit Speciality — Pack</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter unit speciality"
              value={unit.packSpecialty}
              onChange={(e) => setPackSpecialty(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

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
