import { useEffect, useRef, useState } from "react";
import { Bot, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Olá! Sou a Dona Norma, sua assistente especialista em compras públicas. Posso ajudar a consultar o CATMAT ou estruturar seu Estudo Técnico Preliminar. Como posso auxiliar nesta fase?",
  },
];

const MOCK_REPLY =
  "Boa pergunta! Com base na Lei 14.133/2021 e nos normativos municipais, recomendo registrar a justificativa da contratação no DFD e vincular o item ao código CATMAT correspondente. Posso detalhar o próximo documento quando quiser.";

export type PendingAsk = { key: number; text: string; reply?: string };

type Props = {
  messages: ChatMessage[];
  onChange: (updater: (prev: ChatMessage[]) => ChatMessage[]) => void;
  onReset: () => void;
  pendingAsk?: PendingAsk | null;
  onMinimize?: () => void;
};

export function DonaNormaChat({ messages, onChange, onReset, pendingAsk, onMinimize }: Props) {
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const lastAsk = useRef<number | null>(null);
  const replyText = useRef<string>(MOCK_REPLY);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const ask = (text: string, reply: string) => {
    replyText.current = reply;
    onChange((prev) => [...prev, { id: `u-${Date.now()}`, role: "user", content: text }]);
    setTyping(true);
  };

  useEffect(() => {
    if (!pendingAsk || lastAsk.current === pendingAsk.key) return;
    lastAsk.current = pendingAsk.key;
    ask(pendingAsk.text, pendingAsk.reply ?? MOCK_REPLY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingAsk]);

  useEffect(() => {
    if (!typing) return;
    const t = setTimeout(() => {
      onChange((prev) => [
        ...prev,
        { id: `a-${Date.now()}`, role: "assistant", content: replyText.current },
      ]);
      setTyping(false);
    }, 3000 + Math.floor(Math.random() * 2000));
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typing]);

  return (
    <section aria-label="Assistente virtual Dona Norma" className="flex h-full flex-col bg-card">
      <header className="flex items-center gap-3 border-b bg-primary px-4 py-3 text-primary-foreground">
        <span className="flex size-9 items-center justify-center rounded-full bg-primary-foreground/15">
          <Bot aria-hidden="true" className="size-5" />
        </span>
        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold">Dona Norma - Assistente Virtual</h2>
          <p className="truncate text-xs text-primary-foreground/75">
            Especialista em licitações e contratos
          </p>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onReset}
            aria-label="Limpar conversa"
            className="text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground"
          >
            <Trash2 aria-hidden="true" className="size-4" />
          </Button>
          {onMinimize && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onMinimize}
              aria-label="Ocultar Dona Norma"
              className="text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground"
            >
              <Minus aria-hidden="true" className="size-4" />
            </Button>
          )}
        </div>
      </header>

      <div
        ref={listRef}
        role="log"
        aria-live="polite"
        aria-label="Histórico da conversa"
        className="flex-1 space-y-3 overflow-y-auto p-4"
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
          >
            <p
              className={cn(
                "max-w-[85%] whitespace-pre-wrap rounded-lg px-3 py-2 text-sm leading-relaxed",
                m.role === "user"
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-foreground",
              )}
            >
              <span className="sr-only">{m.role === "user" ? "Você: " : "Dona Norma: "}</span>
              {m.content}
            </p>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <span
              className="flex items-center gap-1 rounded-lg bg-muted px-3 py-3"
              aria-label="Dona Norma está digitando"
            >
              {[0, 150, 300].map((d) => (
                <span
                  key={d}
                  style={{ animationDelay: `${d}ms` }}
                  className="size-2 animate-bounce rounded-full bg-muted-foreground/60"
                />
              ))}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
