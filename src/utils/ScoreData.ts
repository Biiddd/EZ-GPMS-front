import {ref} from "vue";

export interface ScoreData {
    // 开题报告
    startScore1: number;
    startScore2: number;
    startScore3: number;
    startScore: number;
    startEva: string | null;

    // 外文翻译
    transScore1: number;
    transScore2: number;
    transScore3: number;
    transScore: number;
    transEva: string | null;

    // 中期检查
    midScore1: number;
    midScore2: number;
    midScore3: number;
    midScore: number;
    midEva: string | null;

    // 指导老师
    teachScore1: number;
    teachScore2: number;
    teachScore3: number;
    teachScore4: number;
    teachScore5: number;
    teachScore: number;
    teachEva: string | null;

    // 评阅老师
    readScore1: number;
    readScore2: number;
    readScore3: number;
    readScore4: number;
    readScore: number;
    readEva: string | null;

    // 答辩小组
    defScore1: number;
    defScore2: number;
    defScore3: number;
    defScore4: number;
    defScore: number;
    defEva: string | null;

    // 委员会总评
    finalScore: number;
    finalEva: string | null;
}

export const scoreData = ref<ScoreData>({
    // 开题报告
    startScore1: 0,
    startScore2: 0,
    startScore3: 0,
    startScore: 0,
    startEva: '',

    // 外文翻译
    transScore1: 0,
    transScore2: 0,
    transScore3: 0,
    transScore: 0,
    transEva: '',

    // 中期检查
    midScore1: 0,
    midScore2: 0,
    midScore3: 0,
    midScore: 0,
    midEva: '',

    // 指导老师
    teachScore1: 0,
    teachScore2: 0,
    teachScore3: 0,
    teachScore4: 0,
    teachScore5: 0,
    teachScore: 0,
    teachEva: '',

    // 评阅老师
    readScore1: 0,
    readScore2: 0,
    readScore3: 0,
    readScore4: 0,
    readScore: 0,
    readEva: '',

    // 答辩小组
    defScore1: 0,
    defScore2: 0,
    defScore3: 0,
    defScore4: 0,
    defScore: 0,
    defEva: '',

    // 委员会总评
    finalScore: 0,
    finalEva: '',
});
