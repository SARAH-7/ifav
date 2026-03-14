import { getStartups } from "@/app/actions/startups";
import StartupsClient from "./StartupsClient";

export default async function StartupsPage() {
  const startups = await getStartups();
  return <StartupsClient initialStartups={startups} />;
}
