import { Mail, ExternalLink, Github } from "lucide-react";

export const Contact = () => {
  return (
    <section id="contact" className="py-20 lg:py-28">
      <div className="relative rounded-3xl border border-border bg-gradient-card overflow-hidden p-8 md:p-14">
        <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />

        <div className="relative">
          <p className="text-[10px] tracking-[0.25em] text-muted-foreground mb-4">04 — LET'S TALK</p>
          <h2 className="font-display text-4xl md:text-6xl leading-tight max-w-3xl">
            함께 데이터로 <span className="text-gradient">성장할 팀</span>을 찾고 있어요.
          </h2>
          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            새로운 프로젝트, 협업, 또는 가벼운 커피챗 모두 환영합니다.
            아래 채널로 편하게 연락 주세요.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="mailto:felixlsh@example.com"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow hover:-translate-y-0.5 transition-transform"
            >
              <Mail className="h-4 w-4" />
              이메일 보내기
            </a>
            <a
              href="https://felixlsh.oopy.io/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/40 px-6 py-3.5 text-sm font-semibold text-foreground hover:bg-card transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Notion Portfolio
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/40 px-6 py-3.5 text-sm font-semibold text-foreground hover:bg-card transition-colors"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>

          <div className="mt-14 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>© 2026 이승헌 (Felix LSH). All rights reserved.</p>
            <p className="font-mono">crafted with data & care</p>
          </div>
        </div>
      </div>
    </section>
  );
};
