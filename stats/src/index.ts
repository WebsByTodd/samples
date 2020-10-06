import { MatchReader } from "./MatchReader";
import { Summary } from "./Summary";

const matchReader = MatchReader.fromCsv("football.csv");
matchReader.load();

// const analyzer = new WinsAnalysis("Man United");
// const reporter = new HtmlReport();
// const summary = new Summary(analyzer, reporter);
const summary = Summary.winsAnalysisWithHtmlReport("Man United");
summary.buildAndPrintReport(matchReader.matches);
