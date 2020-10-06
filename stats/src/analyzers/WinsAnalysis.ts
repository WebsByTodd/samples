import { Analyzer } from "../Summary";
import { MatchData } from "../MataData";
import { MatchResult } from "../MatchResult";

export class WinsAnalysis implements Analyzer {
  constructor(public team: string) {}
  run(matchData: MatchData[]): string {
    let wins = 0;
    for (let match of matchData) {
      if (match[1] === this.team && match[5] === MatchResult.HomeWin) {
        wins++;
      } else if (match[2] === this.team && match[5] === MatchResult.AwayWin) {
        wins++;
      }
    }

    return `${this.team} won ${wins} games`;
  }
}
