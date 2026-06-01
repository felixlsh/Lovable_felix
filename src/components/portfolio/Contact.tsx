import { Mail, Phone, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

const EMAIL = "felixlsh2@naver.com";

export const Contact = () => {
  const [copied, setCopied] = useState(false);
  const view = useInView<HTMLDivElement>();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      toast.success("이메일 주소가 복사되었습니다");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("복사에 실패했어요");
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28">
      <div
        ref={view.ref}
        className={cn(
          "relative rounded-3xl border border-border bg-gradient-card overflow-hidden p-6 sm:p-8 md:p-14 opacity-0",
          view.inView && "animate-fade-up"
        )}
      >
        <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />

        <div className="relative">
          <p className="text-[10px] tracking-[0.25em] text-muted-foreground mb-4">04 — LET'S TALK</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl leading-tight max-w-3xl">
            단순한 취미를 넘어 <span className="text-gradient">비즈니스 인사이트</span> 도출에 기여하고자 합니다.
          </h2>
          <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            새로운 프로젝트, 협업, 또는 가벼운 커피챗 모두 환영합니다.
            아래 채널로 편하게 연락 주세요.
          </p>

          {/* Contact cards */}
          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            {/* Email card */}
            <div className="shine group rounded-2xl border border-border bg-card/60 backdrop-blur p-5 sm:p-6 hover:border-primary/60 hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="h-11 w-11 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary-glow" />
                </div>
                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/50 px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                  aria-label="Copy email"
                >
                  {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="text-[10px] tracking-[0.2em] text-muted-foreground mb-1.5">EMAIL</p>
              <a
                href={`mailto:${EMAIL}`}
                className="font-display text-base sm:text-lg break-all hover:text-primary-glow transition-colors"
              >
                {EMAIL}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:-translate-y-0.5 transition-transform"
              >
                <Mail className="h-4 w-4" />
                이메일 보내기
              </a>
            </div>
          </div>

          <div className="mt-12 pt-6 sm:pt-8 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
            <p>© 2026 이승헌 (Felix). All rights reserved.</p>
            <p className="font-mono">crafted with data &amp; care</p>
          </div>
        </div>
      </div>
    </section>
  );
};
