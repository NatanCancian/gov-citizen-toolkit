import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  onCreate: (data: { name: string; taskTitle: string; fileLabel: string }) => void;
};

export function NewPhaseDialog({ onCreate }: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [fileLabel, setFileLabel] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !taskTitle.trim() || !fileLabel.trim()) return;
    onCreate({ name: name.trim(), taskTitle: taskTitle.trim(), fileLabel: fileLabel.trim() });
    setName("");
    setTaskTitle("");
    setFileLabel("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="secondary" size="sm">
          <Plus aria-hidden="true" className="size-4" />
          Nova etapa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nova etapa do processo</DialogTitle>
          <DialogDescription>
            Crie uma fase adicional e defina o nome do campo de arquivo que será exigido nela.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="np-name">Nome da fase</Label>
            <Input
              id="np-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex.: Fase 5 — Parecer Contábil"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="np-task">Tarefa desta fase</Label>
            <Input
              id="np-task"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Ex.: Emitir parecer da Controladoria"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="np-file">Nome do campo de arquivo</Label>
            <Input
              id="np-file"
              value={fileLabel}
              onChange={(e) => setFileLabel(e.target.value)}
              placeholder="Ex.: Parecer assinado (PDF)"
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Adicionar etapa</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
