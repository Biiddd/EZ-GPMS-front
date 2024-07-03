export interface ScoreData {
  id: string;

  // 开题报告
  startScore1: number | null;
  startScore2: number | null;
  startScore3: number | null;
  startScore: number | null;
  startEva: string | null;

  // 外文翻译
  transScore1: number | null;
  transScore2: number | null;
  transScore3: number | null;
  transScore: number | null;
  transEva: string | null;

  // 中期检查
  midScore1: number | null;
  midScore2: number | null;
  midScore3: number | null;
  midScore: number | null;
  midEva: string | null;

  // 指导老师
  teachScore1: number | null;
  teachScore2: number | null;
  teachScore3: number | null;
  teachScore4: number | null;
  teachScore5: number | null;
  teachScore: number | null;
  teachEva: string | null;

  // 评阅老师
  readScore1: number | null;
  readScore2: number | null;
  readScore3: number | null;
  readScore4: number | null;
  readScore: number | null;
  readEva: string | null;

  // 答辩小组
  defScore1: number | null;
  defScore2: number | null;
  defScore3: number | null;
  defScore4: number | null;
  defScore: number | null;
  defEva: string | null;

  // 委员会总评
  finalScore: number | null;
  finalEva: string | null;
}
