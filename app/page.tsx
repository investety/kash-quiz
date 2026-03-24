"use client";

import { useMemo, useState } from "react";
import { Trophy } from "lucide-react";

type Option = {
  id: string;
  text: string;
};

type Question = {
  id: number;
  question: string;
  options: Option[];
  correct: string;
};

const PROJECT = {
  name: "Kash Quiz",
  subtitle: "scroll → repost → predict 🟡",
  logo: "/logo.jpg",
  bgImage: "/bg.png",
};

const COLORS = {
  accent: "#f6cf00",
  accentSoft: "rgba(246, 207, 0, 0.16)",
  accentGlow: "rgba(246, 207, 0, 0.22)",
  textMain: "#f8efe6",
  textMuted: "#aa9685",
  cardBorder: "rgba(255,255,255,0.12)",
  cardBg: "rgba(255,255,255,0.035)",
  buttonText: "#17120d",
  correct: "#00d98b",
  correctBg: "rgba(0,217,139,0.08)",
  incorrect: "#ff3535",
  incorrectBg: "rgba(255,53,53,0.10)",
};

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "What is Kash?",
    options: [
      { id: "A", text: "DEX" },
      { id: "B", text: "Lending protocol" },
      { id: "C", text: "Prediction Market" },
      { id: "D", text: "A social app" },
    ],
    correct: "C",
  },
  {
    id: 2,
    question: "How much funding did Kash raise in it's pre-seed round?",
    options: [
      { id: "A", text: "$2 million" },
      { id: "B", text: "$500,000" },
      { id: "C", text: "$1 million" },
      { id: "D", text: "$100,000" },
    ],
    correct: "A",
  },
  {
    id: 3,
    question: "What’s the role of Lucas Martin Calderon in Kash?",
    options: [
      { id: "A", text: "Head of ecosystem" },
      { id: "B", text: "COO" },
      { id: "C", text: "Head of Product Design" },
      { id: "D", text: "CEO" },
    ],
    correct: "D",
  },
  {
    id: 4,
    question: "Which two social platforms are the initial focus of Kash’s integration?",
    options: [
      { id: "A", text: "Discord and Telegram" },
      { id: "B", text: "Facebook and LinkedIn" },
      { id: "C", text: "Tiktok and Reddit" },
      { id: "D", text: "X and Instagram" },
    ],
    correct: "D",
  },
  {
    id: 5,
    question: "What is the name of Kash’s pre-testnet simulation on X?",
    options: [
      { id: "A", text: "SocialTrade" },
      { id: "B", text: "Kash Flash" },
      { id: "C", text: "PredicX" },
      { id: "D", text: "Kash Beta" },
    ],
    correct: "B",
  },
  {
    id: 6,
    question: "What is the handle of the bot users interact with to place predictions?",
    options: [
      { id: "A", text: "@kash_flash" },
      { id: "B", text: "@kash_bot" },
      { id: "C", text: "@predict_now" },
      { id: "D", text: "@lmc_security" },
    ],
    correct: "B",
  },
  {
    id: 7,
    question:
      "What technology is used in the Kash resolution process to prove that an AI model correctly analyzed authentic data?",
    options: [
      { id: "A", text: "zkTLS" },
      { id: "B", text: "EZKL Zero-Knowledge ML" },
      { id: "C", text: "Privy MPC Wallet" },
      { id: "D", text: "ERC-4337 Account Abstraction" },
    ],
    correct: "B",
  },
  {
    id: 8,
    question: "How does Kash solve the “bootstrap” or liquidity problem in new markets?",
    options: [
      { id: "A", text: "By waiting for whales to provide liquidity" },
      { id: "B", text: "By using traditional order books" },
      { id: "C", text: "Every market launches with instant liquidity from the first trade" },
      { id: "D", text: "By delaying trading until enough users join" },
    ],
    correct: "C",
  },
  {
    id: 9,
    question: "How does Kash’s ERC-4337 integration enhance the user experience?",
    options: [
      { id: "A", text: "By introducing mandatory gas fees for every trade" },
      { id: "B", text: "By enabling gasless transactions and smart wallet features" },
      { id: "C", text: "By requiring manual approval for every operation" },
      { id: "D", text: "By locking wallets to a single platform" },
    ],
    correct: "B",
  },
  {
    id: 10,
    question: "Who is not part of Kash’s team?",
    options: [
      { id: "A", text: "Javier Sanchez" },
      { id: "B", text: "Lucas Martin Calderon" },
      { id: "C", text: "Benedict Dixon" },
      { id: "D", text: "Noah Lefevre" },
    ],
    correct: "D",
  },
];

