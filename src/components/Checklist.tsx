import { AlertCircle, CheckCircle, FileText, Lock, Paperclip, Upload } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FINAL_TASK_ID, PHASES, TASKS } from "@/lib/checklist-data";
import { cn } from "@/lib/utils";

export type FinalStatus = "pending" | "approved" | "returned";

type Props = {
  completed: number[];
  attachments: Record<number, string>;
  finalStatus: FinalStatus;
  openPhases: string[];
  onOpenPhases: (v: string[]) => void;
  onToggle: (taskId: number) => void;
  onAttach: (taskId: number) => void;
  onApprove: () => void;
  onReturn: () => void;
};

export function Checklist({
  completed,
  attachments,
  finalStatus,
  openPhases,
  onOpenPhases,
  onToggle,
  onAttach,
  onApprove,
  onReturn,
}: Props) {
  const total = TASKS.length;
  const done = completed.length;
  const pct = Math.round((done / total) * 100);
  const isDone = (id: number) => completed.includes(id);
  const isUnlocked = (id: number) => id === 1 || isDone(id - 1);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 p-4 sm:p-6">
      <header className="rounded-lg border bg-card p-5 shadow-sm">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Check-list do Processo de Compras Públicas
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Acompanhe as 16 etapas obrigatórias até a validação jurídica do edital.
            </p>
          </div>
          <p className="text-right">
            <span className="block text-3xl font-bold text-primary">{pct}%</span>
            <span className="text-xs text-muted-foreground">
              {done} de {total} tarefas
            </span>
          </p>
        </div>
        <Progress
          value={pct}
          className="mt-4 h-3"
          aria-label={`Progresso geral do processo: ${pct}%`}
        />
      </header>

      {finalStatus === "approved" && (
        <Alert className="border-emerald-600/40 bg-emerald-50 text-emerald-900">
          <CheckCircle aria-hidden="true" className="size-4 text-emerald-700" />
          <AlertTitle>Edital aprovado pelo Jurídico</AlertTitle>
          <AlertDescription className="text-emerald-800">
            Processo concluído em 100%. O edital está liberado para publicação.
          </AlertDescription>
        </Alert>
      )}
      {finalStatus === "returned" && (
        <Alert variant="destructive">
          <AlertCircle aria-hidden="true" className="size-4" />
          <AlertTitle>Edital retornado para correção</AlertTitle>
          <AlertDescription>
            A etapa 15 foi reaberta. Ajuste os apontamentos do Departamento Jurídico e reenvie o
            processo.
          </AlertDescription>
        </Alert>
      )}

      <Accordion
        type="multiple"
        value={openPhases}
        onValueChange={onOpenPhases}
        className="space-y-4"
      >
        {PHASES.map((phase) => {
          const tasks = TASKS.filter((t) => t.phaseId === phase.id);
          const phaseDone = tasks.filter((t) => isDone(t.id)).length;
          return (
            <AccordionItem
              key={phase.id}
              value={`phase-${phase.id}`}
              id={`fase-${phase.id}`}
              className="rounded-lg border bg-card px-4 shadow-sm"
            >
              <AccordionTrigger className="hover:no-underline">
                <span className="flex flex-1 items-center gap-3 text-left">
                  <FileText aria-hidden="true" className="size-4 shrink-0 text-primary" />
                  <span>
                    <span className="block text-sm font-semibold text-foreground">
                      {phase.name} — {phase.subtitle}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {phaseDone} de {tasks.length} concluídas
                    </span>
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <ul className="space-y-2">
                  {tasks.map((task) => {
                    const done_ = isDone(task.id);
                    const unlocked = isUnlocked(task.id);
                    const isFinal = task.id === FINAL_TASK_ID;
                    return (
                      <li
                        key={task.id}
                        className={cn(
                          "rounded-md border p-3 transition-colors",
                          done_ ? "border-emerald-200 bg-emerald-50/60" : "bg-background",
                          !unlocked && "opacity-60",
                        )}
                      >
                        <div className="flex items-start gap-3">
                          {isFinal ? (
                            <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-primary text-[11px] font-bold text-primary">
                              16
                            </span>
                          ) : (
                            <button
                              type="button"
                              role="checkbox"
                              aria-checked={done_}
                              aria-label={`Tarefa ${task.id}: ${task.title}`}
                              disabled={!unlocked}
                              onClick={() => onToggle(task.id)}
                              className={cn(
                                "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                done_
                                  ? "border-emerald-600 bg-emerald-600 text-white"
                                  : "border-muted-foreground/40 bg-background",
                                !unlocked && "cursor-not-allowed",
                              )}
                            >
                              {done_ ? (
                                <CheckCircle aria-hidden="true" className="size-4" />
                              ) : !unlocked ? (
                                <Lock aria-hidden="true" className="size-3 text-muted-foreground" />
                              ) : null}
                            </button>
                          )}

                          <div className="min-w-0 flex-1">
                            <p
                              className={cn(
                                "text-sm font-medium text-foreground",
                                done_ && "line-through decoration-emerald-700/50",
                              )}
                            >
                              <span className="text-muted-foreground">{task.id}.</span>{" "}
                              {task.title}
                            </p>
                            {attachments[task.id] && (
                              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                                <Upload aria-hidden="true" className="size-3" />
                                {attachments[task.id]}
                              </p>
                            )}
                            {!unlocked && (
                              <p className="mt-1 text-xs text-muted-foreground">
                                Conclua a tarefa anterior para liberar esta etapa.
                              </p>
                            )}

                            {isFinal && (
                              <div className="mt-3 flex flex-wrap gap-2">
                                <Button
                                  type="button"
                                  disabled={!unlocked || finalStatus === "approved"}
                                  onClick={onApprove}
                                  className="bg-emerald-600 text-white hover:bg-emerald-700"
                                >
                                  <CheckCircle aria-hidden="true" className="size-4" />
                                  Aprovar Edital
                                </Button>
                                <Button
                                  type="button"
                                  variant="destructive"
                                  disabled={!unlocked}
                                  onClick={onReturn}
                                >
                                  <AlertCircle aria-hidden="true" className="size-4" />
                                  Retornar com Erro
                                </Button>
                              </div>
                            )}
                          </div>

                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => onAttach(task.id)}
                            aria-label={`Anexar arquivo à tarefa ${task.id}`}
                            className="shrink-0"
                          >
                            <Paperclip aria-hidden="true" className="size-4" />
                            <span className="sr-only sm:not-sr-only">Anexar</span>
                          </Button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
