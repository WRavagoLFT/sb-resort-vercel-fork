import React from "react";
import { Badge } from "./ui/badge";
import { useTranslation } from "next-export-i18n";
export default function ReservationStatusBadge({ status }: { status: string }) {
  const { t } = useTranslation();
  const generali18n = t("general");
  const badgeColor = {
    Pending: "bg-gray-500",
    "Checked-In": "bg-green-500",
    Done: "bg-black",
    Cancelled: "bg-red-500",
    Booked: "bg-orange-500",
    Completed: "bg-blue-500",
  }[status];
  return (
    <Badge className={`${badgeColor} hover:${badgeColor}`}>
      {generali18n.status[`${status}`]}
    </Badge>
  );
}