type Screen = "start" | "quiz" | "result";

export default function Page() {
  const [screen, setScreen] = useState<Screen>("start");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const current = QUESTIONS[index];
  const total = QUESTIONS.length;
  const isCorrect = selected === current?.correct;
  const scoreLabel = `${correctCount}/${total}`;

  const progressPercent = useMemo(() => {
    if (screen === "result") return 100;
    return Math.round(((index + 1) / total) * 100);
  }, [index, total, screen]);

  const finalPercent = Math.round((correctCount / total) * 100);

  const ring = useMemo(() => {
    const radius = 47;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (finalPercent / 100) * circumference;
    return { radius, circumference, offset };
  }, [finalPercent]);

  const startQuiz = () => {
    setScreen("quiz");
  };

  const restartQuiz = () => {
    setScreen("start");
    setIndex(0);
    setSelected(null);
    setRevealed(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    setStreak(0);
    setBestStreak(0);
  };

const shareOnTwitter = () => {
  const percent = Math.round((correctCount / total) * 100);

  const text = `I scored ${correctCount}/${total} (${percent}%) on Kash Quiz 🟡

Can you beat me? 👀

Thanks @InvestSecrety for the quest 🙌

Try it 👇`;

  const url = "https://kash-quiz-lyart.vercel.app";

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text
  )}&url=${encodeURIComponent(url)}`;

  window.open(twitterUrl, "_blank");
};

  const chooseAnswer = (optionId: string) => {
    if (revealed) return;

    setSelected(optionId);
    setRevealed(true);

    if (optionId === current.correct) {
      const nextStreak = streak + 1;
      setCorrectCount((v) => v + 1);
      setStreak(nextStreak);
      setBestStreak((v) => Math.max(v, nextStreak));
    } else {
      setIncorrectCount((v) => v + 1);
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    if (!revealed) return;

    if (index === total - 1) {
      setScreen("result");
      return;
    }

    setIndex((v) => v + 1);
    setSelected(null);
    setRevealed(false);
  };

  const optionClasses = (id: string) => {
    const base =
      "group flex w-full items-center gap-4 rounded-[16px] border px-[18px] py-[16px] text-left transition-all duration-150";

    if (!revealed) {
      return `${base} border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(255,255,255,0.22)]`;
    }

    if (id === current.correct) {
      return `${base} text-[#54efb5]`;
    }

    if (id === selected && id !== current.correct) {
      return `${base} text-[#ff8a8a]`;
    }

    return `${base} border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.02)] text-[#efe3d7]`;
  };

  const optionStyle = (id: string) => {
    if (!revealed) {
      return {
        borderColor: "rgba(255,255,255,0.14)",
        backgroundColor: "rgba(255,255,255,0.02)",
      };
    }

    if (id === current.correct) {
      return {
        borderColor: COLORS.correct,
        backgroundColor: COLORS.correctBg,
      };
    }

    if (id === selected && id !== current.correct) {
      return {
        borderColor: COLORS.incorrect,
        backgroundColor: COLORS.incorrectBg,
      };
    }

    return {
      borderColor: "rgba(255,255,255,0.14)",
      backgroundColor: "rgba(255,255,255,0.02)",
    };
  };

  const badgeClasses = (id: string) => {
    const base =
      "flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] text-[15px] font-semibold leading-none";

    if (!revealed) {
      return `${base} bg-[rgba(255,255,255,0.06)] text-[#b8a493]`;
    }

    if (id === current.correct) {
      return `${base} text-white`;
    }

    if (id === selected && id !== current.correct) {
      return `${base} text-white`;
    }

    return `${base} bg-[rgba(255,255,255,0.06)] text-[#b8a493]`;
  };

  const badgeStyle = (id: string) => {
    if (!revealed) {
      return {};
    }

    if (id === current.correct) {
      return { backgroundColor: COLORS.correct };
    }

    if (id === selected && id !== current.correct) {
      return { backgroundColor: COLORS.incorrect };
    }

    return {};
  };

  return (
    <main className="relative min-h-screen overflow-hidden text-[#f4e8db]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${PROJECT.bgImage})` }}
      />
      <div className="absolute inset-0 bg-[rgba(20,14,10,0.78)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(246,207,0,0.10),transparent_28%),linear-gradient(180deg,rgba(31,20,12,0.35)_0%,rgba(17,12,8,0.82)_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[920px] items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full">
          {screen === "start" && (
            <section className="mx-auto max-w-[560px] text-center">
              <div className="relative mb-7 flex justify-center">
                <div className="absolute h-[120px] w-[120px] rounded-full bg-[rgba(246,207,0,0.18)] blur-3xl" />
                <div
                  className="relative flex h-[76px] w-[76px] items-center justify-center overflow-hidden rounded-[22px] shadow-[0_0_35px_rgba(246,207,0,0.26)]"
                  style={{ backgroundColor: COLORS.accent }}
                >
                  <img
                    src={PROJECT.logo}
                    alt={PROJECT.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <h1 className="mb-3 text-[42px] font-semibold leading-[1.02] tracking-[-0.02em] text-[#fff7ef] sm:text-[52px]">
                Kash Quiz
              </h1>

              <p className="mx-auto mb-3 max-w-[520px] text-[16px] leading-7 text-[#c6b3a2]">
                Test your knowledge and see how well you understand Kash
              </p>

              <div className="relative overflow-hidden rounded-[28px] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.045)] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:p-7">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.01)_100%)]" />
                <div className="relative">
                  <div className="mb-7 grid grid-cols-3 text-center">
                    <div>
                      <div className="text-[30px] font-semibold leading-none text-[#fff7ef]">
                        10
                      </div>
                      <div className="mt-2 text-[12px] text-[#aa9685]">
                        Questions
                      </div>
                    </div>

                    <div className="border-x border-[rgba(255,255,255,0.10)]">
                      <div className="text-[30px] font-semibold leading-none text-[#fff7ef]">
                        4
                      </div>
                      <div className="mt-2 text-[12px] text-[#aa9685]">
                        Options Each
                      </div>
                    </div>

                    <div>
                      <div className="text-[30px] font-semibold leading-none text-[#fff7ef]">
                        100%
                      </div>
                      <div className="mt-2 text-[12px] text-[#aa9685]">
                        Max Score
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={startQuiz}
                    className="flex w-full items-center justify-center gap-2 rounded-[16px] px-5 py-[15px] text-[16px] font-semibold transition duration-200 hover:scale-[1.01] hover:brightness-105 active:scale-[0.99]"
                    style={{
                      backgroundColor: COLORS.accent,
                      color: COLORS.buttonText,
                      boxShadow: "0 8px 30px rgba(246, 207, 0, 0.20)",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-[18px] w-[18px]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m8 5 10 7-10 7V5z" />
                    </svg>
                    Start Quiz
                  </button>
                </div>
              </div>

              <p className="mt-8 text-[13px] text-[#9f8b79]">
                Powered by{" "}
                <a
                  href="https://discord.gg/Rc8bZjexhK"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2 transition hover:text-[#f6cf00]"
                >
                  Kash
                </a>
                . Built by{" "}
                <a
                  href="https://x.com/InvestSecrety"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2 transition hover:text-[#f6cf00]"
                >
                  InvestSecrety
                </a>
                .
              </p>
            </section>
          )}

          {screen === "quiz" && (
            <div className="mx-auto max-w-[580px]">
              <header className="mb-6">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-[44px] w-[44px] items-center justify-center overflow-hidden rounded-[14px] shadow-[0_0_18px_rgba(246,207,0,0.18)]"
                      style={{ backgroundColor: COLORS.accent }}
                    >
                      <img
                        src={PROJECT.logo}
                        alt={PROJECT.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div>
                      <h1 className="text-[18px] font-semibold leading-[1.15] text-[#f8efe6]">
                        {PROJECT.name}
                      </h1>
                      <p className="mt-[2px] text-[12px] leading-none text-[#aa9685]">
                        {PROJECT.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    {streak >= 2 && (
                      <div
                        className="rounded-full px-4 py-[7px] text-[14px] font-semibold"
                        style={{
                          backgroundColor: COLORS.accentSoft,
                          color: COLORS.accent,
                        }}
                      >
                        ⚡ {streak} streak
                      </div>
                    )}

                    <div className="min-w-[54px] text-right">
                      <div className="text-[16px] font-semibold leading-none text-[#f8efe6]">
                        {scoreLabel}
                      </div>
                      <div className="mt-[6px] text-[12px] leading-none text-[#aa9685]">
                        Score
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-[6px] flex items-center justify-between text-[13px] text-[#aa9685]">
                  <span>
                    Question {index + 1} of {total}
                  </span>
                  <span>{progressPercent}%</span>
                </div>

                <div className="h-[8px] overflow-hidden rounded-full bg-[rgba(255,255,255,0.10)]">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${progressPercent}%`,
                      backgroundColor: COLORS.accent,
                    }}
                  />
                </div>
              </header>

              <section className="rounded-[22px] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.035)] px-5 pb-5 pt-6 shadow-2xl backdrop-blur-sm sm:px-6">
                <h2 className="mb-7 max-w-[470px] text-[22px] font-semibold leading-[1.45] text-[#f7eee5] sm:text-[23px]">
                  {current.question}
                </h2>

                <div className="space-y-3">
                  {current.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => chooseAnswer(option.id)}
                      disabled={revealed}
                      className={optionClasses(option.id)}
                      style={optionStyle(option.id)}
                    >
                      <span
                        className={badgeClasses(option.id)}
                        style={badgeStyle(option.id)}
                      >
                        {revealed ? (
                          option.id === current.correct ? (
                            <svg
                              viewBox="0 0 24 24"
                              className="h-[18px] w-[18px]"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M20 6 9 17l-5-5" />
                            </svg>
                          ) : option.id === selected ? (
                            <svg
                              viewBox="0 0 24 24"
                              className="h-[18px] w-[18px]"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M18 6 6 18" />
                              <path d="m6 6 12 12" />
                            </svg>
                          ) : (
                            option.id
                          )
                        ) : (
                          option.id
                        )}
                      </span>

                      <span className="text-[15px] leading-[1.45]">
                        {option.text}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="mt-8 flex items-end justify-between gap-4">
                  <div
                    className={`text-[14px] font-semibold leading-none ${
                      !revealed
                        ? "text-transparent"
                        : isCorrect
                        ? "text-[#35e3a5]"
                        : "text-[#ff4a4a]"
                    }`}
                  >
                    {!revealed
                      ? "Waiting"
                      : isCorrect
                      ? "Correct! Well done."
                      : `Incorrect. The answer is ${current.correct}.`}
                  </div>

                  <button
                    onClick={nextQuestion}
                    disabled={!revealed}
                    className="inline-flex h-[46px] items-center justify-center gap-2 rounded-[14px] px-6 text-[16px] font-semibold transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
                    style={{
                      backgroundColor: COLORS.accent,
                      color: COLORS.buttonText,
                    }}
                  >
                    Next
                    <svg
                      viewBox="0 0 24 24"
                      className="h-[18px] w-[18px]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m13 5 7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </section>
            </div>
          )}

          {screen === "result" && (
            <section className="mx-auto max-w-[460px] text-center">
              <div
                className="mx-auto mb-6 flex h-[62px] w-[62px] items-center justify-center overflow-hidden rounded-[18px] shadow-[0_0_24px_rgba(246,207,0,0.22)]"
                style={{ backgroundColor: COLORS.accent }}
              >
                <img
                  src={PROJECT.logo}
                  alt={PROJECT.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mx-auto mb-4 flex justify-center">
                <Trophy className="h-[50px] w-[50px] text-[#f6cf00]" strokeWidth={2.2} />
              </div>

              <h2 className="mb-2 text-[34px] font-semibold leading-none text-[#fff7ef]">
                Quiz Complete!
              </h2>
              <p className="mb-8 text-[15px] leading-6 text-[#aa9685]">
                Good job! Keep studying!
              </p>

              <div className="rounded-[22px] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.035)] p-6 shadow-2xl backdrop-blur-sm">
                <div className="mb-6 flex justify-center">
                  <div className="relative h-[138px] w-[138px]">
                    <svg
                      width="138"
                      height="138"
                      viewBox="0 0 138 138"
                      className="-rotate-90"
                    >
                      <circle
                        cx="69"
                        cy="69"
                        r={ring.radius}
                        stroke="rgba(255,255,255,0.10)"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="69"
                        cy="69"
                        r={ring.radius}
                        stroke={COLORS.accent}
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={ring.circumference}
                        strokeDashoffset={ring.offset}
                      />
                    </svg>

                    <div className="absolute inset-0 flex items-center justify-center text-[28px] font-semibold text-[#f8efe6]">
                      {finalPercent}%
                    </div>
                  </div>
                </div>

                <p className="mb-6 text-[15px] text-[#aa9685]">
                  {correctCount} out of {total} correct
                </p>

                <div className="mb-7 grid grid-cols-3">
                  <div className="border-r border-[rgba(255,255,255,0.10)]">
                    <div className="text-[22px] font-semibold leading-none text-[#f8efe6]">
                      {correctCount}
                    </div>
                    <div className="mt-2 text-[13px] text-[#aa9685]">
                      Correct
                    </div>
                  </div>

                  <div className="border-r border-[rgba(255,255,255,0.10)]">
                    <div className="text-[22px] font-semibold leading-none text-[#f8efe6]">
                      {incorrectCount}
                    </div>
                    <div className="mt-2 text-[13px] text-[#aa9685]">
                      Incorrect
                    </div>
                  </div>

                  <div>
                    <div className="text-[22px] font-semibold leading-none text-[#f8efe6]">
                      {bestStreak}
                    </div>
                    <div className="mt-2 text-[13px] text-[#aa9685]">
                      Best Streak
                    </div>
                  </div>
                </div>

                <button
                  onClick={restartQuiz}
                  className="inline-flex h-[48px] w-full items-center justify-center gap-2 rounded-[14px] px-6 text-[16px] font-semibold transition hover:brightness-105"
                  style={{
                    backgroundColor: COLORS.accent,
                    color: COLORS.buttonText,
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-[18px] w-[18px]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 12a9 9 0 1 0 3-6.7" />
                    <path d="M3 3v6h6" />
                  </svg>
                  Play Again
                </button>

               <button
  onClick={shareOnTwitter}
  className="mt-3 inline-flex h-[48px] w-full items-center justify-center gap-2 rounded-[14px] px-6 text-[16px] font-semibold transition hover:brightness-110"
  style={{
    backgroundColor: "#000",
    color: "#fff",
  }}
>
  Share on X
</button>
              </div>

              <p className="mt-8 text-[13px] text-[#9f8b79]">
                Powered by{" "}
                <a
                  href="https://discord.gg/Rc8bZjexhK"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2 transition hover:text-[#f6cf00]"
                >
                  Kash
                </a>
                . Built by{" "}
                <a
                  href="https://x.com/InvestSecrety"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2 transition hover:text-[#f6cf00]"
                >
                  InvestSecrety
                </a>
                .
              </p>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}