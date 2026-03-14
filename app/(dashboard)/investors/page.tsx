import { getInvestors } from "@/app/actions/investors";
import { getStartups } from "@/app/actions/startups";
import InvestorsClient from "./InvestorsClient";

export default async function InvestorsPage() {
  const [investors, startups] = await Promise.all([
    getInvestors(),
    getStartups(),
  ]);

  return <InvestorsClient initialInvestors={investors} startups={startups} />;
}
