import { ArrowUpRight } from "lucide-react";
import { DataSculpture } from "./DataSculpture";
import { smoothScrollToId } from "@/lib/smooth-scroll";

export const Hero = () => {
  return (
    <section
      id="about"
      className="relative flex min-h-[92vh] items-center pt-28 pb-16 md:pt-32 lg:min-h-screen"
    >
      <div className="grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* Left — editorial headline */}
        <div className="relative z-10">
          <p
            className="eyebrow text-[10px] text-muted-foreground animate-fade-up sm:text-[11px]"
            style={{ animationDelay: "40ms" }}
          >
            Felix <span className="text-primary-glow">/</span> Data Analyst &amp; Builder
          </p>

          <h1
            className="display-xl mt-6 text-[2.6rem] leading-[1.05] sm:text-[3.6rem] md:text-[4.4rem] lg:text-[4.8rem] xl:text-[5.4rem] animate-fade-up"
            style={{ animationDelay: "120ms" }}
          >
            데이터를 읽고,
            <br />
            <span className="text-gradient">다음</span>을 만듭니다.
          </h1>

          <p
            className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground animate-fade-up sm:text-lg"
            style={{ animationDelay: "200ms" }}
          >
            수집부터 분석, 자동화, 시각화까지 — 비즈니스 의사결정을 위한{" "}
            <span className="font-semibold text-foreground">End-to-End</span> 데이터 프로젝트를 만듭니다.
          </p>

          <p
            className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground animate-fade-up sm:text-base"
            style={{ animationDelay: "260ms" }}
          >
            안녕하세요, <span className="font-semibold text-foreground">이승헌</span>입니다. 단순한 열정을 넘어,
            데이터 기반의 정교한 의사결정으로 가치를 증명한다고 생각합니다.{" "}
            <span className="font-semibold text-foreground">1,000개 이상</span>의 유저 데이터를 다뤄본 경험으로
            비즈니스 임팩트를 만들고자 합니다.
          </p>

          <div
            className="mt-10 flex flex-wrap gap-3 animate-fade-up"
            style={{ animationDelay: "320ms" }}
          >
            <button
              type="button"
              onClick={() => smoothScrollToId("projects")}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              프로젝트 보기
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <button
              type="button"
              onClick={() => smoothScrollToId("contact")}
              className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-foreground/90 transition-colors hover:border-primary/50 hover:text-foreground"
            >
              연락하기
            </button>
          </div>
        </div>

        {/* Right — conceptual data sculpture */}
        <div className="relative animate-fade-in" style={{ animationDelay: "220ms" }}>
          <DataSculpture className="mx-auto aspect-square w-full max-w-[380px] sm:max-w-[460px] lg:max-w-none lg:h-[620px]" />
          <p className="mt-2 text-center text-[10px] text-muted-foreground/70 lg:text-right">
            개념적 시각 요소 (실제 분석 수치 아님)
          </p>
        </div>
      </div>
    </section>
  );
};
